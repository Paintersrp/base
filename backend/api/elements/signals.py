from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import *


@receiver(post_save, sender=CardElement)
@receiver(post_save, sender=ListElement)
@receiver(post_save, sender=TextElement)
@receiver(post_save, sender=ImageElement)
@receiver(post_save, sender=HeaderElement)
def create_element(sender, instance, created, **kwargs):
    if created:
        element_type = sender.__name__.replace("Element", "")

        Element.objects.create(
            name=instance.name,
            content_object=instance,
            description=instance.description,
            type=element_type,
            subtype=instance.type,
            author=instance.author,
        )


@receiver(post_save, sender=CardElement)
@receiver(post_save, sender=ListElement)
@receiver(post_save, sender=TextElement)
@receiver(post_save, sender=ImageElement)
@receiver(post_save, sender=HeaderElement)
def update_element(sender, instance, **kwargs):
    try:
        element = Element.objects.get(
            object_id=instance.pk,
            content_type=ContentType.objects.get_for_model(instance),
        )
    except Element.DoesNotExist:
        create_element(sender, instance, True, **kwargs)
    else:
        element.name = instance.name
        element.description = instance.description
        element.subtype = instance.type
        element.save()
