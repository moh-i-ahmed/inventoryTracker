# Generated by Django 4.2.6 on 2023-10-14 16:26

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_item_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='purchase_date',
            field=models.DateField(blank=True, default=datetime.date.today, help_text='Purchase date (can be blank)', null=True),
        ),
    ]
