from django.db import models
from uuid import uuid4
import datetime

class Item(models.Model):
    name = models.CharField(default="", max_length=50)
    description = models.CharField(default="Enter description here", max_length=50)
    purchase_date = models.DateField(default=datetime.date.today)
    