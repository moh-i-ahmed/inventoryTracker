from django.urls import path
from .views import ItemView, AddItemView

urlpatterns = [
    path('', ItemView.as_view()),              # api default page
    path('add-item', AddItemView.as_view()),   # add item
]