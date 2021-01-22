from django.contrib import admin
from .models import Message


@admin.register(Message)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email')
    list_filter = ('cause',)
