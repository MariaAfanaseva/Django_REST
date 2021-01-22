import os
from django.core.management import BaseCommand


class Command(BaseCommand):
    def handle(self, *args, **options):
        os.system('python manage.py makemigrations')
        os.system('python manage.py migrate')
        os.system('python manage.py fill_db')
        os.system('python manage.py runserver')
