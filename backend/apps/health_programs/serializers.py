from rest_framework import serializers
from .models import HealthProgram

class HealthProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthProgram
        fields = "__all__"

class HealthProgramCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthProgram
        fields = ['name', 'description']

    def validate_name(self, value):
        return value.strip()