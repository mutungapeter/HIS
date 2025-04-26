from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, generics
from .models import HealthProgram
from .serializers import HealthProgramCreateUpdateSerializer, HealthProgramSerializer
from .filters import HealthProgramFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.exceptions import ValidationError

class CreateHealthProgramAPIView(generics.CreateAPIView):
    queryset = HealthProgram.objects.all()
    serializer_class = HealthProgramCreateUpdateSerializer
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

class UpdateHealthProgramAPIView(generics.UpdateAPIView):
    queryset = HealthProgram.objects.all()
    serializer_class = HealthProgramCreateUpdateSerializer
    lookup_field = 'pk'
    permission_classes = [IsAuthenticated]

class RetrieveHealthProgramAPIView(generics.RetrieveAPIView):
    queryset = HealthProgram.objects.all()
    serializer_class = HealthProgramSerializer
    lookup_field = 'pk'
    permission_classes = [IsAuthenticated]


class DeleteHealthProgramAPIView(generics.DestroyAPIView):
    queryset = HealthProgram.objects.all()
    serializer_class = HealthProgramSerializer
    lookup_field = 'pk'
    permission_classes = [IsAuthenticated]


class ListHealthProgramAPIView(generics.ListAPIView):
    queryset = HealthProgram.objects.all()
    serializer_class = HealthProgramSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = HealthProgramFilter
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        programs = self.filter_queryset(self.get_queryset())
        if "page" not in request.query_params:
            serializer = self.get_serializer(programs, many=True)
            return Response(serializer.data)
        page = self.paginate_queryset(programs)
        if page is not None:
            serializer = self.serializer_class(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.serializer_class(programs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)