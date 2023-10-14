from django.db import models
from uuid import uuid4
from decimal import Decimal
import datetime

class Item(models.Model):
    id = uuid4()
    name = models.CharField(max_length=50, help_text="Name")
    description = models.CharField(max_length=50, blank=True, default="", help_text="Enter description here (can be blank)")
    price = models.DecimalField(max_digits=7, decimal_places=2, default=0.0, help_text="£50")
    purchase_date = models.DateField(null=True, blank=True, default=datetime.date.today, help_text="Purchase date (can be blank)")
    count = models.IntegerField(default=1, help_text="Item count")
