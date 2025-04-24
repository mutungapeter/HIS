
import django_filters
from .models import Client

class ClientFilter(django_filters.FilterSet):
    id_number = django_filters.CharFilter(lookup_expr='icontains')
    phone_number = django_filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = Client
        fields = ['id_number', 'phone_number']
