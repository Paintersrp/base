from django.db import models
from api.customs import *


@custom_metadata(
    autoform_label="Company Contact Information",
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
    tags=["Contact", "Phone", "Address", "Email"],
    related_components=["ContactInformation"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model stores the contact information for a company, including their email address, phone number, and physical address.",
        "fields": {
            "Email": "The email address of the company.",
            "Phone": "The phone number of the company.",
            "Address": "The physical address of the company. This field is optional.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "ContactInformation model reference": "/docs/model/contactinformation/",
            "General app documentation": "/docs/app/contact/",
        },
    },
)
class ContactInformation(models.Model):
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

    class Meta:
        verbose_name = "Contact Information"
        verbose_name_plural = verbose_name + "s"


@custom_metadata(
    autoform_label="Company Hours",
    long_description="This model stores the contact hours for the company.",
    short_description="Company Hours",
    pages_associated={
        "Landing": "/",
        "Contact": "/contact",
    },
    include_preview=True,
    icon="AvTimerIcon",
    icon_class=None,
    slug="contact-hours",
    tags=["Contact", "Hours"],
    related_components=["Hours"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model stores the contact hours for the company.",
        "fields": {
            "Monday": "The contact hours for Monday.",
            "Tuesday": "The contact hours for Tuesday.",
            "Wednesday": "The contact hours for Wednesday.",
            "Thursday": "The contact hours for Thursday.",
            "Friday": "The contact hours for Friday.",
            "Saturday": "The contact hours for Saturday.",
            "Sunday": "The contact hours for Sunday.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "Hours model reference": "/docs/model/hours/",
            "Contact app documentation": "/docs/app/contact/",
        },
    },
)
class Hours(models.Model):
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

    class Meta:
        verbose_name = "Company Hours"
        verbose_name_plural = verbose_name + "s"


@custom_metadata(
    autoform_label="Company Social Contact",
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
    related_components=["Socials"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model represents the social media accounts associated with a company or organization.",
        "fields": {
            "Facebook": "The company's Facebook account.",
            "Linkedin": "The company's LinkedIn account.",
            "Instagram": "The company's Instagram account.",
            "Twitter": "The company's Twitter account.",
            "Youtube": "The company's Youtube account.",
            "Github": "The company's Github account.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "Socials model reference": "/docs/model/socials/",
            "Contact app documentation": "/docs/app/contact/",
        },
    },
)
class Socials(models.Model):
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

    class Meta:
        verbose_name = "Company Socials"
        verbose_name_plural = verbose_name + "s"


@custom_metadata(
    autoform_label="Team Member",
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
    tags=["Contact", "Team", "Bio"],
    related_components=["Members", "Member"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model represents team members of our company.",
        "fields": {
            "Image": "The image of the team member.",
            "Name": "The name of the team member.",
            "Role": "The role of the team member in the company.",
            "Bio": "The biography of the team member.",
            "LinkedIn": "The LinkedIn profile URL of the team member.",
            "Github": "The GitHub profile URL of the team member.",
            "Twitter": "The Twitter profile URL of the team member.",
            "Facebook": "The Facebook profile URL of the team member.",
            "Instagram": "The Instagram profile URL of the team member.",
            "Youtube": "The YouTube profile URL of the team member.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "TeamMember model reference": "/docs/model/teammember/",
            "Contact app documentation": "/docs/app/contact/",
        },
    },
)
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
