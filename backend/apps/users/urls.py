from django.urls import path

from apps.users.views import RegisterUserAPIView, UserLoginAPIView
from rest_framework_simplejwt.views import TokenRefreshView
urlpatterns = [
    path('register/', RegisterUserAPIView.as_view(), name="register"),
    path('login/', UserLoginAPIView.as_view(), name="login"),
]