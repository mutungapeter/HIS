from django.db import models
from apps.health_programs.models import AbstractBaseModel



class Client(AbstractBaseModel):
    GENDER_CHOICES = (
    ('Male', 'Male'),
    ('Female', 'Female'),
    ('Other', 'Other'),  
    )
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    id_number = models.CharField(max_length=20, unique=True)
    date_of_birth = models.DateField()
    phone_number = models.CharField(max_length=15, blank=True, null=True, unique=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
