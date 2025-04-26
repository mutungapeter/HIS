from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    phone_number = models.CharField(max_length=15, blank=True, null=True,unique=True)
    email = models.EmailField(unique=True, blank=False)
    def __str__(self):
        return self.username