from django.shortcuts import render
from django.shortcuts import render
from .serializers import CustomTokenObtainPairSerializer, UserSerializer
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework import generics, status
from django.utils import timezone
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response

class RegisterUserAPIView(generics.CreateAPIView):
    serializer_class = UserSerializer
    

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        except ValidationError as e:
            errors = e.detail
            error_messages = []
            
            
            for field, messages in errors.items():
                if isinstance(messages, list):
                    for message in messages:
                        error_messages.append(f"{message}")
                else:
                    error_messages.append(f"{messages}")

            
            return Response({
                "status": 400,
                "error": " | ".join(error_messages),
                "data": errors  
            }, status=status.HTTP_400_BAD_REQUEST)



class UserLoginAPIView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class UserLogoutAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")
            # print("Received refresh token:", refresh_token[:20] + "..." if refresh_token else None)
            
            if not refresh_token:
                return Response({"error": "Refresh token is missing"}, status=400)
            
            try:
                token = RefreshToken(refresh_token)
                # print("Token validated successfully")
                token.blacklist()
                # print("Token blacklisted successfully")
                return Response({"message": "Logout successful"}, status=200)
            except TokenError as te:
                # print("Token Error:", str(te))
                return Response({"error": f"Token Error: {str(te)}"}, status=400)
            
        except Exception as e:
            print("Unexpected error:", str(e))
            return Response({"error": f"Unexpected error: {str(e)}"}, status=400)
