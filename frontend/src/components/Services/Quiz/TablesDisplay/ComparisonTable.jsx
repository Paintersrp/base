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
import { GiUpgrade } from "react-icons/gi";
import { CgWebsite } from "react-icons/cg";
import { IoBusinessSharp } from "react-icons/io5";
import { FaMedium, FaWix, FaWordpress } from "react-icons/fa";

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
}));

const serviceCompareLabels = [
  { name: "Personal", icon: <CgWebsite fontSize="2.5rem" /> },
  { name: "Premium", icon: <GiUpgrade fontSize="2.5rem" /> },
  { name: "Business", icon: <IoBusinessSharp fontSize="2.5rem" /> },
];

const serviceCompareData = [
  {
    feature: "Monthly Cost",
    competitor1: "Starts at $11.99/month",
    competitor2: "Starts at $19.99/month",
    competitor3: "Starts at $49.99/month",
  },
  {
    feature: "Design",
    competitor1: "Templates/Plugins",
    competitor2: "Templates/Plugins",
    competitor3: "Custom Designed",
  },
  {
    feature: "Hosting",
    competitor1: "Self-managed hosting",
    competitor2: "Support-managed hosting",
    competitor3: "Support-managed hosting",
    // competitor3: "Value 3",
  },
  {
    feature: "Custom Built Plugins",
    competitor1: "Not included",
    competitor2: "Not included",
    competitor3: "Included, 2/month",
    // competitor3: "Value 6",
  },
  {
    feature: "Blogging",
    competitor1: "Supported",
    competitor2: "Supported",
    competitor3: "Supported",
    // competitor3: "Value 9",
  },
  {
    feature: "eCommmerce",
    competitor1: "Supported",
    competitor2: "Supported",
    competitor3: "Supported",
    // competitor3: "Value 9",
  },
  {
    feature: "SEO",
    competitor1: "Self Managed with Plugins",
    competitor2: "Self Managed with Plugin",
    competitor3: "SEO Optimization Provided",
    // competitor3: "Value 9",
  },

  {
    feature: "Support",
    competitor1: "24/7 Support",
    competitor2: "24/7 Support",
    competitor3: "24/7 Support",
    // competitor3: "Value 9",
  },
  {
    feature: "Security",
    competitor1: "Built In",
    competitor2: "Built In",
    competitor3: "Built In",
    // competitor3: "Value 9",
  },
];

const competitorLabels = [
  { name: "WordPress", icon: <FaWordpress fontSize="2.5rem" /> },
  { name: "Medium", icon: <FaMedium fontSize="2.5rem" /> },
  { name: "Wix", icon: <FaWix fontSize="2.5rem" /> },
];

const competitorData = [
  {
    feature: "Monthly Cost",
    competitor1: "Basic hosting starts at $1.99",
    competitor2: "Premium Plans starts at $11/month",
    competitor3: "Premium Plans starts at $11/month",
    // competitor3: "Value 3",
  },
  {
    feature: "Design",
    competitor1: "Built with Themes and Plugins",
    competitor2: "Built with Templates",
    competitor3: "Built with Templates",
  },
  {
    feature: "Hosting",
    competitor1: "Plans available",
    competitor2: "Plans available",
    competitor3: "Plans available",
    // competitor3: "Value 3",
  },
  {
    feature: "Custom Built Plugins",
    competitor1: "No",
    competitor2: "No",
    competitor3: "No",
    // competitor3: "Value 6",
  },
  {
    feature: "Plugins",
    competitor1: "Many available, priced per",
    competitor2: "Many available, priced per",
    competitor3: "Many available, priced per",
    // competitor3: "Value 9",
  },
  {
    feature: "Blogging",
    competitor1: "Supported",
    competitor2: "Supported",
    competitor3: "Supported",
    // competitor3: "Value 9",
  },
  {
    feature: "eCommmerce",
    competitor1: "Plans available",
    competitor2: "Plans available",
    competitor3: "Plans available",
    // competitor3: "Value 9",
  },
  {
    feature: "SEO",
    competitor1: "Plugin Managed",
    competitor2: "Plugin Managed",
    competitor3: "Plugin Managed",
    // competitor3: "Value 9",
  },

  {
    feature: "Support",
    competitor1: "Community Forums",
    competitor2: "24/7 Support Team",
    competitor3: "24/7 Support Team",
    // competitor3: "Value 9",
  },
  {
    feature: "Security",
    competitor1: "Implement your own",
    competitor2: "Built In",
    competitor3: "Built In",
    // competitor3: "Value 9",
  },
];

const ComparisonTable = ({
  heading = "Compare Our Services",
  type = "service",
}) => {
  const classes = useStyles();
  let labels;
  let data;

  if (type === "service") {
    labels = serviceCompareLabels;
    data = serviceCompareData;
  } else if (type === "competition") {
    labels = competitorLabels;
    data = competitorData;
  }

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item style={{ width: "100%", maxWidth: 1000 }}>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Typography variant="h3" align="center" gutterBottom>
            {heading}
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.headerCell}>Features</TableCell>
                {labels.map((competitor) => (
                  <TableCell
                    key={competitor.name}
                    className={classes.headerCell}
                  >
                    {competitor.icon ? <>{competitor.icon}</> : null}
                    <Typography variant="h6" className={classes.competitorName}>
                      {competitor.name}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={row.feature}>
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.featureCell}
                  >
                    {row.feature}
                  </TableCell>
                  <TableCell className={classes.contentCell}>
                    {row.competitor1}
                  </TableCell>
                  <TableCell className={classes.contentCell}>
                    {row.competitor2}
                  </TableCell>
                  <TableCell className={classes.contentCell}>
                    {row.competitor3}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};
export default ComparisonTable;
