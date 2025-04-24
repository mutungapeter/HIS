from django.urls import path
from apps.clients import views

urlpatterns = [
    path('', views.ListClientAPIView.as_view(), name='clients-list'),
    path('create/', views.CreateClientAPIView.as_view(), name='clients-create'),
    path('<int:pk>/', views.RetrieveClientAPIView.as_view(), name='clients-retrieve'),
    path('<int:pk>/update/', views.UpdateClientAPIView.as_view(), name='clients-update'),
    path('<int:pk>/delete/', views.DeleteClientAPIView.as_view(), name='clients-delete'),
]
