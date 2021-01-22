import os
from django.core.management import BaseCommand
from django.contrib.auth import get_user_model


class Command(BaseCommand):
    def handle(self, *args, **options):
        os.system('python manage.py makemigrations')
        os.system('python manage.py migrate')
        get_user_model().objects.create_superuser('admin@admin.com', 'Admin', 'Adminovich', 'admin')
        os.system('python manage.py fill_products')
        os.system('python manage.py runserver')
