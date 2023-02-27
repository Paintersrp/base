import React, { useState } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import BaseForm from "../../Elements/Base/BaseForm.jsx";
import BaseCarousel from "../../Elements/Base/BaseCarousel.jsx";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    maxWidth: 1200,
    margin: "auto",
    marginTop: theme.spacing(4),
  },

  removeButton: {
    backgroundColor: theme.palette.error.main,
    color: "#fff",
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
  codeDisplay: {
    backgroundColor: theme.palette.grey[200],
    padding: theme.spacing(2),
    marginTop: theme.spacing(4),
    borderRadius: 4,
  },
  field: {
    width: "100%",
    marginBottom: theme.spacing(1.5),
    "& .MuiOutlinedInput-root": {
      fontFamily: "Roboto",
      padding: 0,
      fontSize: "0.9rem",
      fontWeight: "400",
      width: "100%",
      letterSpacing: 0.25,

      "& fieldset": {
        borderColor: "black",
      },
      "&:hover fieldset": {
        borderColor: "black",
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
    "& .MuiFormLabel-root": {
      fontFamily: "Roboto",
      color: "black",
      fontWeight: "500",
      fontSize: "0.95rem",
    },
    "& input": {
      color: "black",
    },
  },
  select: {
    width: "100%",
    background: theme.palette.text.light,
    marginBottom: theme.spacing(1),
    "& .MuiFormLabel-root": {
      color: theme.palette.text.light,
      fontWeight: "700",
      fontSize: "0.9rem",
    },
    "& fieldset": {
      borderColor: "black",
    },
    "&:hover fieldset": {
      borderColor: "black",
    },
    "&.Mui-focused fieldset": {
      borderColor: "black",
    },

    "& .MuiMenu-paper": {
      maxHeight: 40,
      overflowY: "auto",
    },
  },
  formTitle: {
    fontWeight: "bold",
    marginBottom: theme.spacing(1.5),
    textAlign: "center",
    color: theme.palette.text.dark,
  },
}));

const EndPointGenerator = () => {
  const classes = useStyles();
  const [modelName, setModelName] = useState("");
  const [verboseName, setVerboseName] = useState("");
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [fields, setFields] = useState([
    {
      name: "",
      type: "",
      max_length: "",
      xs_column_count: "",
      md_column_count: "",
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
      type: "",
      max_length: "",
      xs_column_count: "",
      md_column_count: "",
    });
    setFields(values);
  };

  const handleRemoveField = (index) => {
    const values = [...fields];
    values.splice(index, 1);
    setFields(values);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let modelCode = `from django.db import models\n\n`;
    let serializerCode = `from rest_framework import serializers\nfrom .models import ${modelName}\n\n`;
    let viewsCode = `from rest_framework import generics\nfrom .serializers import *\nfrom .models import ${modelName}\n\n`;
    let urlsCode = `from django.urls import path\nfrom .views import *\n\n`;
    let adminCode = `from django.contrib import admin\nfrom .models import ${modelName}\n\n`;

    modelCode += `class ${modelName}(models.Model):\n`;

    fields.forEach((field) => {
      const { name, type, max_length, xs_column_count, md_column_count } =
        field;
      const argMaxLength = max_length ? `max_length=${max_length},` : "";
      const argXsCount = xs_column_count
        ? `xs_column_count=${xs_column_count},`
        : "";
      const argMdCount = md_column_count
        ? `md_column_count=${md_column_count}`
        : "";

      const fieldArgs = `${argMaxLength} ${argXsCount} ${argMdCount}`;
      modelCode += `  ${name} = Custom${type}(${fieldArgs})\n`;
    });

    modelCode += `\n  class Meta: \n    verbose_name = ${verboseName} \n    verbose_name_plural = ${verboseName}s`;
    modelCode += "\n";

    let fieldKeys = "[";
    checkedKeys.forEach((key, index) => {
      console.log(key);
      if (key !== null && key !== "") {
        fieldKeys += `"${key}"`;
      }

      if (index < checkedKeys.length - 1 && key !== null && key !== "") {
        fieldKeys += ", ";
      }
    });
    fieldKeys += "]";

    console.log(fieldKeys);

    serializerCode += `class ${modelName}Serializer(serializers.ModelSerializer):\n  FIELD_KEYS = ${fieldKeys} \n\n class Meta:\n    model = ${modelName}\n    fields = '__all__'\n\n`;

    const capitalizedModelName =
      modelName.charAt(0).toUpperCase() + modelName.slice(1);

    viewsCode += `class ${capitalizedModelName}ListView(generics.ListCreateAPIView, generics.RetrieveUpdateDestroyAPIView):\n  queryset = ${modelName}.objects.all()\n  serializer_class = ${modelName}Serializer\n\n`;

    urlsCode += `urlpatterns = [\n  path('${modelName.toLowerCase()}/', ${capitalizedModelName}ListView.as_view(), name="${modelName.toLowerCase()}-list"),\n`;
    urlsCode += `  path('${modelName.toLowerCase()}/<int:pk>/', ${capitalizedModelName}ListView.as_view(), name="${modelName.toLowerCase()}-detail"),\n]\n`;

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
    console.log(event.target, key);
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
        maxWidth={800}
        limitPadding
      >
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <BaseCarousel>
              {fields.map((field, index) => (
                <BaseForm
                  title={`Field #${index + 1}`}
                  maxWidth={1200}
                  elevation={0}
                  limitPadding
                >
                  <Grid key={index} container spacing={0} alignItems="center">
                    <Grid item xs={12} md={9}>
                      <FormControl fullWidth>
                        <Select
                          className={classes.select}
                          variant="outlined"
                          margin="dense"
                          displayEmpty
                          labelId={`field-type-label-${index}`}
                          id={`field-type-${index}`}
                          value={field.type}
                          name="type"
                          onChange={(event) => handleChange(index, event)}
                          fullWidth
                          MenuProps={{
                            anchorOrigin: {
                              vertical: "bottom",
                              horizontal: "left",
                            },
                            transformOrigin: {
                              vertical: "top",
                              horizontal: "left",
                            },
                            getContentAnchorEl: null,
                            classes: {
                              paper: classes.menuPaper,
                            },
                            PaperProps: {
                              style: {
                                maxHeight: 500,
                              },
                            },
                          }}
                        >
                          <MenuItem value="">Select a type</MenuItem>
                          <MenuItem value="BooleanField">BooleanField</MenuItem>
                          <MenuItem value="CharField">CharField</MenuItem>
                          <MenuItem value="DateTimeField">
                            DateTimeField
                          </MenuItem>
                          <MenuItem value="EmailField">EmailField</MenuItem>
                          <MenuItem value="FileField">FileField</MenuItem>
                          <MenuItem value="FloatField">FloatField</MenuItem>
                          <MenuItem value="ImageField">ImageField</MenuItem>
                          <MenuItem value="IntegerField">IntegerField</MenuItem>
                          <MenuItem value="ManyToManyField">
                            ManyToManyField
                          </MenuItem>
                          <MenuItem value="TextField">TextField</MenuItem>
                          <MenuItem value="URLField">URLField</MenuItem>
                        </Select>
                        {Object.keys(field).map((key) => {
                          if (key !== "type" && key !== "value") {
                            return (
                              <Grid container key={key}>
                                <Grid item xs={12}>
                                  <TextField
                                    key={`${key}-${index}`}
                                    margin="dense"
                                    variant="outlined"
                                    id={`field-${key}-${index}`}
                                    label={`${key}`}
                                    name={key}
                                    value={fields[index][key]}
                                    onChange={(event) =>
                                      handleChange(index, event)
                                    }
                                    fullWidth
                                    className={classes.field}
                                  />
                                </Grid>
                              </Grid>
                            );
                          }
                          return null;
                        })}
                      </FormControl>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      md={3}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Grid
                        item
                        xs={12}
                        md={12}
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Button
                          onClick={() => handleRemoveField(index)}
                          className={classes.removeButton}
                        >
                          Remove
                        </Button>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={12}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "column",
                          alignItems: "center",
                          marginTop: 16,
                        }}
                      >
                        Add to Field Keys?
                        <Checkbox
                          checked={checkedKeys.includes(field.name)}
                          onChange={(event) => handleKeys(event, field.name)}
                          name={`checkbox-${field.name}`}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </BaseForm>
              ))}
            </BaseCarousel>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 24,
              }}
            >
              <Button
                onClick={handleAddField}
                variant="contained"
                color="primary"
              >
                Add Field
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="center"
            style={{
              marginTop: 16,
              flexDirection: "column",
              width: "100%",
            }}
          >
            <div
              style={{
                width: "100%",
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Grid
                item
                xs={4}
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <TextField
                  margin="dense"
                  variant="outlined"
                  id="model-name"
                  label="Model Name"
                  value={modelName}
                  onChange={(event) => setModelName(event.target.value)}
                  className={classes.field}
                />
              </Grid>
              <Grid
                item
                xs={4}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <TextField
                  margin="dense"
                  variant="outlined"
                  id="model-name"
                  label="Verbose Name"
                  value={verboseName}
                  onChange={(event) => setVerboseName(event.target.value)}
                  className={classes.field}
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid
                xs={3}
                style={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button type="submit" variant="contained" color="primary">
                  Generate Endpoint
                </Button>
              </Grid>
            </div>
          </Grid>

          <Grid item xs={12}>
            <Typography
              variant="h3"
              align="center"
              style={{ color: "black", marginTop: 16 }}
            >
              Generated Results
            </Typography>
            <div id="code-display" className={classes.codeDisplay}></div>
          </Grid>
        </Grid>
      </BaseForm>
    </div>
  );
};

export default EndPointGenerator;
