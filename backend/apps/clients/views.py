from django.shortcuts import render
from django.db.models import Q
from apps.enrollments.models import Enrollment
from apps.health_programs.models import HealthProgram
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from .models import Client
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import ValidationError
from .serializers import ClientSerializer, ClientCreateUpdateSerializer
from .filters import ClientFilter
from django.db.models import Count, Value as V
from django.db.models.functions import TruncMonth, TruncYear, ExtractMonth, ExtractYear
from rest_framework.views import APIView
from datetime import datetime
import calendar

class CreateClientAPIView(generics.CreateAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientCreateUpdateSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except ValidationError as e:
            errors = e.detail
            error_messages = []
            for field, messages in errors.items():
                if isinstance(messages, list):
                    for message in messages:
                        error_messages.append(f"{message}")
                else:
                    error_messages.append(f"{messages}")

            return Response({
                "status": 400,
                "error": " | ".join(error_messages),
                "data": errors  
            }, status=status.HTTP_400_BAD_REQUEST)

class UpdateClientAPIView(generics.UpdateAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientCreateUpdateSerializer
    lookup_field = 'pk'
    permission_classes = [IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        try:
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ValidationError as e:
            errors = e.detail
            error_messages = []
            for field, messages in errors.items():
                if isinstance(messages, list):
                    for message in messages:
                        error_messages.append(f"{message}")
                else:
                    error_messages.append(f"{messages}")

            return Response({
                "status": 400,
                "error": " | ".join(error_messages),
                "data": errors
            }, status=status.HTTP_400_BAD_REQUEST)

    def perform_update(self, serializer):
        serializer.save()


class RetrieveClientAPIView(generics.RetrieveAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    lookup_field = 'pk'
    permission_classes = [IsAuthenticated]


class DeleteClientAPIView(generics.DestroyAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    lookup_field = 'pk'
    permission_classes = [IsAuthenticated]


class ListClientAPIView(generics.ListAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    # filter_backends = [DjangoFilterBackend]
    # filterset_class = ClientFilter
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        search = self.request.query_params.get('search', None)

        if search:
            queryset = queryset.filter(
                Q(id_number__icontains=search) |
                Q(phone_number__icontains=search)
            )
        return queryset


class MetricsView(APIView):
    """
    API view providing comprehensive metrics data with filtering 
    """
    def get(self, request):
        year = request.query_params.get('year')
        month = request.query_params.get('month')
        
     
        if year:
            year = int(year)
        if month:
            month = int(month)

        clients_query = Client.objects.all()
        if year:
            clients_query = clients_query.filter(created_at__year=year)
        if month and year:
            clients_query = clients_query.filter(created_at__month=month)
            
       
        enrollments_query = Enrollment.objects.all()
        if year:
            enrollments_query = enrollments_query.filter(created_at__year=year)
        if month and year:
            enrollments_query = enrollments_query.filter(created_at__month=month)
            
        #Client Metrics
        total_clients = clients_query.count()
        
        #Clients by month (for trend chart) with zeros for missing months
        monthly_client_data = (
            clients_query
            .annotate(month=ExtractMonth('created_at'))
            .values('month')
            .annotate(count=Count('id'))
            .order_by('month')
        )

        
        # Create a dictionary with all months initialized to zero
        monthly_client_dict = {month: 0 for month in range(1, 13)}
        
        # Fill in actual counts from the data
        for item in monthly_client_data:
            monthly_client_dict[item['month']] = item['count']
        
        
        monthly_client_registrations = [
            {
                "month": f"{year}-{month:02d}-01T00:00:00Z",
                "year": year,
                "count": count,
                "month_name": calendar.month_name[month]
            }
            for month, count in monthly_client_dict.items()
        ]
        
        # Gender distribution
        gender_distribution = clients_query.values('gender').annotate(count=Count('id'))
        
        # Enrollment Metrics
        total_enrollments = enrollments_query.count()
        
        # Enrollments by month (for trend chart) with zeros for missing months
        monthly_enrollment_data = (
            enrollments_query
            .annotate(month=ExtractMonth('created_at'))
            .values('month')
            .annotate(count=Count('id'))
            .order_by('month')
        )

        
        
        monthly_enrollment_dict = {month: 0 for month in range(1, 13)}
        
    
        for item in monthly_enrollment_data:
            monthly_enrollment_dict[item['month']] = item['count']
        
       
        monthly_enrollments = [
            {
                "month": f"{year}-{month:02d}-01T00:00:00Z",
                "year": year,
                "count": count,
                "month_name": calendar.month_name[month]
            }
            for month, count in monthly_enrollment_dict.items()
        ]
        
       
        program_enrollments = (
            enrollments_query
            .annotate(month=ExtractMonth('created_at'))
            .values('program__name', 'month')
            .annotate(count=Count('id'))
            .order_by('-count')
        )

        
        # Program Metrics ===
        total_programs = HealthProgram.objects.count()
        
        
        
        return Response({
            'client_metrics': {
                'total_clients': total_clients,
                'monthly_registrations': monthly_client_registrations,
                'gender_distribution': list(gender_distribution),
                
            },
            'enrollment_metrics': {
                'total_enrollments': total_enrollments,
                'monthly_enrollments': monthly_enrollments,
                'program_enrollments': list(program_enrollments),
            },
            'program_metrics': {
                'total_programs': total_programs,
            },
            
        }, status=status.HTTP_200_OK)
