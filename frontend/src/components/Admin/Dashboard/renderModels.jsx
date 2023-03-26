import React from "react";
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  makeStyles,
  Tooltip,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { NavigateNext, Add } from "@material-ui/icons";
import Icon from "../../Elements/Icon/Icon";

export default function renderModels({ modelItem, appName, classes }) {
  console.log(modelItem);

  return modelItem
    .filter((model) => model.url !== null)
    .map((model) => {
      console.log("model: ", model);
      if (model.visibility === false) {
        return null;
      }

      return (
        <Tooltip
          title={`View ${model.verbose_name} Model`}
          placement="right"
          classes={{ tooltip: classes.tooltip }}
        >
          <Link
            to={`/admin/${model.model_name}`}
            state={{
              url: model.url,
              keys: model.keys,
              appName: appName,
              model: model,
              metadata: model.metadata,
              searchKeys: model.search_keys,
            }}
            key={model.model_name}
          >
            <ListItem
              button
              style={{ color: "black" }}
              className={classes.hoverLink}
            >
              <ListItemIcon>
                <Icon icon={model.icon} className={classes.icon} />
                {/* <NavigateNext /> */}
              </ListItemIcon>

              <ListItemText primary={model.verbose_name} />

              <Link to={`/admin/${model.model_name}/control`}>
                <ListItemIcon
                  style={{
                    color: "black",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Tooltip
                    title={`Create ${model.verbose_name} Object`}
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <IconButton className={classes.addButton} size="small">
                      <Add />
                    </IconButton>
                  </Tooltip>
                </ListItemIcon>
              </Link>
            </ListItem>
          </Link>
        </Tooltip>
      );
    });
}
