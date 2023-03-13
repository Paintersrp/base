import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  makeStyles,
} from "@material-ui/core";
import { FaMedium, FaWix, FaWordpress } from "react-icons/fa";
import StyledButton from "../../../Elements/Buttons/StyledButton";
import { Link } from "react-router-dom";
import axiosInstance from "../../../../lib/Axios/axiosInstance";
import { useEffect, useState } from "react";
import Icon from "../../../Elements/Icon/Icon";
import LinkSharpIcon from "@mui/icons-material/LinkSharp";
import DatasetSharpIcon from "@mui/icons-material/DatasetSharp";
import TableChartIcon from "@mui/icons-material/TableChart";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    marginTop: theme.spacing(3),
    backgroundColor: theme.palette.background.light,
    padding: theme.spacing(3),
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[2],
    maxWidth: 1400,
    overflow: "auto",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    "-ms-overflow-style": "none",
  },
  headerCell: {
    backgroundColor: theme.palette.background.light,
    color: theme.palette.text.dark,
    fontWeight: "bold",
    fontSize: 20,
    alignItem: "top",
    [theme.breakpoints.down("xs")]: {
      fontSize: 16,
    },
  },
  featureCell: {
    backgroundColor: theme.palette.background.light,
    fontWeight: "bold",
    fontSize: 16,
    [theme.breakpoints.down("xs")]: {
      fontSize: 14,
    },
  },
  contentCell: {
    fontSize: 14,
    backgroundColor: theme.palette.background.light,
    [theme.breakpoints.down("xs")]: {
      fontSize: 13,
    },
  },
  competitorName: {
    fontWeight: "bold",
  },
  logo: {
    width: 100,
    height: "auto",
  },
  buttonCell: {
    textAlign: "flex-start",
    padding: theme.spacing(1),
  },
  icon: {
    fontSize: "2.5rem",
  },
  featureIcon: {
    width: 40,
    height: 40,
  },
}));

const competitorLabels = [
  { name: "WordPress", icon: <FaWordpress fontSize="2.5rem" /> },
  { name: "Medium", icon: <FaMedium fontSize="2.5rem" /> },
  { name: "Wix", icon: <FaWix fontSize="2.5rem" /> },
];

const competitorData = [
  {
    feature: "Monthly Cost",
    tier1_value: "Basic hosting starts at $1.99",
    tier2_value: "Premium Plans starts at $11/month",
    tier3_value: "Premium Plans starts at $11/month",
  },
  {
    feature: "Design",
    tier1_value: "Built with Themes and Plugins",
    tier2_value: "Built with Templates",
    tier3_value: "Built with Templates",
  },
  {
    feature: "Hosting",
    tier1_value: "Plans available",
    tier2_value: "Plans available",
    tier3_value: "Plans available",
  },
  {
    feature: "Custom Built Plugins",
    tier1_value: "No",
    tier2_value: "No",
    tier3_value: "No",
  },
  {
    feature: "Plugins",
    tier1_value: "Many available, priced per",
    tier2_value: "Many available, priced per",
    tier3_value: "Many available, priced per",
  },
  {
    feature: "Blogging",
    tier1_value: "Supported",
    tier2_value: "Supported",
    tier3_value: "Supported",
  },
  {
    feature: "eCommmerce",
    tier1_value: "Plans available",
    tier2_value: "Plans available",
    tier3_value: "Plans available",
  },
  {
    feature: "SEO",
    tier1_value: "Plugin Managed",
    tier2_value: "Plugin Managed",
    tier3_value: "Plugin Managed",
  },

  {
    feature: "Support",
    tier1_value: "Community Forums",
    tier2_value: "24/7 Support Team",
    tier3_value: "24/7 Support Team",
  },
  {
    feature: "Security",
    tier1_value: "Implement your own",
    tier2_value: "Built In",
    tier3_value: "Built In",
  },
];

const ComparisonTable = ({
  tableData = null,
  heading = "Compare Our Services",
  type = "service",
  currentId = null,
}) => {
  const classes = useStyles();
  const [data, setData] = useState({});
  const [labels, setLabels] = useState({});
  const [competitionLabels, setCompetitionLabels] = useState(competitorLabels);
  const [competitionData, setCompetitionData] = useState(competitorData);

  useEffect(() => {
    if (type === "competition") {
      setLabels(competitorLabels);
      setData(competitorData);
    }
  }, []);

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item style={{ width: "100%", maxWidth: 1000 }}>
        {data && labels && (
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Typography variant="h3" align="center" gutterBottom>
              {heading}
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.headerCell}>
                    <Icon icon={"TableChartIcon"} className={classes.icon} />
                    <Typography variant="h6" className={classes.competitorName}>
                      Features
                    </Typography>
                  </TableCell>
                  {type === "competition" &&
                    competitionLabels.map((competitor) => (
                      <TableCell
                        key={competitor.name}
                        className={classes.headerCell}
                      >
                        {competitor.icon ? <>{competitor.icon}</> : null}
                        <Typography
                          variant="h6"
                          className={classes.competitorName}
                        >
                          {competitor.name}
                        </Typography>
                      </TableCell>
                    ))}
                  {type === "service" && (
                    <>
                      <TableCell
                        key={tableData.compare_labels.service_tier1}
                        className={classes.headerCell}
                      >
                        <Icon
                          icon={tableData.compare_labels.tier1_icon}
                          className={classes.icon}
                        />
                        <Typography
                          variant="h6"
                          className={classes.competitorName}
                        >
                          {tableData.compare_labels.service_tier1}
                        </Typography>
                      </TableCell>
                      <TableCell
                        key={tableData.compare_labels.service_tier2}
                        className={classes.headerCell}
                      >
                        <Icon
                          icon={tableData.compare_labels.tier2_icon}
                          className={classes.icon}
                        />
                        <Typography
                          variant="h6"
                          className={classes.competitorName}
                        >
                          {tableData.compare_labels.service_tier2}
                        </Typography>
                      </TableCell>
                      <TableCell
                        key={tableData.compare_labels.service_tier3}
                        className={classes.headerCell}
                      >
                        <Icon
                          icon={tableData.compare_labels.tier3_icon}
                          className={classes.icon}
                        />
                        <Typography
                          variant="h6"
                          className={classes.competitorName}
                        >
                          {tableData.compare_labels.service_tier3}
                        </Typography>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {type === "service" && (
                  <>
                    {tableData.compare_rows.map((row, index) => (
                      <TableRow key={row.feature}>
                        <TableCell
                          component="th"
                          scope="row"
                          className={classes.featureCell}
                        >
                          {row.feature}
                        </TableCell>
                        <TableCell className={classes.contentCell}>
                          {row.tier1_value}
                        </TableCell>
                        <TableCell className={classes.contentCell}>
                          {row.tier2_value}
                        </TableCell>
                        <TableCell className={classes.contentCell}>
                          {row.tier3_value}
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                )}
                {type === "competition" && (
                  <>
                    {competitionData.map((row, index) => (
                      <TableRow key={row.feature}>
                        <TableCell
                          component="th"
                          scope="row"
                          className={classes.featureCell}
                        >
                          {row.feature}
                        </TableCell>
                        <TableCell className={classes.contentCell}>
                          {row.tier1_value}
                        </TableCell>
                        <TableCell className={classes.contentCell}>
                          {row.tier2_value}
                        </TableCell>
                        <TableCell className={classes.contentCell}>
                          {row.tier3_value}
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                )}

                <TableCell className={classes.buttonCell}></TableCell>
                <TableCell className={classes.buttonCell}>
                  <Link to={`/services/2/`}>
                    <StyledButton
                      size="small"
                      buttonText="Learn More"
                      disabled={parseInt(currentId) === 2 ? true : false}
                      startIcon={<LinkSharpIcon />}
                    />
                  </Link>
                </TableCell>
                <TableCell className={classes.buttonCell}>
                  <Link to={`/services/3/`}>
                    <StyledButton
                      size="small"
                      buttonText="Learn More"
                      disabled={parseInt(currentId) === 3 ? true : false}
                      startIcon={<LinkSharpIcon />}
                    />
                  </Link>
                </TableCell>
                <TableCell className={classes.buttonCell}>
                  <Link to={`/services/4/`}>
                    <StyledButton
                      size="small"
                      buttonText="Learn More"
                      disabled={parseInt(currentId) === 4 ? true : false}
                      startIcon={<LinkSharpIcon />}
                    />
                  </Link>
                </TableCell>
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
    </Grid>
  );
};
export default ComparisonTable;
