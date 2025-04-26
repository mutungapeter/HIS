from django.shortcuts import render
from django.db.models import Q
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend

from apps.enrollments.models import Enrollment
from apps.enrollments.serializers import (
    EnrollmentSerializer,
    CreateEnrollmentSerializer
)
from apps.enrollments.filters import EnrollmentFilter


class ListEnrollmentAPIView(generics.ListAPIView):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    permission_classes = [IsAuthenticated]
    # filter_backends = [DjangoFilterBackend]
    # filterset_class = EnrollmentFilter
    def get_queryset(self):
        queryset = super().get_queryset()
        search = self.request.query_params.get('search', None)

        if search:
            queryset = queryset.filter(
                Q(program__name__icontains=search) |
                Q(client__phone_number__icontains=search) |
                Q(client__id_number__icontains=search)
            )
        return queryset


class CreateEnrollmentAPIView(generics.CreateAPIView):
    queryset = Enrollment.objects.all()
    serializer_class = CreateEnrollmentSerializer
    permission_classes = [IsAuthenticated]
    def create(self, request, *args, **kwargs):
        client_id = request.data.get('client')
        program_ids = request.data.get('program_ids', [])

       

        created = []
        for program_id in program_ids:
            data = {
                'client': client_id,
                'program': program_id
            }
            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            created.append(serializer.data)

        return Response(created, status=status.HTTP_201_CREATED)



class RetrieveEnrollmentAPIView(generics.RetrieveAPIView):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'


class UpdateEnrollmentAPIView(generics.UpdateAPIView):
    queryset = Enrollment.objects.all()
    serializer_class = CreateEnrollmentSerializer  
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'


class DeleteEnrollmentAPIView(generics.DestroyAPIView):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'
