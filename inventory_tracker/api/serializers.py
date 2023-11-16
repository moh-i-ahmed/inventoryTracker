from rest_framework import serializers
from .models import Item

class ItemSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Item
        fields = ('id', 'name', 'description', 'price', 'purchase_date', 'count')
