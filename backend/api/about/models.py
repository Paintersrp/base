from django.db import models
from api.customs import CustomCharField, CustomEmailField, CustomTextField
from auditlog.registry import auditlog


class AboutBlock(models.Model):
    title = CustomCharField(max_length=200, md_column_count=10, verbose_name="Title")
    image = models.ImageField(upload_to="about", verbose_name="Image")

    class Meta:
        verbose_name = "Heading"
        verbose_name_plural = verbose_name + "s"


class MissionStatement(models.Model):
    title = CustomCharField(max_length=200, md_column_count=10, verbose_name="Title")
    body = CustomTextField(
        max_length=10000, null=True, verbose_name="Body", markdown=True
    )

    class Meta:
        verbose_name = "Mission Statement"
        verbose_name_plural = verbose_name + "s"


class CompanyHistory(models.Model):
    title = CustomCharField(max_length=200, md_column_count=10, verbose_name="Title")
    body = CustomTextField(
        max_length=10000, null=True, verbose_name="Body", markdown=True
    )

    class Meta:
        verbose_name = "History"
        verbose_name_plural = verbose_name + "s"


class Value(models.Model):
    title = CustomCharField(max_length=100, md_column_count=8, verbose_name="Title")
    icon = CustomCharField(max_length=40, md_column_count=8, verbose_name="Icon")

    class Meta:
        verbose_name = "Values"
        verbose_name_plural = "Values"


class Skill(models.Model):
    name = CustomCharField(max_length=100)


class ContactInformation(models.Model):
    email = CustomEmailField(md_column_count=6, verbose_name="Email")
    phone = CustomCharField(max_length=20, md_column_count=6, verbose_name="Phone")
    address = CustomTextField(
        max_length=200, null=True, verbose_name="Address", markdown=False
    )

    monday = CustomCharField(
        max_length=40, null=True, md_column_count=3, verbose_name="Monday"
    )

    tuesday = CustomCharField(
        max_length=40, null=True, md_column_count=3, verbose_name="Tuesday"
    )

    wednesday = CustomCharField(
        max_length=40, null=True, md_column_count=3, verbose_name="Wednesday"
    )

    thursday = CustomCharField(
        max_length=40, null=True, md_column_count=3, verbose_name="Thursday"
    )

    friday = CustomCharField(
        max_length=40, null=True, md_column_count=4, verbose_name="Friday"
    )

    saturday = CustomCharField(
        max_length=40, null=True, md_column_count=4, verbose_name="Saturday"
    )

    sunday = CustomCharField(
        max_length=40, null=True, md_column_count=4, verbose_name="Sunday"
    )

    facebook = CustomCharField(
        max_length=100, null=True, md_column_count=6, verbose_name="Facebook"
    )

    linkedin = CustomCharField(
        max_length=100, null=True, md_column_count=6, verbose_name="LinkedIn"
    )

    instagram = CustomCharField(
        max_length=100, null=True, md_column_count=6, verbose_name="Instagram"
    )

    twitter = CustomCharField(
        max_length=100, null=True, md_column_count=6, verbose_name="Twitter"
    )
    youtube = CustomCharField(
        max_length=100, null=True, md_column_count=6, verbose_name="Youtube"
    )
    github = CustomCharField(
        max_length=100, null=True, md_column_count=6, verbose_name="Github"
    )

    class Meta:
        verbose_name = "Contact Information"
        verbose_name_plural = verbose_name + "s"


class TeamMember(models.Model):
    image = models.ImageField(upload_to="about_members", verbose_name="Image")
    name = CustomCharField(max_length=100, md_column_count=5, verbose_name="Name")
    role = CustomCharField(max_length=100, md_column_count=5, verbose_name="Role")
    bio = models.TextField(verbose_name="Bio")

    linkedIn = CustomCharField(
        max_length=100,
        md_column_count=4,
        verbose_name="LinkedIn",
        blank=True,
        null=True,
    )
    github = CustomCharField(
        max_length=100, md_column_count=4, verbose_name="GitHub", blank=True, null=True
    )
    twitter = CustomCharField(
        max_length=100, md_column_count=4, verbose_name="Twitter", blank=True, null=True
    )
    facebook = CustomCharField(
        max_length=100,
        md_column_count=4,
        verbose_name="Facebook",
        blank=True,
        null=True,
    )
    instagram = CustomCharField(
        max_length=100,
        md_column_count=4,
        verbose_name="Instagram",
        blank=True,
        null=True,
    )
    youtube = CustomCharField(
        max_length=100, md_column_count=4, verbose_name="YouTube", blank=True, null=True
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Members"
        verbose_name_plural = "Members"


class Category(models.Model):
    name = CustomCharField(max_length=100, verbose_name="Category")

    class Meta:
        verbose_name = "FAQ Categories"
        verbose_name_plural = verbose_name + "Categories"


class FAQ(models.Model):
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, verbose_name="Category"
    )

    question = CustomTextField(
        max_length=500, md_column_count=6, verbose_name="Question"
    )
    answer = CustomTextField(max_length=500, md_column_count=6, verbose_name="Answer")

    class Meta:
        verbose_name = "FAQ"
        verbose_name_plural = verbose_name + "s"


# auditlog.register(AboutBlock)
# auditlog.register(MissionStatement)
# auditlog.register(CompanyHistory)
# auditlog.register(Value)
# auditlog.register(ContactInformation)
# auditlog.register(TeamMember)
# auditlog.register(Category)
# auditlog.register(FAQ)
