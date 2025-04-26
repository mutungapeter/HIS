from django.urls import path, include
from .schema import schema_view
urlpatterns = [
    path('users/', include('apps.users.urls')),
    path('health-programs/', include('apps.health_programs.urls')),
    path('clients/', include('apps.clients.urls')),
    path('enrollments/', include('apps.enrollments.urls')),

    #api documentation urls
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
