from django.contrib import admin

#

from .models import  Enrollment


@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "client",
        "program",
       
        
    ]