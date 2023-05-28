import React, { useState } from "react";
import {
  Grid,
  Typography,
  Divider,
  FormControl,
  TextField,
  Button,
  IconButton,
} from "@material-ui/core";
import "./Footer.css";

import TokenSharpIcon from "@mui/icons-material/TokenSharp";
import { Link } from "react-router-dom";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import CheckIcon from "@material-ui/icons/Check";
import Flexer from "../../../Elements/Layout/Container/Flexer";
import Tooltip from "../../Base/Tooltip/Tooltip";
import Text from "../../../Elements/Layout/Text/Text";

const Footer = ({}) => {
  const [state, setState] = useState("initial");

  return (
    <div className="footer-root">
      <div className="footer-container">
        <Flexer mb={24} j="c">
          <Tooltip text="View Home Page" position="right">
            <Link href="#" className="footer-link" style={{ display: "flex" }}>
              <TokenSharpIcon
                className="logo-icon"
                // style={{ fontSize: "1.6rem" }}
              />
              <Text c="light" t="h4" className="footer-app-title">
                EDGELORDS
              </Text>
            </Link>
          </Tooltip>
        </Flexer>
        <Flexer>
          {/* <Flexer w={"33%"}>
            <FormControl className={classes.formControl}>
              <TextField
                className={classes.input}
                autoComplete="email"
                margin="dense"
                name="email"
                variant="outlined"
                notchedOutline
                placeholder="Your Email"
                required
                fullWidth
                id="emailaddress"
                label="Email Address"
                value={values.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  className={classes.button}
                  classes={{ startIcon: classes.startIcon }}
                  disabled={state !== "initial"}
                  type={state === "success" ? "button" : "submit"}
                  startIcon={<NewspaperIcon style={{ marginRight: 8 }} />}
                  endIcon={
                    state === "success" ? (
                      <CheckIcon style={{ marginRight: 8 }} />
                    ) : null
                  }
                >
                  {state === "success" ? "Subscribed" : "Subscribe"}
                </Button>
              </div>
            </FormControl>
          </Flexer> */}
          {/* <Grid item xs={12} sm={12} md={4}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {links.map((link) => (
                <div>
                  <Typography>
                    <Tooltip
                      title={`View ${link.name} Page`}
                      placement="right"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <Link
                        key={link.name}
                        to={link.href}
                        className={classes.link}
                      >
                        {link.name}
                      </Link>
                    </Tooltip>
                  </Typography>
                </div>
              ))}
            </div>
          </Grid> */}

          {/* <Grid item xs={12} sm={12} md={4}>
            <Typography variant="h6" className={classes.title}>
              Connect with Us
            </Typography>
            {socialData && (
              <div
                style={{
                  maxWidth: "100%",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                {socialPlatforms.map((platform) => {
                  if (socialData[platform.name]) {
                    return (
                      <Tooltip
                        title={`@${socialData[platform.name]}`}
                        placement="bottom"
                        classes={{ tooltip: classes.tooltip }}
                      >
                        <IconButton
                          size="small"
                          key={platform.name}
                          className={classes.socialIcons}
                          aria-label={platform.name}
                          href={`https://www.${platform.name}.com/${
                            socialData[platform.name]
                          }`}
                        >
                          <platform.icon className={classes.iconButton} />
                        </IconButton>
                      </Tooltip>
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
            )}
          </Grid> */}
        </Flexer>
        <Divider />
        <Typography variant="body2">
          © 2023 EDGELORDS. All rights reserved.
        </Typography>
      </div>
    </div>
  );
};

export default Footer;
