REQUIREMENT_METADATA = {
    "autoform_label": "Job Posting Requirement",
    "long_description": "A requirement for a job posting",
    "short_description": "Job Requirement",
    "pages_associated": {
        "Jobs": "/jobs",
        "Contact": "/contact",
    },
    "include_preview": True,
    "icon": None,
    "icon_class": None,
    "slug": "job-requirement",
    "tags": ["Job Posting", "Requirement"],
    "related_components": "Header",
    "visibility": False,
    "access_level": "All",
    "info_dump": {
        "purpose": "This model represents a requirement for a job posting. It contains information about a specific requirement that a job posting may have, such as a required skill or qualification.",
        "fields": {
            "Detail": "This field is a character field that stores the specific requirement for the job posting. It can be up to 200 characters in length.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "Requirement model reference": "/docs/models/requirement/",
            "Jobs documentation": "/docs/support/requirement/",
        },
    },
    "allowed": False,
}


RESPONSIBILITIES_METADATA = {
    "autoform_label": "Job Posting Responsibility",
    "long_description": "This model represents the responsibilities for a particular job posting.",
    "short_description": "Responsibilities for a Job Posting",
    "pages_associated": {
        "Jobs": "/jobs",
        "Contact": "/contact",
    },
    "include_preview": True,
    "icon": None,
    "icon_class": None,
    "slug": "job-responsibilities",
    "tags": ["Job Postings", "Responsibilities"],
    "related_components": "Header",
    "visibility": False,
    "access_level": "All",
    "info_dump": {
        "purpose": "This model is used to store the responsibilities for a particular job posting. It is intended to be used as part of a larger job posting application.",
        "fields": {
            "detail": "A text field containing the specific responsibilities for the job posting.",
        },
        "model_links": {
            "JobPosting": "/docs/models/job-posting/",
        },
    },
    "allowed": False,
}


JOB_POSTING_METADATA = {
    "autoform_label": "Job Opening Post",
    "long_description": "This model represents a job posting on the company's contact page.",
    "short_description": "Model for a job posting",
    "pages_associated": {
        "Jobs": "/jobs",
        "Contact": "/contact",
    },
    "include_preview": True,
    "icon": "JoinFullIcon",
    "icon_class": None,
    "slug": "job-postings",
    "tags": ["About", "Header", "Company"],
    "related_components": ["JobListing", "JobsIndividual"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
        "purpose": "This model represents a job posting on the company's careers page.",
        "fields": {
            "Position": "The title of the job.",
            "Location": "The location of the job.",
            "Type": "The type of job (e.g. full-time, part-time).",
            "Tagline": "A short description of the job.",
            "Who We Are": "A description of the company and its values.",
            "Requirements": "The requirements for the job.",
            "Responsibilities": "The responsibilities of the job.",
            "Looking For": "A description of the ideal candidate for the job.",
            "Why Apply": "A description of the benefits of working for the company.",
            "Filled": "Whether or not the job has been filled.",
            "Created At (auto-generated)": "The date and time the job posting was created.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/ref/models/",
            "JobPosting model reference": "/docs/jobposting/",
        },
    },
    "allowed": True,
    "filter_options": ["position"],
}


APPLICAITON_METADATA = {
    "autoform_label": "Application",
    "long_description": "This model represents a job application submitted through the company's website.",
    "short_description": "Job Application",
    "pages_associated": {
        "Jobs": "/jobs",
        "Contact": "/contact",
    },
    "include_preview": False,
    "icon": "ApprovalIcon",
    "icon_class": None,
    "slug": "application",
    "tags": ["About", "Header", "Company"],
    "related_components": ["ReadApplication", "JobApplication"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
        "purpose": "This model stores information about a job application submitted through the company's website.",
        "fields": {
            "First Name": "The first name of the applicant.",
            "Last Name": "The last name of the applicant.",
            "Email": "The email address of the applicant.",
            "Phone": "The phone number of the applicant.",
            "City": "The city of the applicant.",
            "Zipcode": "The zip code of the applicant.",
            "Job": "The job posting the applicant is applying for.",
            "Resume": "The applicant's resume file.",
            "Status": "The current status of the application (e.g. Pending, Reviewing, Rejected, Accepted).",
            "Created At (auto-generated)": "The date and time the application was created.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/ref/models/",
            "Application model reference": "/docs/application/",
        },
    },
    "filter_options": [
        "job",
        "status",
    ],
    "allowed": False,
}
