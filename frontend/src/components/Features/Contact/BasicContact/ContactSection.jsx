import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Paper,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  Input,
  TextField,
  MenuItem,
} from "@material-ui/core";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaInstagram,
  FaPhoneSquare,
  FaEnvelopeSquare,
  FaMapMarkerAlt,
} from "react-icons/fa";
import ContactForm from "../../../Forms/Contact/ContactForm";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    fontFamily: "Poppins",
    maxWidth: "100%",
  },
  paperContainer: {
    padding: theme.spacing(2),
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1C1C1C",
    minHeight: 510,
    maxWidth: "75%",
    minWidth: "75%",
  },
  gridContainer: {
    padding: theme.spacing(2),
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginRight: theme.spacing(1),
    color: "#ffffff",
    "&:hover": {
      color: "#0077C9",
    },
  },
  typography: {
    color: "#ffffff",
    marginBottom: theme.spacing(2),
    fontFamily: "Poppins",
  },
  typography2: {
    color: "#ffffff",
    marginTop: theme.spacing(1),
    fontFamily: "Poppins",
  },
  typography3: {
    color: "#ffffff",
    fontFamily: "Poppins",
  },
  formControl: {
    fontFamily: "Poppins",
    margin: theme.spacing(1),
    minWidth: "90%",
  },
  textField: {
    fontFamily: "Poppins",
    margin: theme.spacing(1),
    width: "90%",
  },
  socialIcons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  socialIcon: {
    color: "#ffffff",
    margin: theme.spacing(1),
    "&:hover": {
      color: "#0077C9",
    },
  },
  contactSection: {},
  submitButton: {
    maxWidth: "80%",
    minWidth: "25%",
    marginTop: theme.spacing(2),
    backgroundColor: "#0077C9",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#0059b3",
    },
  },
  businessHoursContainer: {
    fontFamily: "Poppins",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(2),
  },
  businessHoursRow: {
    fontFamily: "Poppins",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: theme.spacing(1),
  },
  closedText: {
    fontFamily: "Poppins",
    color: "#ff0000",
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
  },
  tester: {
    fontFamily: "Poppins",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 40,
  },
  select: {
    color: "white",
    backgroundColor: "#0077C9",
  },
}));

const options = [
  { label: "Website Development", value: "Website Development" },
  { label: "Mobile App Development", value: "Mobile App Development" },
  { label: "Digital Marketing", value: "Digital Marketing" },
  { label: "General Inquiry", value: "General Inquiry" },
  { label: "Support", value: "Support" },
  { label: "Partnership", value: "Partnership" },
  { label: "Other", value: "Other" },
];

export default function BasicContact() {
  const classes = useStyles();
  const [inquiryType, setInquiryType] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handleChange = (event) => {
    setInquiryType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(
      "Form submitted with inquiry type:",
      inquiryType,
      " name:",
      name,
      " email:",
      email,
      " message:",
      message
    );
    setInquiryType("");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={0} className={classes.gridContainer}>
        <Grid item sm={12} md={6} className={classes.tester}>
          <Paper elevation={6} className={classes.paperContainer}>
            <Grid item xs={12}>
              <Typography variant="h5" className={classes.typography}>
                Contact Information
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <div className={classes.contactSection}>
                <div>
                  <FaMapMarkerAlt className={classes.icon} />
                  <Typography variant="body1" className={classes.typography}>
                    1234 Example St, City, State
                  </Typography>
                </div>
                <div>
                  <FaPhoneSquare className={classes.icon} />
                  <Typography variant="body1" className={classes.typography}>
                    555-555-5555
                  </Typography>
                </div>
                <div>
                  <FaEnvelopeSquare className={classes.icon} />
                  <Typography variant="body1" className={classes.typography}>
                    example@email.com
                  </Typography>
                </div>
              </div>
              <div className={classes.socialIcons}>
                <FaFacebookSquare className={classes.socialIcon} />
                <FaTwitterSquare className={classes.socialIcon} />
                <FaInstagram className={classes.socialIcon} />
              </div>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" className={classes.typography2}>
                Business Hours
              </Typography>
              <div className={classes.businessHoursContainer}>
                <div className={classes.businessHoursRow}>
                  <Typography variant="body1" className={classes.typography}>
                    Monday - Friday
                  </Typography>
                  <Typography variant="body1" className={classes.typography}>
                    8:00am - 5:00pm
                  </Typography>
                </div>
                <div className={classes.businessHoursRow}>
                  <Typography variant="body1" className={classes.typography}>
                    Saturday - Sunday
                  </Typography>
                  <Typography variant="body1" className={classes.closedText}>
                    Closed
                  </Typography>
                </div>
              </div>
            </Grid>
          </Paper>
        </Grid>
        <Grid item sm={12} md={6} className={classes.tester}>
          <Paper elevation={6} className={classes.paperContainer}>
            <h2 style={{ color: "white" }}>Contact Us</h2>
            <Grid item xs={12} className={classes.tester}>
              <ContactForm selectOptions={options} />
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
