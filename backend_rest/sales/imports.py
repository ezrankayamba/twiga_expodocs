import openpyxl
from . import models


def import_sales(excel_file):
    wb = openpyxl.load_workbook(excel_file)
    ws = wb.active
    i = 0
    for row in ws.values:
        if i:
            dict = {}
            try:
                dict['trans_date'] = row[0]
                dict['cust_name'] = row[1]
                dict['delivery_note'] = row[2]
                dict['veh_no'] = row[3]
                dict['tax_invoice'] = row[4]
                dict['sales_order'] = row[5]
                dict['prod_name'] = row[6]
                dict['quantity'] = row[7]
                dict['value'] = row[8]
                dict['destination'] = row[9]
                print(dict)
                models.Sale.objects.create(**dict)
            except Exception as e:
                print(e)
        else:
            if len(row) < 2:
                print('Not enough columns')
                break
        i += 1
