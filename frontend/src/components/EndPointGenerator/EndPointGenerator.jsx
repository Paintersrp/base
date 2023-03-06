import React, { useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import BaseForm from "../Elements/Base/BaseForm.jsx";
import BaseCarousel from "../Elements/Base/BaseCarousel.jsx";
import FieldForm from "./FieldForm.jsx";
import FieldActions from "./FieldActions.jsx";
import ManyToManyField from "../Elements/Fields/ManyToManyField.jsx";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1200,
    margin: "auto",
  },
}));

const EndPointGenerator = () => {
  const classes = useStyles();
  const [modelName, setModelName] = useState("");
  const [verboseName, setVerboseName] = useState("");
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const [fields, setFields] = useState([
    {
      name: "",
      verbose_name: "",
      type: "",
      max_length: "",
      xs_column_count: "",
      md_column_count: "",
      auto_now_add: "",
    },
  ]);

  const handleChange = (index, event) => {
    const values = [...fields];
    values[index][event.target.name] = event.target.value;
    setFields(values);
  };

  const handleAddField = () => {
    const values = [...fields];
    values.push({
      name: "",
      verbose_name: "",
      type: "",
      max_length: "",
      xs_column_count: "",
      md_column_count: "",
      auto_now_add: "",
    });
    setFields(values);
    setCurrentFieldIndex(values.length - 1);
  };

  const handleRemoveField = (index) => {
    const values = [...fields];

    setCurrentFieldIndex(currentFieldIndex - 1);
    if (values.length === 1 && index === 0) {
      setFields([
        {
          name: "",
          verbose_name: "",
          type: "",
          max_length: "",
          xs_column_count: "",
          md_column_count: "",
          auto_now_add: "",
        },
      ]);
    } else {
      setTimeout(() => {
        values.splice(index, 1);
        setFields(values);
      }, 500);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let modelCode = `from django.db import models\nfrom api.customs import *\nfrom auditlog.registry import auditlog \n\n`;
    let serializerCode = `from rest_framework import serializers\nfrom .models import ${modelName}\n\n`;
    let viewsCode = `from rest_framework import generics\nfrom .serializers import *\nfrom .models import ${modelName}\n\n`;
    let urlsCode = `from django.urls import path\nfrom .views import *\n\n`;
    let adminCode = `from django.contrib import admin\nfrom .models import ${modelName}\n\n`;
    let modelType = "";

    modelCode += `class ${modelName}(models.Model):\n`;

    fields.forEach((field) => {
      const {
        name,
        verbose_name,
        type,
        max_length,
        xs_column_count,
        md_column_count,
        auto_now_add,
      } = field;
      const argMaxLength = max_length ? `max_length=${max_length},` : "";
      const argXsCount = xs_column_count
        ? `xs_column_count=${xs_column_count},`
        : "";
      const argMdCount = md_column_count
        ? `md_column_count=${md_column_count},`
        : "";
      const argVerboseName = verbose_name
        ? `verbose_name="${verbose_name}",`
        : "";
      const argAutoNowAdd = auto_now_add ? `auto_now_add=${auto_now_add}` : "";
      let argModelType;

      if (
        type === "CharField" ||
        type === "EmailField" ||
        type === "TextField" ||
        type === "DecimalField" ||
        type === "BooleanField" ||
        type === "ManyToManyField"
      ) {
        argModelType = `Custom${type}`;
      } else {
        argModelType = type;
      }

      const fieldArgs = `${argMaxLength} ${argXsCount} ${argMdCount} ${argVerboseName} ${argAutoNowAdd}`;
      modelCode += `  ${name} = ${argModelType}(${fieldArgs})\n`;
    });

    modelCode += `\n  class Meta: \n    verbose_name = ${verboseName} \n    verbose_name_plural = ${verboseName}s`;
    modelCode += `\n\n auditlog.register(${modelName})`;

    let fieldKeys = "[";
    checkedKeys.forEach((key, index) => {
      if (key !== null && key !== "") {
        fieldKeys += `"${key}"`;
      }

      if (index < checkedKeys.length - 1 && key !== null && key !== "") {
        fieldKeys += ", ";
      }
    });
    fieldKeys += "]";

    serializerCode += `class ${modelName}Serializer(serializers.ModelSerializer):\n  FIELD_KEYS = ${fieldKeys} \n\n class Meta:\n    model = ${modelName}\n    fields = '__all__'\n\n ${modelName}.serializer_class = ${modelName}Serializer`;

    const capitalizedModelName =
      modelName.charAt(0).toUpperCase() + modelName.slice(1);

    viewsCode += `class ${capitalizedModelName}ListView(generics.ListCreateAPIView):\n  queryset = ${modelName}.objects.all()\n  serializer_class = ${modelName}Serializer\n\n`;
    viewsCode += `class ${capitalizedModelName}DetailView(generics.RetrieveUpdateDestroyAPIView):\n  queryset = ${modelName}.objects.all()\n  serializer_class = ${modelName}Serializer\n\n`;

    urlsCode += `urlpatterns = [\n  path('${modelName.toLowerCase()}/', ${capitalizedModelName}ListView.as_view(), name="${modelName.toLowerCase()}-list"),\n`;
    urlsCode += `  path('${modelName.toLowerCase()}/<int:pk>/', ${capitalizedModelName}DetailView.as_view(), name="${modelName.toLowerCase()}-detail"),\n]\n`;

    adminCode += `class ${capitalizedModelName}Admin(admin.ModelAdmin):\n  list_display = [`;

    fields.forEach((field, index) => {
      const { name } = field;
      adminCode += `'${name}'`;
      if (index < fields.length - 1) {
        adminCode += ", ";
      }
    });

    adminCode += `]\n\n`;
    adminCode += `admin.site.register(${modelName}, ${capitalizedModelName}Admin)\n`;

    const codeDisplay = document.createElement("div");
    codeDisplay.id = "code-display";

    const modelCodeSection = document.createElement("div");
    modelCodeSection.id = "code-section";

    const modelCodeHeader = document.createElement("h3");
    modelCodeHeader.textContent = "models.py code:";

    const modelCodePre = document.createElement("pre");
    const modelCodeCode = document.createElement("code");
    modelCodeCode.textContent = modelCode;

    modelCodePre.appendChild(modelCodeCode);
    modelCodeSection.appendChild(modelCodeHeader);
    modelCodeSection.appendChild(modelCodePre);

    const serializerCodeSection = document.createElement("div");
    serializerCodeSection.id = "code-section";

    const serializerCodeHeader = document.createElement("h3");
    serializerCodeHeader.textContent = "serializers.py code:";

    const serializerCodePre = document.createElement("pre");
    const serializerCodeCode = document.createElement("code");
    serializerCodeCode.textContent = serializerCode;
    serializerCodePre.appendChild(serializerCodeCode);

    serializerCodeSection.appendChild(serializerCodeHeader);
    serializerCodeSection.appendChild(serializerCodePre);

    const viewsCodeSection = document.createElement("div");
    viewsCodeSection.id = "code-section";

    const viewsCodeHeader = document.createElement("h3");
    viewsCodeHeader.textContent = "views.py code:";

    const viewsCodePre = document.createElement("pre");
    const viewsCodeCode = document.createElement("code");
    viewsCodeCode.textContent = viewsCode;
    viewsCodePre.appendChild(viewsCodeCode);

    viewsCodeSection.appendChild(viewsCodeHeader);
    viewsCodeSection.appendChild(viewsCodePre);

    const urlsCodeSection = document.createElement("div");
    urlsCodeSection.id = "code-section";

    const urlsCodeHeader = document.createElement("h3");
    urlsCodeHeader.textContent = "urls.py code:";

    const urlsCodePre = document.createElement("pre");
    const urlsCodeCode = document.createElement("code");
    urlsCodeCode.textContent = urlsCode;
    urlsCodePre.appendChild(urlsCodeCode);

    urlsCodeSection.appendChild(urlsCodeHeader);
    urlsCodeSection.appendChild(urlsCodePre);

    const adminCodeSection = document.createElement("div");
    adminCodeSection.id = "code-section";

    const adminCodeHeader = document.createElement("h3");
    adminCodeHeader.textContent = "admin.py code:";

    const adminCodePre = document.createElement("pre");
    const adminCodeCode = document.createElement("code");
    adminCodeCode.textContent = adminCode;
    adminCodePre.appendChild(adminCodeCode);

    adminCodeSection.appendChild(adminCodeHeader);
    adminCodeSection.appendChild(adminCodePre);

    const copyButton = document.createElement("button");
    copyButton.textContent = "Copy Code";
    copyButton.addEventListener("click", () => {
      const codeElements = document.querySelectorAll("code");
      const codeText = Array.from(codeElements)
        .map((element) => element.textContent)
        .join("\n");
      navigator.clipboard.writeText(codeText);
    });

    const parentElement = document.createElement("div");
    parentElement.style.whiteSpace = "pre-wrap";
    parentElement.appendChild(copyButton);
    parentElement.appendChild(modelCodeSection);
    parentElement.appendChild(serializerCodeSection);
    parentElement.appendChild(viewsCodeSection);
    parentElement.appendChild(urlsCodeSection);
    parentElement.appendChild(adminCodeSection);

    const container = document.getElementById("code-display");
    container.innerHTML = "";
    container.appendChild(parentElement);
  };

  const handleKeys = (event, key) => {
    const isChecked = event.target.checked;
    setCheckedKeys((prevState) => {
      if (isChecked) {
        return [...prevState, key];
      } else {
        return prevState.filter((checkedKey) => checkedKey !== key);
      }
    });
  };

  return (
    <div className={classes.root}>
      <BaseForm
        title="API Endpoint Generator"
        handleSubmit={handleSubmit}
        maxWidth={1000}
        limitPadding
        background="#F5F5F5"
      >
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <BaseCarousel currentIndex={currentFieldIndex}>
              {fields.map((field, index) => (
                <FieldForm
                  field={field}
                  fields={fields}
                  index={index}
                  handleChange={handleChange}
                  handleRemoveField={handleRemoveField}
                  checkedKeys={checkedKeys}
                  handleKeys={handleKeys}
                />
              ))}
            </BaseCarousel>
            <FieldActions
              handleAddField={handleAddField}
              modelName={modelName}
              setModelName={setModelName}
              verboseName={verboseName}
              setVerboseName={setVerboseName}
            />
          </Grid>
        </Grid>
      </BaseForm>
    </div>
  );
};

export default EndPointGenerator;
