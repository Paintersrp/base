from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(FAQSet)
admin.site.register(FAQQuestionCategory)
admin.site.register(FAQQuestion)
admin.site.register(FAQAnswer)
admin.site.register(FAQQuestionSet)
