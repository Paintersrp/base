from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(ElementSetCategory)
admin.site.register(Element)
admin.site.register(TextElement)
admin.site.register(ImageElement)
admin.site.register(HeaderElement)
admin.site.register(ElementSet)
