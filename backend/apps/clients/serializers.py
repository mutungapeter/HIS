
from apps.health_programs.models import HealthProgram
from apps.health_programs.serializers import HealthProgramSerializer
from apps.enrollments.serializers import EnrollmentSerializer
from rest_framework import serializers
from .models import Client

class ClientSerializer(serializers.ModelSerializer):
    enrollments = serializers.SerializerMethodField()
    class Meta:
        model = Client
        fields = "__all__"
    def get_enrollments(self, obj):
        enrollments = obj.enrollments.select_related('program').all()
        return EnrollmentSerializer(enrollments, many=True).data



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

    
