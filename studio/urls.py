from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('simple', views.simple, name='simple'),
    path('white', views.white, name='white'),
    path('loft', views.loft, name='loft'),
    path('portfolio', views.portfolio, name='portfolio'),
    path('test', views.test, name='test'),
    path('add_book', views.add_book, name='add_book')
]