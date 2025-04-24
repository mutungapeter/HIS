from rest_framework import serializers
from apps.users.models import User

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'first_name',
            'last_name',
            'email',
            'phone_number',
            'password'
        ]

    def create(self, validated_data):
        user = User.objects.create_user( 
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            phone_number=validated_data.get('phone_number', ''),
            password=validated_data['password']  
        )
        return user




class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["user"] = {}
        token["user"]["id"] = user.id
        token["user"]["username"] = user.username
        token["user"]["email"] = user.email
        token["user"]["first_name"] = user.first_name
        token["user"]["last_name"] = user.last_name
        token["user"]["phone_number"] = user.phone_number

        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        user_data = {
            'id': self.user.id,
            'username': self.user.username,
            'email': self.user.email,
            'first_name': self.user.first_name,
            'last_name': self.user.last_name,
            'phone_number': self.user.phone_number,
        }
        data['user'] = user_data
        
        return data