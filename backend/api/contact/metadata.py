CONTACT_INFORMATION_METADATA = {
    "autoform_label": "Company Contact Information",
    "long_description": "This model represents the contact information for a company, including their email address, phone number, and physical address.",
    "short_description": "Contact Information Model",
    "pages_associated": {
        "Landing": "/",
        "Contact": "/contact",
    },
    "include_preview": True,
    "icon": "ContactMailIcon",
    "icon_class": None,
    "slug": "contact-info",
    "tags": ["Contact", "Phone", "Address", "Email"],
    "related_components": ["ContactInformation"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
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
    "filter_options": [
        "set_name",
        "id",
    ],
    "allowed": True,
}


HOURS_METADATA = {
    "autoform_label": "Company Hours",
    "long_description": "This model stores the contact hours for the company.",
    "short_description": "Company Hours",
    "pages_associated": {
        "Landing": "/",
        "Contact": "/contact",
    },
    "include_preview": True,
    "icon": "AvTimerIcon",
    "icon_class": None,
    "slug": "contact-hours",
    "tags": ["Contact", "Hours"],
    "related_components": ["Hours"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
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
    "filter_options": [
        "set_name",
        "id",
    ],
    "allowed": True,
}


SOCIALS_METADATA = {
    "autoform_label": "Company Social Contact",
    "long_description": "This model represents the social media accounts associated with a company or organization. It includes fields for Facebook, LinkedIn, Instagram, Twitter, Youtube, and Github.",
    "short_description": "Social Media Accounts for a Company",
    "pages_associated": {
        "Landing": "/",
        "Contact": "/contact",
    },
    "include_preview": True,
    "icon": "ConnectWithoutContactIcon",
    "icon_class": None,
    "slug": "contact-socials",
    "tags": ["Company", "Social Media", "Contact Information"],
    "related_components": ["Socials"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
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
    "filter_options": [
        "set_name",
        "id",
    ],
    "allowed": True,
}


TEAM_MEMBER_METADATA = {
    "autoform_label": "Team Member",
    "long_description": "This model represents team members of our company.",
    "short_description": "Team Members",
    "pages_associated": {
        "Landing": "/",
        "Contact": "/contact",
    },
    "include_preview": True,
    "icon": "PeopleIcon",
    "icon_class": None,
    "slug": "contact-members",
    "tags": ["Contact", "Team", "Bio"],
    "related_components": ["Members", "Member"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
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
    "filter_options": [
        "name",
        "id",
    ],
    "allowed": True,
}


CONTACT_METADATA = {
    "autoform_label": "Contact",
    "long_description": "A model for storing contact information, social media links, and hours of operation for a business or organization.",
    "short_description": "A model for storing contact information and hours of operation.",
    "pages_associated": {
        "Landing": "/",
        "Contact": "/contact",
    },
    "include_preview": True,
    "icon": "PeopleIcon",
    "icon_class": None,
    "slug": "contact",
    "tags": ["Contact", "Information", "Hours"],
    "related_components": ["Contact Form"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
        "purpose": "This model is used to store the contact information, social media links, and hours of operation for a business or organization. It can be used to display this information on a contact page or in other relevant sections of a website.",
        "fields": {
            "Name": "The name of the contact person or department.",
            "Contact Information": "The contact information, such as email, phone number, or address.",
            "Socials": "The social media links associated with the contact person or department.",
            "Hours": "The hours of operation for the contact person or department.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "Page model reference": "/docs/model/page/",
            "Full App documentation": "/docs/app/app/",
        },
    },
    "allowed": True,
    "filter_options": ["name"],
}
