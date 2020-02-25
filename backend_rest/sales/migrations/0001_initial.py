# Generated by Django 3.0.3 on 2020-02-25 19:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Sale',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('trans_date', models.CharField(max_length=100)),
                ('cust_name', models.CharField(max_length=200)),
                ('delivery_note', models.CharField(max_length=100)),
                ('veh_no', models.CharField(max_length=100)),
                ('tax_invoice', models.CharField(max_length=100)),
                ('sales_order', models.CharField(max_length=100)),
                ('prod_name', models.CharField(max_length=100)),
                ('quantity', models.DecimalField(decimal_places=2, max_digits=20)),
                ('value', models.DecimalField(decimal_places=2, max_digits=20)),
                ('destination', models.CharField(max_length=100)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
                ('status', models.IntegerField(default=0)),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='SaleDoc',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('file', models.FileField(upload_to='sales/docs/')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('sale', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='docs', to='sales.Sale')),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
    ]