import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CardHeader,
  IconButton,
  Collapse,
  makeStyles,
} from "@material-ui/core";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import BarChartIcon from "@mui/icons-material/BarChart";

const useStyles = makeStyles((theme) => ({
  section: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    margin: 24,
    background: "#F5F5F5",
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(0, 0, 3, 0),
      madWidth: 200,
    },
  },
  cardHeader: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    padding: theme.spacing(3, 2, 2, 2),
    alignItems: "flex-start",
  },
  link: {
    color: "#1976d2",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  activeLink: {
    color: "#007bff",
  },
  modelIcon: {
    color: theme.palette.secondary.main,
    marginRight: theme.spacing(2),
    fontSize: "2.5rem",
  },
}));

export default function Statistics(props) {
  const classes = useStyles();
  const {
    numCustomers,
    avgSatisfaction,
    numProjectsCompleted,
    teamSize,
    statsOpen,
    setStatsOpen,
  } = props;

  const handleExpandClick = () => {
    setStatsOpen(!statsOpen);
  };

  const data = [
    { name: "Customers", value: numCustomers },
    { name: "Satisfaction", value: avgSatisfaction },
    { name: "Projects", value: numProjectsCompleted },
    { name: "Team Size", value: teamSize },
  ];

  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.cardHeader}
        action={
          <IconButton onClick={handleExpandClick} color="secondary">
            {statsOpen ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        }
        title={
          <div style={{ display: "flex", alignItems: "center" }}>
            <BarChartIcon
              className={classes.modelIcon}
              style={{ fontSize: "2rem" }}
            />
            <Typography variant="h3">Service Stats</Typography>
          </div>
        }
      />
      <Collapse in={statsOpen}>
        <CardContent>
          <Grid container justifyContent="center">
            <Grid
              container
              spacing={2}
              style={{ maxWidth: 1200, padding: 20, color: "black" }}
            >
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Customers
                    </Typography>
                    <Typography variant="h4" align="center">
                      {numCustomers}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" href="#testimonials">
                      See what our customers say
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Average Satisfaction
                    </Typography>
                    <Typography variant="h4" align="center">
                      {avgSatisfaction}/10
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" href="#testimonials">
                      See what our customers say
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Projects Completed
                    </Typography>
                    <Typography variant="h4" align="center">
                      {numProjectsCompleted}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" href="#case-studies">
                      See our case studies
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Team Size
                    </Typography>
                    <Typography variant="h4" align="center">
                      {teamSize}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" href="/about">
                      Meet our team
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} sm={10} md={8} style={{ margin: "0 auto" }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Overall Performance
                    </Typography>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
    </Card>
  );
}
