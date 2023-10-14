# import django libraries
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response

import logging

# import model
from .serializers import ItemSerializer, AddItemSerializer
from .models import Item

class ItemView(generics.ListAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

''''''
class AddItemView(APIView):

    serializer_class = AddItemSerializer

    def post(self, request, format=None):
        """Post request to add a new item to the inventory."""

        # ensure session exists
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        # serialize request data
        serializer = self.serializer_class(data=request.data)

        # ensure serialized data is in valid format
        if serializer.is_valid():
            id = serializer.data.get('id')
            name = serializer.data.get('name')
            description = serializer.data.get('description')
            price = serializer.data.get('price')
            purchase_date = serializer.data.get('purchase_date')
            count = serializer.data.get('count')
            queryset = Item.objects.filter(id=id)

            # update existing item
            if queryset.exists() :
                item = queryset[0]
                item.name = name
                item.description = description
                item.price = price
                item.purchase_date = purchase_date
                item.count = count
                item.save(update_fields=['name', 'description', 'price', 'purchase_date', 'count'])
                response = Response(AddItemSerializer(item).data, status=status.HTTP_200_OK)

            # save new item
            else:
                item = Item(name=name, description=description, price=price, purchase_date=purchase_date, count=count)
                item.save()
                response = Response(AddItemSerializer(item).data, status=status.HTTP_201_CREATED)
        
        # post data invalid
        else :
            logging.debug(msg=serializer.data.items())
            print(serializer.data.items())
            print(serializer.errors)
            response = Response({f"Bad Request: Invalid data {serializer.data.items()}..."}, status=status.HTTP_400_BAD_REQUEST)

        return response
