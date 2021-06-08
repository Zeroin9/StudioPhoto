from django.contrib import admin
import datetime
from rangefilter.filters import DateRangeFilter
from .models import Book, Room

class BookAdmin(admin.ModelAdmin):
    list_display = ('room', 'date', 'time', 'services', 'guest_name', 'phone_number')
    list_filter = (
        ('date', DateRangeFilter), 'room', 'services',
    )
    ordering = ['date', 'time']

    def get_rangefilter_date_default(self, request):
        return (datetime.date.today, datetime.date.today()+datetime.timedelta(days = 31))

    def get_rangefilter_created_at_title(self, request, field_path):
        return 'Выберите промежуток дат'

# Register your models here.
admin.site.register(Room)
admin.site.register(Book, BookAdmin)