import django_filters
from .models import HealthProgram

class HealthProgramFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = HealthProgram
        fields = ['name']
