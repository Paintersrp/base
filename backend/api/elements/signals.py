from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import *


@receiver(post_save, sender=TextElement)
def create_element_for_text(sender, instance, created, **kwargs):
    if created:
        Element.objects.create(
            name=instance.name,
            content_object=instance,
            description=instance.description,
            type="Text",
        )
        print("done")


@receiver(post_save, sender=ImageElement)
def create_element_for_image(sender, instance, created, **kwargs):
    if created:
        Element.objects.create(
            name=instance.name,
            content_object=instance,
            description=instance.description,
            type="Image",
        )
        print("done")


@receiver(post_save, sender=HeaderElement)
def create_element_for_header(sender, instance, created, **kwargs):
    if created:
        Element.objects.create(
            name=instance.name,
            content_object=instance,
            description=instance.description,
            type="Header",
        )
        print("done")



