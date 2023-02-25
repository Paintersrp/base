from django.db import models


class AboutBlock(models.Model):
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to="about")

    class Meta:
        verbose_name = "Heading"
        verbose_name_plural = verbose_name + "s"


class MissionStatement(models.Model):
    title = models.CharField(max_length=200)
    body = models.TextField(max_length=10000, null=True)

    class Meta:
        verbose_name = "Mission Statement"
        verbose_name_plural = verbose_name + "s"


class CompanyHistory(models.Model):
    title = models.CharField(max_length=200)
    body = models.TextField(max_length=10000, null=True)

    class Meta:
        verbose_name = "History"
        verbose_name_plural = verbose_name + "s"


class Value(models.Model):
    title = models.CharField(max_length=100)
    icon = models.CharField(max_length=40)

    class Meta:
        verbose_name = "Values"
        verbose_name_plural = "Values"


class Skill(models.Model):
    name = models.CharField(max_length=100)


class ContactInformation(models.Model):
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    address = models.TextField()
    monday = models.CharField(max_length=40, null=True)
    tuesday = models.CharField(max_length=40, null=True)
    wednesday = models.CharField(max_length=40, null=True)
    thursday = models.CharField(max_length=40, null=True)
    friday = models.CharField(max_length=40, null=True)
    saturday = models.CharField(max_length=40, null=True)
    sunday = models.CharField(max_length=40, null=True)
    facebook = models.CharField(max_length=100, null=True)
    linkedin = models.CharField(max_length=100, null=True)
    instagram = models.CharField(max_length=100, null=True)
    twitter = models.CharField(max_length=100, null=True)

    class Meta:
        verbose_name = "Contact Information"
        verbose_name_plural = verbose_name + "s"


class TeamMember(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    image = models.ImageField(upload_to="about_members")
    bio = models.TextField()
    linkedIn = models.CharField(max_length=100)
    github = models.CharField(max_length=100)
    twitter = models.CharField(max_length=100)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Members"
        verbose_name_plural = "Members"


class Category(models.Model):
    name = models.CharField(max_length=100)


class FAQ(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    question = models.TextField()
    answer = models.TextField()

    class Meta:
        verbose_name = "FAQ"
        verbose_name_plural = verbose_name + "s"
