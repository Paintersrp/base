import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
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

export default function ServiceStatistics(props) {
  const { numCustomers, avgSatisfaction, numProjectsCompleted, teamSize } =
    props;

  const data = [
    { name: "Customers", value: numCustomers },
    { name: "Satisfaction", value: avgSatisfaction },
    { name: "Projects", value: numProjectsCompleted },
    { name: "Team Size", value: teamSize },
  ];

  return (
    <>
      <Typography variant="h1" style={{ marginBottom: 40 }}>
        Service Stats
      </Typography>
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
    </>
  );
}
