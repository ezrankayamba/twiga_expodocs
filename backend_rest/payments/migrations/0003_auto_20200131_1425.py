# Generated by Django 3.0.2 on 2020-01-31 11:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('payments', '0002_auto_20200127_1628'),
    ]

    operations = [
        migrations.AlterField(
            model_name='payment',
            name='batch',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='records', to='payments.Batch'),
        ),
    ]
