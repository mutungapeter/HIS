
from django.db import models
from apps.clients.models import Client
from apps.health_programs.models import AbstractBaseModel, HealthProgram

class Enrollment(AbstractBaseModel):
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='enrollments')
    program = models.ForeignKey(HealthProgram, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('client', 'program')

    def __str__(self):
        return f"{self.client} - {self.program.name}"
