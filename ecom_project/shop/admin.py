from django.contrib import admin
from .models import Category, Product, Supplier

@admin.register(Supplier)
class SupplierAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'email', 'phone']
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'supplier', 'price', 'available', 'created', 'updated']
    list_filter = ['available', 'created', 'updated', 'supplier']
    list_editable = ['price', 'available']
    prepopulated_fields = {'slug': ('name',)}
