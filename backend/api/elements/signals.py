from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver
from .models import *
from faqs.models import FAQSet


@receiver(post_save, sender=CardElement)
@receiver(post_save, sender=ListElement)
@receiver(post_save, sender=TextElement)
@receiver(post_save, sender=ImageElement)
@receiver(post_save, sender=HeaderElement)
@receiver(post_save, sender=FAQSet)
def create_element(sender, instance, created, **kwargs):
    if created:
        if sender.__name__ == "FAQSet":
            element_type = "FAQ"
        else:
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
@receiver(post_save, sender=FAQSet)
def update_element(sender, instance, **kwargs):
    try:
        element = Element.objects.get(
            object_id=instance.pk,
            content_type=ContentType.objects.get_for_model(instance),
        )
    except Element.DoesNotExist:
        create_element(sender, instance, True)
    else:
        element.name = instance.name
        element.description = instance.description
        element.subtype = instance.type
        element.save()


@receiver(pre_delete, sender=CardElement)
@receiver(pre_delete, sender=ListElement)
@receiver(pre_delete, sender=TextElement)
@receiver(pre_delete, sender=ImageElement)
@receiver(pre_delete, sender=HeaderElement)
@receiver(pre_delete, sender=FAQSet)
def delete_element(sender, instance, **kwargs):
    content_type = ContentType.objects.get_for_model(instance)
    try:
        element = Element.objects.get(object_id=instance.pk, content_type=content_type)
    except Element.DoesNotExist:
        pass
    else:
        print("Deleted", element)
        element.delete()
