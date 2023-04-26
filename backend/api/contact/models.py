from django.db import models
from api.customs import *
from .metadata import *


@metadata(**CONTACT_INFORMATION_METADATA)
class ContactInformation(models.Model):
    set_name = CustomCharField(
        max_length=100,
        md_column_count=6,
        verbose_name="Contact Information Set Name",
        help_text="Contact Information Set Name",
        unique=True,
    )
    email = CustomEmailField(
        md_column_count=6,
        verbose_name="Email",
        help_text="Email Address",
    )
    phone = CustomCharField(
        max_length=20,
        md_column_count=6,
        verbose_name="Phone",
        help_text="Phone Number",
    )
    address = CustomTextField(
        max_length=200,
        null=True,
        verbose_name="Address",
        markdown=False,
        help_text="Address",
        min_rows=3,
    )

    def __str__(self):
        return self.set_name

    class Meta:
        verbose_name = "Contact Information"
        verbose_name_plural = verbose_name + "s"


@metadata(**HOURS_METADATA)
class Hours(models.Model):
    set_name = CustomCharField(
        max_length=100,
        md_column_count=6,
        verbose_name="Hours Set Name",
        help_text="Hours Set Name",
        unique=True,
    )
    monday = CustomCharField(
        max_length=40,
        null=True,
        md_column_count=3,
        verbose_name="Monday",
        help_text="Monday",
    )

    tuesday = CustomCharField(
        max_length=40,
        null=True,
        md_column_count=3,
        verbose_name="Tuesday",
        help_text="Tuesday",
    )

    wednesday = CustomCharField(
        max_length=40,
        null=True,
        md_column_count=3,
        verbose_name="Wednesday",
        help_text="Wednesday",
    )

    thursday = CustomCharField(
        max_length=40,
        null=True,
        md_column_count=3,
        verbose_name="Thursday",
        help_text="Thursday",
    )

    friday = CustomCharField(
        max_length=40,
        null=True,
        md_column_count=4,
        verbose_name="Friday",
        help_text="Friday",
    )

    saturday = CustomCharField(
        max_length=40,
        null=True,
        md_column_count=4,
        verbose_name="Saturday",
        help_text="Saturday",
    )

    sunday = CustomCharField(
        max_length=40,
        null=True,
        md_column_count=4,
        verbose_name="Sunday",
        help_text="Sunday",
    )

    def __str__(self):
        return self.set_name

    class Meta:
        verbose_name = "Company Hours"
        verbose_name_plural = verbose_name + "s"


@metadata(**SOCIALS_METADATA)
class Socials(models.Model):
    set_name = CustomCharField(
        max_length=100,
        md_column_count=6,
        verbose_name="Social Set Name",
        help_text="Social Set Name",
        unique=True,
    )
    facebook = CustomCharField(
        max_length=100,
        null=True,
        md_column_count=6,
        verbose_name="Facebook",
        help_text="Facebook",
    )

    linkedin = CustomCharField(
        max_length=100,
        null=True,
        md_column_count=6,
        verbose_name="LinkedIn",
        help_text="LinkedIn",
    )

    instagram = CustomCharField(
        max_length=100,
        null=True,
        md_column_count=6,
        verbose_name="Instagram",
        help_text="Instagram",
    )

    twitter = CustomCharField(
        max_length=100,
        null=True,
        md_column_count=6,
        verbose_name="Twitter",
        help_text="Twitter",
    )
    youtube = CustomCharField(
        max_length=100,
        null=True,
        md_column_count=6,
        verbose_name="Youtube",
        help_text="Youtube",
    )
    github = CustomCharField(
        max_length=100,
        null=True,
        md_column_count=6,
        verbose_name="Github",
        help_text="Github",
    )

    def __str__(self):
        return self.set_name

    class Meta:
        verbose_name = "Company Socials"
        verbose_name_plural = verbose_name + "s"


@metadata(**TEAM_MEMBER_METADATA)
class TeamMember(models.Model):
    image = models.ImageField(
        upload_to="about_members",
        verbose_name="Image",
        help_text="Image",
    )
    name = CustomCharField(
        max_length=100,
        md_column_count=6,
        verbose_name="Name",
        help_text="Full Name",
    )
    role = CustomCharField(
        max_length=100,
        md_column_count=6,
        verbose_name="Role",
        help_text="Role",
    )
    bio = CustomTextField(
        max_length=500,
        md_column_count=12,
        verbose_name="Bio",
        help_text="Short Biography",
        min_rows=3,
    )

    linkedIn = CustomCharField(
        max_length=100,
        md_column_count=4,
        verbose_name="LinkedIn",
        blank=True,
        null=True,
        help_text="LinkedIn",
    )
    github = CustomCharField(
        max_length=100,
        md_column_count=4,
        verbose_name="GitHub",
        blank=True,
        null=True,
        help_text="GitHub",
    )
    twitter = CustomCharField(
        max_length=100,
        md_column_count=4,
        verbose_name="Twitter",
        blank=True,
        null=True,
        help_text="Twitter",
    )
    facebook = CustomCharField(
        max_length=100,
        md_column_count=4,
        verbose_name="Facebook",
        blank=True,
        null=True,
        help_text="Facebook",
    )
    instagram = CustomCharField(
        max_length=100,
        md_column_count=4,
        verbose_name="Instagram",
        blank=True,
        null=True,
        help_text="Instagram",
    )
    youtube = CustomCharField(
        max_length=100,
        md_column_count=4,
        verbose_name="YouTube",
        blank=True,
        null=True,
        help_text="YouTube",
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Members"
        verbose_name_plural = "Members"


@metadata(**CONTACT_METADATA)
class Contact(models.Model):
    name = CustomCharField(
        max_length=20,
        md_column_count=12,
        verbose_name="Referential Name",
        help_text="Referential Name",
        default="Placeholder",
    )
    contact_info = models.ForeignKey(
        ContactInformation,
        on_delete=models.CASCADE,
        default=1,
    )
    socials = models.ForeignKey(
        Socials,
        on_delete=models.CASCADE,
        default=1,
    )
    hours = models.ForeignKey(
        Hours,
        on_delete=models.CASCADE,
        default=1,
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Contact"
        verbose_name_plural = "Contacts"
