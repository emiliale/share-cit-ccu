# Generated by Django 3.2.10 on 2022-01-27 19:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('administration', '0002_userprofile_id_number_userprofile_age_and_more'),
        ('ride', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='passengerride',
            name='passenger',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='passenger_user', to='administration.userprofile'),
        ),
    ]
