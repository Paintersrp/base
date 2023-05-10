import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { elementSetExampleStyles } from "../examples/styles/exampleStyles";
import Flexer from "../../../Elements/Layout/Container/Flexer";

function TextSkeleton({
  contentObject = null,
  subType = "Standard",
  elementType,
}) {
  const classes = elementSetExampleStyles();

  return (
    <div className={classes.root}>
      <Card>
        <CardContent>
          {contentObject && elementType === "Text" ? (
            <Flexer a="c" fd="column" mb={12}>
              <Typography variant="h4" className={classes.header}>
                {contentObject.header_data.title}
              </Typography>
              <Typography variant="h6" className={classes.subheader}>
                {contentObject.header_data.subtitle}
              </Typography>
              <Typography variant="body2" className={classes.tagline}>
                {contentObject.header_data.tagline}
              </Typography>
            </Flexer>
          ) : (
            <Flexer a="c" fd="column" mb={12}>
              <Skeleton variant="text" width="70%" height={40} />
              <Skeleton variant="text" width="50%" height={24} />
            </Flexer>
          )}
          <div className={classes.content}>
            {contentObject && elementType === "Text" ? (
              <Typography
                variant="body1"
                dangerouslySetInnerHTML={{ __html: contentObject.text }}
              />
            ) : (
              <React.Fragment>
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="70%" />
              </React.Fragment>
            )}

            {subType === "Dense" && (
              <React.Fragment>
                <ul>
                  <li>
                    <Skeleton variant="text" width="25%" />
                  </li>
                  <li>
                    <Skeleton variant="text" width="35%" />
                  </li>
                  <li>
                    <Skeleton variant="text" width="30%" />
                  </li>
                </ul>
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="40%" />
              </React.Fragment>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default TextSkeleton;
