from django.shortcuts import render

# apps/clients/views.py
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from .models import Client
from .serializers import ClientSerializer, ClientCreateUpdateSerializer
from .filters import ClientFilter

class CreateClientAPIView(generics.CreateAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientCreateUpdateSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save()


class UpdateClientAPIView(generics.UpdateAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientCreateUpdateSerializer
    lookup_field = 'pk'
    permission_classes = [IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

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
    filter_backends = [DjangoFilterBackend]
    filterset_class = ClientFilter
    permission_classes = [IsAuthenticated]
