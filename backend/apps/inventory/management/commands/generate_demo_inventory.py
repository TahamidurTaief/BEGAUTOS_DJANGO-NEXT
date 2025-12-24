from django.core.management.base import BaseCommand
from apps.inventory.models import Inventory, Brand, BodyStyle, ModelGeneration
from faker import Faker
import random

from base.models import BaseModel

fake = Faker()

class Command(BaseCommand):
    help = "Generate demo inventory data with foreign key references"

    def handle(self, *args, **kwargs):
        # Seed Brands
        brand_names = ['Toyota', 'Honda', 'BMW', 'Audi', 'Nissan']
        brands = []
        for name in brand_names:
            brand, _ = Brand.objects.get_or_create(name=name, defaults={"image": "brand.jpg"})
            brands.append(brand)

        # Seed Body Styles
        body_styles = []
        for body in ['Sedan', 'SUV', 'Hatchback', 'Convertible']:
            bs, _ = BodyStyle.objects.get_or_create(body=body)
            body_styles.append(bs)

        # Seed Model Generations
        models = []
        for brand in brands:
            for i in range(2):  # Two models per brand
                model_name = f"{brand.name} Model {i+1}"
                mg, _ = ModelGeneration.objects.get_or_create(brand=brand, model=model_name)
                models.append(mg)

        for _ in range(10):
            brand = random.choice(brands)
            model = random.choice([m for m in models if m.brand == brand] or [None])
            body_style = random.choice(body_styles)

            Inventory.objects.create(
                name=fake.company() + " Car",
                brand=brand,
                model=model,
                year=random.randint(2005, 2024),
                engine_capacity=f"{random.randint(1000, 3500)} cc",
                fuel_type=random.choice([
                    Inventory.FuelTypeChoices.PETROL,
                    Inventory.FuelTypeChoices.DIESEL,
                    Inventory.FuelTypeChoices.ELECTRIC,
                    Inventory.FuelTypeChoices.HYBRID,
                ]),
                mileage=f"{random.randint(1000, 150000)} km",
                price=round(random.uniform(150000, 4500000), 2),
                transmission=random.choice([
                    Inventory.TransmissionChoices.MANUAL,
                    Inventory.TransmissionChoices.AUTOMATIC
                ]),
                drive_type=random.choice(['FWD', 'RWD', 'AWD']),
                wheel_base=f"{random.randint(15, 22)} inch",
                color=random.choice(['Black', 'White', 'Red', 'Silver', 'Blue']),
                condition=random.choice([
                    Inventory.ConditionChoices.NEW,
                    Inventory.ConditionChoices.USED
                ]),
                registered=random.choice([True, False]),
                body_style=body_style,
                feature_image="demo.jpg",
                description=fake.text(),
                status=BaseModel.StatusChoices.PUBLISHED
            )

        self.stdout.write(self.style.SUCCESS('✅ Successfully added 10 demo inventory entries with seeded Brand, ModelGeneration, and BodyStyle data.'))
