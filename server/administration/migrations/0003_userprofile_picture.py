# Generated by Django 3.2.10 on 2022-01-28 00:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('administration', '0002_userprofile_id_number_userprofile_age_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='picture',
            field=models.TextField(blank=True, null=True),
        ),
    ]
