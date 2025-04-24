import django_filters
from apps.enrollments.models import Enrollment

class EnrollmentFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(field_name="program__name",lookup_expr='icontains')
    id_number = django_filters.CharFilter(field_name="client__id_number",lookup_expr='icontains')

    class Meta:
        model = Enrollment
        fields = ['name', 'id_number']
