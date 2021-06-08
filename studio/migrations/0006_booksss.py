# Generated by Django 2.2.7 on 2021-05-30 23:24

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('studio', '0005_auto_20210530_1858'),
    ]

    operations = [
        migrations.CreateModel(
            name='Booksss',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('guest_name', models.CharField(max_length=200)),
                ('phone_number', models.CharField(max_length=200)),
                ('date', models.DateField(default=datetime.date.today)),
                ('time', models.CharField(choices=[('10:00', '10:00'), ('12:30', '12:30'), ('15:00', '15:00')], default='10:00', max_length=5, unique_for_date='date')),
                ('services', models.CharField(choices=[('nn', 'Без услуг'), ('ph', 'Фотограф'), ('st', 'Оборудование')], default='nn', max_length=2)),
                ('room', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='studio.Room')),
            ],
        ),
    ]