from django.urls import path
from .views import index

urlpatterns = [
    path('', index),                        # default e.g.  http://127.0.0.1:8000/
    path('add-item', index),                # add-item e.g. http://127.0.0.1:8000/add-item
    path('get-item/<str:item_id>', index),  # get-item e.g. http://127.0.0.1:8000/get-item/5
]