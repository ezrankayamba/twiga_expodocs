from . import models
from rest_framework import serializers


class SaleDocSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.SaleDoc
        fields = ('id', 'name', "file", 'created_at', 'sale')


class SaleSerializer(serializers.ModelSerializer):
    docs = SaleDocSerializer(many=True, read_only=True)

    class Meta:
        model = models.Sale
        fields = '__all__'
