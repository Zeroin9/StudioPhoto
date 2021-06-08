from django.shortcuts import render
from django.http import JsonResponse
from .models import Book, Room

def index(request):
     return render(request, 'index.html', {})

def simple(request):
     return render(request, 'simple.html', {})

def white(request):
     return render(request, 'white.html', {})

def loft(request):
     return render(request, 'loft.html', {})

def portfolio(request):
     return render(request, 'portfolio.html', {})

def test (request):
    if request.method == "POST" and request.is_ajax():
        form_room = Room.objects.get(name=request.POST.get("room"))
        books=Book.objects.filter(date=request.POST.get("date"), room=form_room.id)
        time_list=[]
        for book in books:
            time_list.append(book.time)
        return JsonResponse({'time_list':time_list})

def add_book(request):
    if request.method == "POST" and request.is_ajax():
        form_room = Room.objects.get(name=request.POST.get("room"))
        form_guest_name = request.POST.get("guest_name")
        form_phone_number = request.POST.get("phone_number")
        form_date = request.POST.get("date")
        form_time = request.POST.get("time")
        form_services = request.POST.get("services")
        if form_time != '':
            new_book = Book(room=form_room, guest_name=form_guest_name, phone_number=form_phone_number, date=form_date, time=form_time, services=form_services)
            new_book.save()
            return JsonResponse({'date':new_book.date, 'time':new_book.time})
        else:
            return JsonResponse({'date':'... Ошибка!!!', 'time':'Не выбрано время!'})
