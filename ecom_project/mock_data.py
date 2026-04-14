import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecom_project.settings')
django.setup()

from shop.models import Category, Product

def populate():
    print("Xóa dữ liệu cũ...")
    Product.objects.all().delete()
    Category.objects.all().delete()

    print("Tạo danh mục...")
    cat_dien_thoai = Category.objects.create(name='Điện thoại', slug='dien-thoai')
    cat_laptop = Category.objects.create(name='Laptop', slug='laptop')
    cat_phu_kien = Category.objects.create(name='Phụ kiện', slug='phu-kien')

    print("Tạo sản phẩm...")
    Product.objects.create(
        category=cat_dien_thoai,
        name='iPhone 15 Pro Max',
        slug='iphone-15-pro-max',
        price='30000000.00',
        description='Một trong những chiếc điện thoại đỉnh cao nhất của Apple.',
        available=True
    )

    Product.objects.create(
        category=cat_dien_thoai,
        name='Samsung Galaxy S24 Ultra',
        slug='samsung-galaxy-s24-ultra',
        price='28000000.00',
        description='Trải nghiệm AI tuyệt đỉnh với camera zoom quang xa.',
        available=True
    )

    Product.objects.create(
        category=cat_laptop,
        name='MacBook Pro M3',
        slug='macbook-pro-m3',
        price='40000000.00',
        description='Sức mạnh chip M3 với thời lượng pin không tưởng.',
        available=True
    )

    Product.objects.create(
        category=cat_phu_kien,
        name='Tai nghe AirPods Pro 2',
        slug='airpods-pro-2',
        price='5500000.00',
        description='Chống ồn ấn tượng, âm thanh trong trẻo.',
        available=True
    )

    print("Hoàn tất tạo dữ liệu mẫu!")

if __name__ == '__main__':
    populate()
