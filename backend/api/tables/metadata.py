SERVICE_TABLE_LABEL_METADATA = {
    "autoform_label": "Service Table Columns",
    "long_description": "This model defines the labels for the services table in our application.",
    "short_description": "Labels for services table",
    "pages_associated": {
        "Services": "/services",
    },
    "include_preview": False,
    "icon": "ViewColumnIcon",
    "icon_class": None,
    "slug": "service-table-labels",
    "tags": ["services", "table", "labels"],
    "related_components": ["ComparisonTable", "TableDisplay"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
        "purpose": "This model defines the labels for the services table in our application.",
        "fields": {
            "Name": "The name of the set of service tiers and icons.",
            "Column One": "The label for the first tier of service.",
            "Icon One": "The icon for the first tier of service.",
            "Column Two": "The label for the second tier of service.",
            "Icon Two": "The icon for the second tier of service.",
            "Column Three": "The label for the third tier of service.",
            "Icon Three": "The icon for the third tier of service.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "ServiceTableLabels model reference": "/docs/model/servicetablelabels/",
            "General app documentation": "/docs/app/tables/",
        },
    },
    "filter_options": ["id", "name"],
    "allowed": False,
}


SERVICE_COMPARE_ROWS_METADATA = {
    "autoform_label": "Service Compare Rows",
    "long_description": "This model defines the rows for the Service Comparison Table.",
    "short_description": "Rows for Service Comparison Table",
    "pages_associated": {
        "Services": "/services",
    },
    "include_preview": False,
    "icon": "TableRowsIcon",
    "icon_class": None,
    "slug": "service-comparison-table-rows",
    "tags": ["Services", "Comparison", "Table"],
    "related_components": ["ComparisonTable", "TableDisplay"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
        "purpose": "This model defines the rows for the Service Comparison Table, allowing users to easily compare different service tiers based on various features.",
        "fields": {
            "Table Name": "The name of the table, which is displayed above the row of features and tiers.",
            "Feature": "The name of the feature being compared in the current row.",
            "Cell 1 Value": "The value for the first tier of the current feature.",
            "Cell 2 Value": "The value for the second tier of the current feature.",
            "Cell 3 Value": "The value for the third tier of the current feature.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "ServiceCompareRows model reference": "/docs/model/servicecomparerows/",
            "General app documentation": "/docs/app/tables/",
        },
    },
    "filter_options": ["id", "table_name"],
    "allowed": False,
}


SERVICE_TABLE_METADATA = {
    "autoform_label": "Service Table",
    "long_description": "This model represents a table of services provided by the company.",
    "short_description": "Table of Services",
    "pages_associated": {
        "Services": "/services",
    },
    "include_preview": False,
    "icon": "TableChartIcon",
    "icon_class": None,
    "slug": "service-table",
    "tags": ["services", "company", "offerings"],
    "related_components": ["ComparisonTable", "TableDisplay"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
        "purpose": "This model is used to represent a table of services provided by the company.",
        "fields": {
            "Name": "The name of the service table, which is displayed as the top header in the hero section.",
            "Labels": "The labels used in the service table, which provide context for each column.",
            "Rows": "The rows in the service table, which represent the different services provided by the company.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "ServiceTable model reference": "/docs/model/servicetable/",
            "General app documentation": "/docs/app/tables/",
        },
    },
    "filter_options": [
        "name",
        "id",
    ],
    "allowed": True,
}


TABLE_METADATA = {
    "autoform_label": "Table",
    "long_description": "This model represents a table.",
    "short_description": "Model for tables",
    "pages_associated": {
        "Tables": "/tables",
    },
    "include_preview": True,
    "icon": "TableIcon",
    "icon_class": None,
    "slug": "tables",
    "tags": ["Tables"],
    "related_components": ["TableList", "TableDetail"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
        "purpose": "This model represents a table.",
        "fields": {
            "Table Name": "The name of the table.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/ref/models/",
            "Table model reference": "/docs/table/",
        },
    },
    "allowed": True,
    "filter_options": ["name"],
}


COLUMN_METADATA = {
    "autoform_label": "Column",
    "long_description": "This model represents a column in a database table.",
    "short_description": "Model for database columns",
    "pages_associated": {
        "Tables": "/tables",
        "Columns": "/columns",
    },
    "include_preview": True,
    "icon": "ColumnIcon",
    "icon_class": None,
    "slug": "columns",
    "tags": ["Tables", "Columns"],
    "related_components": ["ColumnList", "ColumnDetail"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
        "purpose": "This model represents a column in a database table.",
        "fields": {
            "Column Name": "The name of the column.",
            "Table": "The table to which the column belongs.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/ref/models/",
            "Column model reference": "/docs/column/",
        },
    },
    "allowed": True,
    "filter_options": ["name"],
}


ROW_METADATA = {
    "autoform_label": "Row",
    "long_description": "This model represents a row in a table.",
    "short_description": "Model for table rows",
    "pages_associated": {
        "Tables": "/tables",
        "Rows": "/rows",
    },
    "include_preview": False,
    "icon": "RowIcon",
    "icon_class": None,
    "slug": "table-rows",
    "tags": ["Tables", "Rows"],
    "related_components": ["RowList", "RowDetail"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
        "purpose": "This model represents a row in a table.",
        "fields": {
            "Row Name": "The name of the row.",
            "Table": "The table to which the row belongs.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/ref/models/",
            "Row model reference": "/docs/row/",
        },
    },
    "allowed": True,
    "filter_options": ["name"],
}


CELL_METADATA = {
    "autoform_label": "Cell",
    "long_description": "This model represents a cell in a table.",
    "short_description": "Model for table cells",
    "pages_associated": {
        "Tables": "/tables",
        "Columns": "/columns",
        "Rows": "/rows",
    },
    "include_preview": True,
    "icon": "TableCellIcon",
    "icon_class": None,
    "slug": "table-cells",
    "tags": ["Tables", "Cells"],
    "related_components": ["TableCellList", "TableCellDetail"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
        "purpose": "This model represents a cell in a table.",
        "fields": {
            "Value": "The value of the cell.",
            "Column": "The column the cell belongs to.",
            "Row": "The row the cell belongs to.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/ref/models/",
            "TableCell model reference": "/docs/tablecell/",
        },
    },
    "allowed": True,
    "filter_options": ["value"],
}
