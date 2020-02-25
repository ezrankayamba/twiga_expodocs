from django.db import models

'''
Transaction Date
Customer Name
Delivery Note Ref
Veh#
Tax invoice Ref
Sales order Ref
Product Name
Qty(t)
Total Value ($)
Destination

'''


class Sale(models.Model):
    trans_date = models.CharField(max_length=100)
    cust_name = models.CharField(max_length=200)
    delivery_note = models.CharField(max_length=100)
    veh_no = models.CharField(max_length=100)
    tax_invoice = models.CharField(max_length=100)
    sales_order = models.CharField(max_length=100)
    prod_name = models.CharField(max_length=100)
    quantity = models.DecimalField(decimal_places=2, max_digits=20)
    value = models.DecimalField(decimal_places=2, max_digits=20)
    destination = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    status = models.IntegerField(default=0)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.cust_name


class SaleDoc(models.Model):
    name = models.CharField(max_length=100)
    file = models.FileField(upload_to='sales/docs/')
    sale = models.ForeignKey(to=Sale, on_delete=models.CASCADE, related_name="docs")
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
