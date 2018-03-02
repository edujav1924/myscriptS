from channels import Group
from django.core.management import BaseCommand
import time
import json
#The class must be named Command, and subclass BaseCommand
my_dict = {
    "temp":{"id":"btn","value":0},
    "velo":{"id":"btn","value":0}
    }
class Command(BaseCommand):
    # Show this when the user types help
    help = "Simulates reading sensor and sending over Channel."

    # A command must define handle()
    def handle(self, *args, **options):
        x = 0

        while True:
            try:
                my_dict.update({"temp":{"id":"btn","value":x}})
            except:
                print("eror ferox")
            Group("chat").send({'text': json.dumps(my_dict)})
            time.sleep(5)
            x = x + 1
