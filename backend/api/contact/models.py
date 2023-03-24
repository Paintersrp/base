from django.db import models
from api.customs import *


@custom_metadata(
    autoform_label="Manage Company Contact Information Object",
    long_description="This model represents the contact information for a company, including their email address, phone number, and physical address.",
    short_description="Contact Information Model",
    pages_associated={
        "Landing": "/",
        "Contact": "/contact",
    },
    include_preview=True,
    icon="ContactMailIcon",
    icon_class=None,
    slug="contact-info",
    tags=["About", "Header", "Company"],
    related_components="Header",
    visibility=True,
    access_level="All",
    info_dump = {
    "purpose": "This model stores the contact information for a company, including their email address, phone number, and physical address.",
    "fields": {
        "email": "The email address of the company.",
        "phone": "The phone number of the company.",
        "address": "The physical address of the company. This field is optional.",
    },
    "model_links": {
        "Model Documentation": "https://docs.example.com/contact-information",
        "Company Website": "https://www.example.com/",
    },
}
)
class ContactInformation(models.Model):
    email = CustomEmailField(
        md_column_count=6,
        verbose_name="Email",
        help_text="Help Text Placeholder",
    )
    phone = CustomCharField(
        max_length=20,
        md_column_count=6,
        verbose_name="Phone",
        help_text="Help Text Placeholder",
    )
    address = CustomTextField(
        max_length=200,
        null=True,
        verbose_name="Address",
        markdown=False,
        help_text="Help Text Placeholder",
    )

    class Meta:
        verbose_name = "Contact Information"
        verbose_name_plural = verbose_name + "s"


@custom_metadata(
    autoform_label="Manage Company Hours Object",
    long_description="This model stores the contact hours for the company.",
    short_description="Contact Hours",
    pages_associated={
        "Landing": "/",
        "Contact": "/contact",
    },
    include_preview=True,
    icon="AvTimerIcon",
    icon_class=None,
    slug="contact-hours",
    tags=["Contact", "Hours"],
    related_components="Hours",
    visibility=True,
    access_level="All",
    info_dump = {
    "purpose": "This model stores the contact hours for the company.",
    "fields": {
        "monday": "The contact hours for Monday.",
        "tuesday": "The contact hours for Tuesday.",
        "wednesday": "The contact hours for Wednesday.",
        "thursday": "The contact hours for Thursday.",
        "friday": "The contact hours for Friday.",
        "saturday": "The contact hours for Saturday.",
        "sunday": "The contact hours for Sunday.",
    },
    "model_links": {
        "Documentation": "https://example.com/docs/contact-hours/",
        "Contact Us": "https://example.com/contact/",
    }
})
class Hours(models.Model):
    monday = CustomCharField(
        max_length=40,
        null=True,
        md_column_count=3,
        verbose_name="Monday",
        help_text="Help Text Placeholder",
    )

    tuesday = CustomCharField(
        max_length=40,
        null=True,
        md_column_count=3,
        verbose_name="Tuesday",
        help_text="Help Text Placeholder",
    )

    wednesday = CustomCharField(
        max_length=40,
        null=True,
        md_column_count=3,
        verbose_name="Wednesday",
        help_text="Help Text Placeholder",
    )

    thursday = CustomCharField(
        max_length=40,
        null=True,
        md_column_count=3,
        verbose_name="Thursday",
        help_text="Help Text Placeholder",
    )

    friday = CustomCharField(
        max_length=40,
        null=True,
        md_column_count=4,
        verbose_name="Friday",
        help_text="Help Text Placeholder",
    )

    saturday = CustomCharField(
        max_length=40,
        null=True,
        md_column_count=4,
        verbose_name="Saturday",
        help_text="Help Text Placeholder",
    )

    sunday = CustomCharField(
        max_length=40,
        null=True,
        md_column_count=4,
        verbose_name="Sunday",
        help_text="Help Text Placeholder",
    )

    class Meta:
        verbose_name = "Company Hours"
        verbose_name_plural = verbose_name + "s"


@custom_metadata(
    autoform_label="Manage Company Social Contact Object",
    long_description="This model represents the social media accounts associated with a company or organization. It includes fields for Facebook, LinkedIn, Instagram, Twitter, Youtube, and Github.",
    short_description="Social Media Accounts for a Company",
    pages_associated={
        "Landing": "/",
        "Contact": "/contact",
    },
    include_preview=True,
    icon="ConnectWithoutContactIcon",
    icon_class=None,
    slug="contact-socials",
    tags=["Company", "Social Media", "Contact Information"],
    related_components="Header",
    visibility=True,
    access_level="All",
    info_dump = {
    "purpose": "This model represents the social media accounts associated with a company or organization.",
    "fields": {
        "facebook": "The company's Facebook account.",
        "linkedin": "The company's LinkedIn account.",
        "instagram": "The company's Instagram account.",
        "twitter": "The company's Twitter account.",
        "youtube": "The company's Youtube account.",
        "github": "The company's Github account.",
    },
    "model_links": {
        "Company Model": "/models/company/",
        "Social Media Model": "/models/social-media/",
    },
}
)
class Socials(models.Model):
    facebook = CustomCharField(
        max_length=100,
        null=True,
        md_column_count=6,
        verbose_name="Facebook",
        help_text="Help Text Placeholder",
    )

    linkedin = CustomCharField(
        max_length=100,
        null=True,
        md_column_count=6,
        verbose_name="LinkedIn",
        help_text="Help Text Placeholder",
    )

    instagram = CustomCharField(
        max_length=100,
        null=True,
        md_column_count=6,
        verbose_name="Instagram",
        help_text="Help Text Placeholder",
    )

    twitter = CustomCharField(
        max_length=100,
        null=True,
        md_column_count=6,
        verbose_name="Twitter",
        help_text="Help Text Placeholder",
    )
    youtube = CustomCharField(
        max_length=100,
        null=True,
        md_column_count=6,
        verbose_name="Youtube",
        help_text="Help Text Placeholder",
    )
    github = CustomCharField(
        max_length=100,
        null=True,
        md_column_count=6,
        verbose_name="Github",
        help_text="Help Text Placeholder",
    )

    class Meta:
        verbose_name = "Company Socials"
        verbose_name_plural = verbose_name + "s"


@custom_metadata(
    autoform_label="Manage Team Member Object",
    long_description="This model represents team members of our company.",
    short_description="Team Members",
    pages_associated={
        "Landing": "/",
        "Contact": "/contact",
    },
    include_preview=True,
    icon="PeopleIcon",
    icon_class=None,
    slug="contact-members",
    tags=["About", "Header", "Company"],
    related_components="Header",
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model represents team members of our company.",
        "fields": {
            "image": "The image of the team member.",
            "name": "The name of the team member.",
            "role": "The role of the team member in the company.",
            "bio": "The biography of the team member.",
            "linkedIn": "The LinkedIn profile URL of the team member.",
            "github": "The GitHub profile URL of the team member.",
            "twitter": "The Twitter profile URL of the team member.",
            "facebook": "The Facebook profile URL of the team member.",
            "instagram": "The Instagram profile URL of the team member.",
            "youtube": "The YouTube profile URL of the team member.",
        },
        "model_links": {
            "Company": "/company",
            "Header": "/header",
        },
    },
)
class TeamMember(models.Model):
    image = models.ImageField(
        upload_to="about_members",
        verbose_name="Image",
        help_text="Help Text Placeholder",
    )
    name = CustomCharField(
        max_length=100,
        md_column_count=5,
        verbose_name="Name",
        help_text="Help Text Placeholder",
    )
    role = CustomCharField(
        max_length=100,
        md_column_count=5,
        verbose_name="Role",
        help_text="Help Text Placeholder",
    )
    bio = CustomTextField(
        max_length=500,
        md_column_count=12,
        verbose_name="Bio",
        help_text="Help Text Placeholder",
    )

    linkedIn = CustomCharField(
        max_length=100,
        md_column_count=4,
        verbose_name="LinkedIn",
        blank=True,
        null=True,
        help_text="Help Text Placeholder",
    )
    github = CustomCharField(
        max_length=100,
        md_column_count=4,
        verbose_name="GitHub",
        blank=True,
        null=True,
        help_text="Help Text Placeholder",
    )
    twitter = CustomCharField(
        max_length=100,
        md_column_count=4,
        verbose_name="Twitter",
        blank=True,
        null=True,
        help_text="Help Text Placeholder",
    )
    facebook = CustomCharField(
        max_length=100,
        md_column_count=4,
        verbose_name="Facebook",
        blank=True,
        null=True,
        help_text="Help Text Placeholder",
    )
    instagram = CustomCharField(
        max_length=100,
        md_column_count=4,
        verbose_name="Instagram",
        blank=True,
        null=True,
        help_text="Help Text Placeholder",
    )
    youtube = CustomCharField(
        max_length=100,
        md_column_count=4,
        verbose_name="YouTube",
        blank=True,
        null=True,
        help_text="Help Text Placeholder",
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Members"
        verbose_name_plural = "Members"
