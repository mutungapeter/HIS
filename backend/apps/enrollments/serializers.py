from rest_framework import serializers
from apps.enrollments.models import Enrollment


class EnrollmentSerializer(serializers.ModelSerializer):
    client = serializers.StringRelatedField()
    program = serializers.StringRelatedField()

    class Meta:
        model = Enrollment
        fields = "__all__"


class CreateEnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = ['client', 'program']
