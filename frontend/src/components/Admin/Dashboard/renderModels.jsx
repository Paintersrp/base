import React from "react";
import { ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import { Link } from "react-router-dom";
import { NavigateNext } from "@material-ui/icons";

export default function renderModels({ modelItem, appName, classes }) {
  console.log("modelItem: ", modelItem);
  return modelItem
    .filter((model) => model.url !== null)
    .map((model) => (
      <Link
        to={`/admin/${model.model_name}`}
        state={{
          url: model.url,
          keys: model.keys,
          appName: appName,
          model: model,
          metadata: model.metadata,
        }}
        key={model.model_name}
      >
        <ListItem button style={{ color: "black" }}>
          <ListItemIcon style={{ color: "black" }}>
            <NavigateNext />
          </ListItemIcon>

          <ListItemText primary={model.verbose_name} />
        </ListItem>
      </Link>
    ));
}
