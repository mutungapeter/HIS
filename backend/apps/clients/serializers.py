
from apps.health_programs.models import HealthProgram
from apps.health_programs.serializers import HealthProgramSerializer
from rest_framework import serializers
from .models import Client

class ClientSerializer(serializers.ModelSerializer):
    enrolled_programs = serializers.SerializerMethodField()
    class Meta:
        model = Client
        fields = "__all__"
    def get_enrolled_programs(self, obj):
        programs = HealthProgram.objects.filter(enrollment__client=obj)
        return HealthProgramSerializer(programs, many=True).data


class ClientCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = [
            'first_name', 
            'last_name', 
            'id_number', 
            'date_of_birth', 
            'phone_number', 
            'gender'
            ]

    def validate_id_number(self, value):
        return value.strip()

    
