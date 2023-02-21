import {
  Grid,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardHeader,
  Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { deepOrange, lightBlue } from "@material-ui/core/colors";
import { Person, InsertComment } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  repliesContainer: {
    marginTop: theme.spacing(2),
  },
  replyCard: {
    marginBottom: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
  },
  replyCardHeader: {
    padding: theme.spacing(1, 2),
  },
  replyCardContent: {
    padding: theme.spacing(1, 2),
    "&:last-child": {
      paddingBottom: theme.spacing(1),
    },
  },
  replyAuthor: {
    display: "flex",
    alignItems: "center",
  },
  replyAuthorAvatar: {
    backgroundColor: deepOrange[500],
    color: "white",
    marginRight: theme.spacing(1),
  },
  replyAuthorName: {
    color: deepOrange[700],
    fontWeight: "bold",
  },
  replyContent: {
    whiteSpace: "pre-wrap",
    marginTop: theme.spacing(1),
  },
  replyForm: {
    marginTop: theme.spacing(2),
  },
  replyFormActions: {
    marginTop: theme.spacing(1),
    display: "flex",
    justifyContent: "flex-end",
  },
  submitBtn: {
    backgroundColor: lightBlue[700],
    color: "white",
    "&:hover": {
      backgroundColor: lightBlue[800],
    },
  },
}));

export default function TicketReplies({ replies, onReplySubmit }) {
  const classes = useStyles();
  const [formReply, setFormReply] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onReplySubmit(formReply);
    setFormReply("");
  };

  return (
    <div className={classes.repliesContainer}>
      <Typography variant="h6" gutterBottom>
        Replies
      </Typography>
      {replies.map((reply) => (
        <Card key={reply.id} className={classes.replyCard}>
          <CardHeader
            avatar={
              <Avatar className={classes.replyAuthorAvatar}>
                <Person />
              </Avatar>
            }
            title={
              <div className={classes.replyAuthor}>
                <Typography
                  variant="subtitle2"
                  className={classes.replyAuthorName}
                >
                  {reply.author}
                </Typography>
              </div>
            }
            subheader={reply.date}
            className={classes.replyCardHeader}
          />
          <CardContent className={classes.replyCardContent}>
            <Typography variant="body2" className={classes.replyContent}>
              {reply.content}
            </Typography>
          </CardContent>
        </Card>
      ))}
      <form className={classes.replyForm} onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              label="Leave a reply"
              value={formReply}
              onChange={(e) => setFormReply(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} className={classes.replyFormActions}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              className={classes.submitBtn}
              startIcon={<InsertComment />}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
