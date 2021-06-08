from django.db import models
import datetime

# Create your models here.
class Room(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return str(self.name)

class Book(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    guest_name = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=200)
    date = models.DateField(default=datetime.date.today)
    TIME_CHOICES = (
        ('10:00', '10:00'),
        ('12:30', '12:30'),
        ('15:00', '15:00'),
    )
    time = models.CharField(
        max_length=5,
        choices=TIME_CHOICES,
        default='10:00',
        unique_for_date='date',
    )
    SERVICES_CHOICES = (
        ('nn', 'Без услуг'),
        ('ph', 'Фотограф'),
        ('st', 'Оборудование'),
    )
    services = models.CharField(
        max_length=2,
        choices=SERVICES_CHOICES,
        default='nn',
    )

    def __str__(self):
        mydict = dict(self.SERVICES_CHOICES)
        return str(datetime.datetime.strftime(self.date, "%d %B, %Y") + ' ' + self.time + ' ' + mydict[self.services])