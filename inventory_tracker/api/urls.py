from django.urls import path
from .views import ItemView, AddItemView, GetItemView

urlpatterns = [
    path('', ItemView.as_view()),              # api default e.g. http://127.0.0.1:8000/api
    path('add-item', AddItemView.as_view()),   # add item e.g. http://127.0.0.1:8000/api/add-item
    path('get-item/', GetItemView.as_view()),  # get item e.g. http://127.0.0.1:8000/api/get-item/?id=5
]