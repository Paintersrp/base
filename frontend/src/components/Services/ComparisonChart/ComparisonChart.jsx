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

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.background.light,
    padding: theme.spacing(3),
    borderRadius: theme.spacing(1),
    maxWidth: 1000,
  },
  headerCell: {
    backgroundColor: theme.palette.background.light,
    color: theme.palette.text.dark,
    fontWeight: "bold",
    fontSize: 20,
    alignItem: "top",
  },
  featureCell: {
    backgroundColor: theme.palette.background.light,
    fontWeight: "bold",
    fontSize: 16,
    padding: theme.spacing(1),
  },
  contentCell: {
    backgroundColor: theme.palette.background.light,
  },
  competitorName: {
    fontWeight: "bold",
  },
  logo: {
    width: 100,
    height: "auto",
  },
}));

const ComparisonChart = () => {
  const classes = useStyles();

  const data = [
    {
      feature: "Price",
      competitor1: "Value 1",
      competitor2: "Value 2",
      competitor3: "Value 3",
    },
    {
      feature: "Lick Me",
      competitor1: "Value 4",
      competitor2: "Value 5",
      competitor3: "Value 6",
    },
    {
      feature: "Hosting",
      competitor1: "Value 7",
      competitor2: "Value 8",
      competitor3: "Value 9",
    },
  ];

  const competitors = [
    { name: "WordPress", icon: <FaWordpress fontSize="3rem" /> },
    { name: "Medium", icon: <FaMedium fontSize="3rem" /> },
    { name: "Wix", icon: <FaWix fontSize="3rem" /> },
  ];

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Typography variant="h4" align="center" gutterBottom>
            Compare Our Service
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.headerCell}>Features</TableCell>
                {competitors.map((competitor) => (
                  <TableCell
                    key={competitor.name}
                    className={classes.headerCell}
                  >
                    {competitor.icon}
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
export default ComparisonChart;
