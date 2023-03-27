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
  Tooltip,
} from "@material-ui/core";
import StyledButton from "../../../Elements/Buttons/StyledButton";
import { Link } from "react-router-dom";
import Icon from "../../../Elements/Icon/Icon";
import LinkSharpIcon from "@mui/icons-material/LinkSharp";
import AdminButton from "../../../Elements/Buttons/AdminButton";

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

  buttonCell: {
    textAlign: "flex-start",
    padding: theme.spacing(1),
  },
  icon: {
    fontSize: "2.5rem",
  },
  tooltip: {
    backgroundColor: theme.palette.text.secondary,
    color: "#ffffff",
    fontSize: "12px",
  },
}));

const ComparisonTable = ({
  tableData = null,
  heading = "Compare Our Services",
  currentId = null,
  links = true,
  editMode,
}) => {
  const classes = useStyles();

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item style={{ width: "100%", maxWidth: 1000 }}>
        <TableContainer component={Paper} className={classes.tableContainer}>
          {editMode && (
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "flex-end",
              }}
            >
              <AdminButton link="servicetable" tooltipText="Tables" />
            </div>
          )}

          <Typography variant="h3" align="center" gutterBottom>
            {heading}
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell className={classes.headerCell}>
                  <Icon icon={"TableChartIcon"} className={classes.icon} />
                  <Typography variant="h6" className={classes.competitorName}>
                    Features
                  </Typography>
                </TableCell>
                <TableCell
                  key={tableData.labels.service_tier1}
                  className={classes.headerCell}
                >
                  <Icon
                    icon={tableData.labels.tier1_icon}
                    className={classes.icon}
                  />
                  <Typography variant="h6" className={classes.competitorName}>
                    {tableData.labels.service_tier1}
                  </Typography>
                </TableCell>
                <TableCell
                  key={tableData.labels.service_tier2}
                  className={classes.headerCell}
                >
                  <Icon
                    icon={tableData.labels.tier2_icon}
                    className={classes.icon}
                  />
                  <Typography variant="h6" className={classes.competitorName}>
                    {tableData.labels.service_tier2}
                  </Typography>
                </TableCell>
                <TableCell
                  key={tableData.labels.service_tier3}
                  className={classes.headerCell}
                >
                  <Icon
                    icon={tableData.labels.tier3_icon}
                    className={classes.icon}
                  />
                  <Typography variant="h6" className={classes.competitorName}>
                    {tableData.labels.service_tier3}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.rows.map((row, index) => (
                <>
                  <TableRow key={row.feature}>
                    <TableCell
                      component="th"
                      scope="row"
                      className={classes.featureCell}
                    >
                      {row.detail}
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
                </>
              ))}

              {links && (
                <>
                  <TableCell className={classes.buttonCell}></TableCell>
                  <TableCell className={classes.buttonCell}>
                    <Tooltip
                      title="Personal Tier Page"
                      placement="bottom"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <Link to={`/services/2/`}>
                        <StyledButton
                          size="small"
                          buttonText="Learn More"
                          disabled={parseInt(currentId) === 2 ? true : false}
                          startIcon={<LinkSharpIcon />}
                        />
                      </Link>
                    </Tooltip>
                  </TableCell>
                  <TableCell className={classes.buttonCell}>
                    <Tooltip
                      title="Professional Tier Page"
                      placement="bottom"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <Link to={`/services/3/`}>
                        <StyledButton
                          size="small"
                          buttonText="Learn More"
                          disabled={parseInt(currentId) === 3 ? true : false}
                          startIcon={<LinkSharpIcon />}
                        />
                      </Link>
                    </Tooltip>
                  </TableCell>

                  <TableCell className={classes.buttonCell}>
                    <Tooltip
                      title="Enterprise Tier Page"
                      placement="bottom"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <Link to={`/services/4/`}>
                        <StyledButton
                          size="small"
                          buttonText="Learn More"
                          disabled={parseInt(currentId) === 4 ? true : false}
                          startIcon={<LinkSharpIcon />}
                        />
                      </Link>
                    </Tooltip>
                  </TableCell>
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};
export default ComparisonTable;
