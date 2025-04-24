from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Health Information System APIs",
        default_version='v1',
        description="Health information system apis",
        terms_of_service="",
        contact=openapi.Contact(email="mutungapetrah@gmail.com"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)
