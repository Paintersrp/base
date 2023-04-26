USER_METADATA = {
    "autoform_label": "User",
    "long_description": "This model represents a user account in our system.",
    "short_description": "User Account",
    "include_preview": False,
    "icon": "AccountCircleIcon",
    "icon_class": None,
    "slug": "users",
    "tags": ["User", "Profile"],
    "related_components": [""],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
        "purpose": "This model represents a user account in our system. It stores information about the user such as their username, email address, and contact information.",
        "fields": {
            "Username": "The username chosen by the user when they created their account.",
            "Email": "The email address associated with the user's account.",
            "First Name": "The user's first name.",
            "Last Name": "The user's last name.",
            # "Password": "The password chosen by the user when they created their account.",
            # "Salt": "A salt value used for password hashing.",
            "Phone Number": "The user's phone number.",
            "Address": "The user's street address.",
            "City": "The user's city of residence.",
            "State": "The user's state of residence.",
            "Zip Code": "The user's ZIP code.",
            "Country": "The user's country of residence.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "User model reference": "/docs/model/user/",
            "Authorization app documentation": "/docs/app/authorization/",
        },
    },
    "allowed": False,
}


THEME_SETTINGS_METADATA = {
    "autoform_label": "Theme User Setting",
    "long_description": "This model represents the theme settings for a user. Users can customize their primary, secondary, and background colors to personalize their experience.",
    "short_description": "Model for managing user theme settings.",
    "include_preview": False,
    "icon": "DisplaySettingsIcon",
    "icon_class": None,
    "slug": "theme-settings",
    "tags": ["Theme", "User"],
    "related_components": ["ThemeSettings"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
        "purpose": "This model stores the custom theme settings for each user in the application.",
        "fields": {
            "User": "The user associated with the theme settings.",
            "Primary Color": "The primary color chosen by the user.",
            "Secondary Color": "The secondary color chosen by the user.",
            "Background Color": "The background color chosen by the user.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "ThemeSettings model reference": "/docs/model/themesettings/",
            "Authorization app documentation": "/docs/app/authorization/",
        },
    },
    "allowed": False,
}


TOKEN_BLACKLIST_METADATA = {
    "autoform_label": "Manage JWT Token Blacklist",
    "long_description": "This model represents a JWT token blacklist that is used to keep track of blacklisted tokens in the system. Whenever a token is blacklisted, a record is created in this model with the token and the time it was blacklisted. This model can be used to manage and monitor the blacklisted tokens.",
    "short_description": "A model for managing JWT token blacklist",
    "include_preview": False,
    "icon": "AppBlockingIcon",
    "icon_class": None,
    "slug": "token-blacklist",
    "tags": ["Authentication", "JWT", "Security"],
    "related_components": ["TokenBlacklist,TokenAuthentication"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
        "purpose": "This model is used to manage and monitor JWT token blacklist.",
        "fields": {
            "Token": "The JWT token that has been blacklisted.",
            "Blacklisted At (auto-generated)": "The time at which the token was blacklisted.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "TokenBlacklist model reference": "/docs/model/tokenblacklist/",
            "Authorization app documentation": "/docs/app/authorization/",
        },
    },
    "allowed": False,
}
