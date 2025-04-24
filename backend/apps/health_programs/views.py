from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from .models import HealthProgram
from .serializers import HealthProgramCreateUpdateSerializer, HealthProgramSerializer
from .filters import HealthProgramFilter
from django_filters.rest_framework import DjangoFilterBackend


class CreateHealthProgramAPIView(generics.CreateAPIView):
    queryset = HealthProgram.objects.all()
    serializer_class = HealthProgramCreateUpdateSerializer
    # permission_classes = [IsAuthenticated]

class UpdateHealthProgramAPIView(generics.UpdateAPIView):
    queryset = HealthProgram.objects.all()
    serializer_class = HealthProgramCreateUpdateSerializer
    lookup_field = 'pk'
    # permission_classes = [IsAuthenticated]

class RetrieveHealthProgramAPIView(generics.RetrieveAPIView):
    queryset = HealthProgram.objects.all()
    serializer_class = HealthProgramSerializer
    lookup_field = 'pk'
    # permission_classes = [IsAuthenticated]


class DeleteHealthProgramAPIView(generics.DestroyAPIView):
    queryset = HealthProgram.objects.all()
    serializer_class = HealthProgramSerializer
    lookup_field = 'pk'
    # permission_classes = [IsAuthenticated]


class ListHealthProgramAPIView(generics.ListAPIView):
    queryset = HealthProgram.objects.all()
    serializer_class = HealthProgramSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = HealthProgramFilter
    # permission_classes = [IsAuthenticated]
