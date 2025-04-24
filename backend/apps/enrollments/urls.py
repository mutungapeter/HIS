from django.urls import path
from apps.enrollments import views

urlpatterns = [
    path('', views.ListEnrollmentAPIView.as_view(), name='enrollments-list'),
    path('create/', views.CreateEnrollmentAPIView.as_view(), name='enrollments-create'),
    path('<int:pk>/', views.RetrieveEnrollmentAPIView.as_view(), name='enrollments-retrieve'),
    path('<int:pk>/update/', views.UpdateEnrollmentAPIView.as_view(), name='enrollments-update'),
    path('<int:pk>/delete/', views.DeleteEnrollmentAPIView.as_view(), name='enrollments-delete'),
]
