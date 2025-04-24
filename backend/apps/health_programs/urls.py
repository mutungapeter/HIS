
from django.urls import path
from apps.health_programs.views import (
    CreateHealthProgramAPIView,
    UpdateHealthProgramAPIView,
    RetrieveHealthProgramAPIView,
    DeleteHealthProgramAPIView,
    ListHealthProgramAPIView,
)

urlpatterns = [
    path('', ListHealthProgramAPIView.as_view(), name='healthprogram-list'),
    path('create/', CreateHealthProgramAPIView.as_view(), name='healthprogram-create'),
    path('<int:pk>/', RetrieveHealthProgramAPIView.as_view(), name='healthprogram-detail'),
    path('<int:pk>/update/', UpdateHealthProgramAPIView.as_view(), name='healthprogram-update'),
    path('<int:pk>/delete/', DeleteHealthProgramAPIView.as_view(), name='healthprogram-delete'),
]
