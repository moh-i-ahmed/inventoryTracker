# import django libraries
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response

import logging

# import model
from .serializers import ItemSerializer
from .models import Item

class ItemView(generics.ListAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


class AddOrUpdateItemView(APIView):

    serializer_class = ItemSerializer

    def post(self, request, format=None):
        """Post request to add a new item to the inventory."""

        # ensure session exists
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        # serialize request data
        serializer = self.serializer_class(data=request.data)

        # ensure serialized data is in valid format
        if serializer.is_valid():

            item_data = {
                'name':          serializer.validated_data.get('name'),
                'description':   serializer.validated_data.get('description'),
                'price':         serializer.validated_data.get('price'),
                'count':         serializer.validated_data.get('count'),
                'purchase_date': serializer.validated_data.get('purchase_date')
            }

            # create a new item
            item = Item.objects.create(**item_data)
            item.save()
            print(item)
            return Response(ItemSerializer(item).data, status=status.HTTP_201_CREATED)

            # ensure item id exists
            # item_id = serializer.validated_data.get('id')

            # if item_id:
            #     # update existing item
            #     try:
            #         item = Item.objects.get(id=item_id)
            #         for key, value in item_data.items(): setattr(item, key, value)
            #         item.save()
            #         return Response(ItemSerializer(item).data, status=status.HTTP_200_OK)

            #     # create a new item
            #     except Item.DoesNotExist:
            #         item = Item.objects.create(**item_data)
            #         return Response(ItemSerializer(item).data, status=status.HTTP_201_CREATED)

            # # create a new item
            # else:
                # item = Item.objects.create(**item_data)
                # return Response(ItemSerializer(item).data, status=status.HTTP_201_CREATED)

        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def put(self, request, format=None):
        """Post request to add a new item to the inventory."""

        # ensure session exists
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        # serialize request data
        serializer = self.serializer_class(data=request.data)

        # ensure serialized data is in valid format
        if serializer.is_valid():

            # item_data = {
            #     'id':          serializer.validated_data.get('id'),
            #     'name':          serializer.validated_data.get('name'),
            #     'description':   serializer.validated_data.get('description'),
            #     'price':         serializer.validated_data.get('price'),
            #     'count':         serializer.validated_data.get('count'),
            #     'purchase_date': serializer.validated_data.get('purchase_date')
            # }

            # ensure item id exists
            # item_id = serializer.validated_data.get('id')

            id = serializer.data.get('id')
            name = serializer.data.get('name')
            description = serializer.data.get('description')
            price = serializer.data.get('price')
            purchase_date = serializer.data.get('purchase_date')
            count = serializer.data.get('count')
            queryset = Item.objects.filter(id=id)

            # update existing item
            if queryset.exists() :
                print(f"Received data: {serializer.data}")
                
                item = queryset[0]
                item.name = name
                item.description = description
                item.price = price
                item.purchase_date = purchase_date
                item.count = count
                item.save(update_fields=['name', 'description', 'price', 'purchase_date', 'count'])
                return Response(ItemSerializer(item).data, status=status.HTTP_200_OK)
        #     if item_id:
        #         # update existing item
        #         try:
        #             item = Item.objects.get(id=item_id)
        #             for key, value in item_data.items(): setattr(item, key, value)
        #             item.save()
        #             return Response(ItemSerializer(item).data, status=status.HTTP_200_OK)

        #         # create a new item
        #         except Item.DoesNotExist:
        #             item = Item.objects.create(**item_data)
        #             return Response(ItemSerializer(item).data, status=status.HTTP_201_CREATED)

        #     # create a new item
        #     else:
        #         item = Item.objects.create(**item_data)
        #         return Response(ItemSerializer(item).data, status=status.HTTP_201_CREATED)

        # else:
        #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        #     id = serializer.data.get('id')
        #     name = serializer.data.get('name')
        #     description = serializer.data.get('description')
        #     price = serializer.data.get('price')
        #     purchase_date = serializer.data.get('purchase_date')
        #     count = serializer.data.get('count')
        #     queryset = Item.objects.filter(id=id)

        #     # update existing item
        #     if queryset.exists() :
        #         item = queryset[0]
        #         item.name = name
        #         item.description = description
        #         item.price = price
        #         item.purchase_date = purchase_date
        #         item.count = count
        #         item.save(update_fields=['name', 'description', 'price', 'purchase_date', 'count'])
        #         response = Response(ItemSerializer(item).data, status=status.HTTP_200_OK)

        #     # save new item
        #     else:
        #         item = Item(name=name, description=description, price=price, purchase_date=purchase_date, count=count)
        #         item.save()
        #         response = Response(ItemSerializer(item).data, status=status.HTTP_201_CREATED)
        
        # # post data invalid
        # else :
        #     logging.debug(msg=serializer.data.items())
        #     print(serializer.data.items())
        #     print(serializer.errors)
        #     response = Response({f"Bad Request: Invalid data {serializer.data.items()}..."}, status=status.HTTP_400_BAD_REQUEST)

        return

class GetItemView(APIView):

    serializer_class = ItemSerializer

    # search for id keyword arg
    lookup_url_kwarg = 'id'

    # retrieve id from GET request
    def get(self, request, format=None):
        id = request.GET.get(self.lookup_url_kwarg)

        if id is not None:
            item = Item.objects.filter(id=id)

            if len(item) > 0:
                data = ItemSerializer(item[0]).data
                return Response(data, status=status.HTTP_200_OK)
            
            return Response({'Item Not Found' : 'Invalid Item ID'}, status=status.HTTP_404_NOT_FOUND)
        
        return Response({"Bad Request": "'ID' parameter not found in request"}, status=status.HTTP_400_BAD_REQUEST)
