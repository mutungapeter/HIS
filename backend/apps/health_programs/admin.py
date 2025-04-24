from django.contrib import admin

from .models import HealthProgram

# Register your models here.
@admin.register(HealthProgram)
class HealthProgramAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "name",
        "description",
        
    ]