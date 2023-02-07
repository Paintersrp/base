import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import "./InformationSection.css";
import CoreValues from "./CoreValues";
import ContentBlock from "../../../Elements/TextBlocks/ContentBlock";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    maxWidth: "1400px",
    minHeight: "700px",
    backgroundColor: "#1C1C1C",
  },
  heading: {
    fontWeight: 800,
    color: "white",
    textAlign: "center",
    marginBottom: 15,
    fontSize: "2.5rem",
  },
}));

export default function CompanyInfo() {
  const classes = useStyles();

  return (
    <div className="landing-container-about">
      <Box display="flex" justifyContent="center">
        <Card
          elevation={6}
          className={classes.root}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CardContent>
            <Typography variant="h1" className={classes.heading}>
              EDGELORDS
            </Typography>
            <ContentBlock
              title="Company Mission"
              body="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil
              in, dolore facere iusto veritatis laudantium cupiditate temporibus
              saepe culpa incidunt voluptate. Voluptates velit autem
              exercitationem aliquid animi est ex esse consequuntur magnam neque
              dolore quod necessitatibus, porro ipsam qui id tempore voluptatum
              laborum error nobis consectetur. Molestias unde illum illo facere
              cupiditate error. Ab, reprehenderit at. Officiis repellendus
              repellat provident temporibus laborum veritatis enim obcaecati,
              quas nemo consequatur repudiandae vitae illo reiciendis
              consequuntur eligendi culpa quod sint atque, architecto
              reprehenderit, ut error ipsa impedit qui. Ex officiis maxime id
              vel, pariatur eligendi saepe blanditiis, necessitatibus rerum
              repudiandae commodi, illum odio?"
            />

            <CoreValues />
            <ContentBlock
              title="Company History"
              body="Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Explicabo libero, necessitatibus laudantium iusto doloribus,
              veritatis neque esse voluptate exercitationem, ullam quaerat. Unde
              deleniti libero possimus totam quisquam ipsum perferendis
              laboriosam sit, doloribus itaque doloremque voluptate magnam cum,
              eum incidunt placeat veniam minima asperiores? Ea reprehenderit
              officia explicabo quas voluptatibus, inventore quasi blanditiis
              quos, neque perferendis perspiciatis veniam ipsa nesciunt earum!"
            />
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}
