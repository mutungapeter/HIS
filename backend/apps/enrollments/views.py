from django.shortcuts import render

from rest_framework import generics
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
    filter_backends = [DjangoFilterBackend]
    filterset_class = EnrollmentFilter


class CreateEnrollmentAPIView(generics.CreateAPIView):
    queryset = Enrollment.objects.all()
    serializer_class = CreateEnrollmentSerializer
    permission_classes = [IsAuthenticated]


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
