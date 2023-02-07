import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { useMediaQuery } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    width: "100%",
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "100%",
  },
  link: {
    margin: theme.spacing(1),
    color: theme.palette.primary.contrastText,
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
  grid: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  typography: {
    textAlign: "center",
    margin: theme.spacing(2, 0),
  },
  formControl: {
    margin: theme.spacing(1, 0),
    color: "white",
  },
  input: {
    margin: theme.spacing(1, 0),
    color: "white",
  },
  button: {
    margin: theme.spacing(1, 0),
    width: "50%",
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  icon: {
    color: theme.palette.primary.contrastText,
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
  gridItem: {
    justifyContent: "center",
    alignItems: "center",
  },
  gridForm: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  gridSocial: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
  },
}));

const links = [
  { name: "About", href: "#about" },
  {
    name: "Team",
    href: "#team",
  },
  {
    name: "Careers",
    href: "#careers",
  },
  {
    name: "Help",
    href: "#help",
  },
  {
    name: "Privacy",
    href: "#privacy",
  },
  {
    name: "Terms",
    href: "#terms",
  },
];

export default function ComplexFooter() {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <Container className={classes.container} maxWidth={false}>
        <Grid container spacing={0} className={classes.grid}>
          <Grid item xs={12} sm={12} md={3} className={classes.gridForm}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="newsletter-email" style={{ color: "white" }}>
                Subscribe to our newsletter
              </InputLabel>
              <Input
                id="newsletter-email"
                className={classes.input}
                type="email"
                placeholder="Enter your email"
              />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button className={classes.button}>Subscribe</Button>
              </div>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6} className={classes.gridItem}>
            <Typography variant="h6" className={classes.typography}>
              EDGELORDS
            </Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              {links.map((link) => (
                <Link key={link.name} href={link.href} className={classes.link}>
                  {link.name}
                </Link>
              ))}
            </div>
            <Typography variant={"subtitle1"} className={classes.typography}>
              Copyright © {new Date().getFullYear()} Your Company. All rights
              reserved.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12} md={3} className={classes.gridSocial}>
            <Typography variant="h6" className={classes.typography}>
              Follow us
            </Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <IconButton href="#" className={classes.icon}>
                <FaFacebook />
              </IconButton>
              <IconButton href="#" className={classes.icon}>
                <FaTwitter />
              </IconButton>
              <IconButton href="#" className={classes.icon}>
                <FaInstagram />
              </IconButton>
            </div>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}
