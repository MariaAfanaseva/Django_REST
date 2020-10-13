import json
import os
from django.core.management import BaseCommand
from main.models import Bike, BikeDetail

JSON_PATH = 'main/json/'


def load_from_file(file_name):
    with open(os.path.join(JSON_PATH, file_name + '.json'), 'r') as file:
        return json.load(file)


class Command(BaseCommand):
    def handle(self, *args, **options):
        # create bikes
        bikes = load_from_file('products')

        Bike.objects.all().delete()
        for bike in bikes:
            new_bike = Bike(**bike)
            new_bike.save()

        # create bike details
        bike_details = load_from_file('products_detail')
        BikeDetail.objects.all().delete()
        for item in bike_details:
            _bike = Bike.objects.get(name=item['bike'])
            item['bike'] = _bike

            new_bike_details = BikeDetail(**item)
            new_bike_details.save()
