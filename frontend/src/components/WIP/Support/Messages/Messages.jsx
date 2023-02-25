import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Checkbox,
  IconButton,
  CircularProgress,
  Dialog,
  DialogTitle,
  Typography,
  Button,
  DialogContent,
  DialogActions,
  Grid,
} from "@material-ui/core";
import {
  Archive as ArchiveIcon,
  Reply as ReplyIcon,
  ArrowDropDown,
  ArrowDropUp,
} from "@material-ui/icons";
import SendIcon from "@mui/icons-material/Send";
import UnarchiveOutlinedIcon from "@material-ui/icons/UnarchiveOutlined";

import axiosInstance from "../../../../lib/Axios/axiosInstance";
import BaseContent from "../../../Elements/Base/BaseContent.jsx";
import MessageDialog from "./MessageDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  table: {
    minWidth: 650,
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50vh",
  },
}));

const Messages = () => {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [orderBy, setOrderBy] = useState("created_at");
  const [order, setOrder] = useState("desc");
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    setLoading(true);
    axiosInstance.get("/messages/").then((response) => {
      setMessages(response.data);
      setLoading(false);
    });
  }, []);

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleToggleProperty = async (messageId, property) => {
    const messageIndex = messages.findIndex(
      (message) => message.id === messageId
    );
    if (messageIndex !== -1) {
      const newMessages = [...messages];
      newMessages[messageIndex] = {
        ...newMessages[messageIndex],
        [getPropertyValue(property)]:
          !newMessages[messageIndex][getPropertyValue(property)],
      };
      setMessages(newMessages);
      const response = await axiosInstance.patch(`/message/${messageId}/`, {
        [property]: newMessages[messageIndex][getPropertyValue(property)],
      });
      const updatedMessage = response.data;
      return updatedMessage;
    }
  };

  const getPropertyValue = (property) => {
    const propertyMap = {
      is_read: "is_read",
      is_archived: "is_archived",
      is_replied: "is_replied",
    };
    return propertyMap[property];
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, messages.length - page * rowsPerPage);

  if (loading) {
    return (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    );
  }
  const filteredMessages = messages.filter((message) => {
    if (filter === "read") return message.is_read;
    if (filter === "unread") return !message.is_read;
    if (filter === "archived") return message.is_archived;
    if (filter === "unarchived") return !message.is_archived;
    return true;
  });

  const handleFilter = (newFilter) => {
    setFilter(newFilter);
  };

  const resetFilter = () => {
    setFilter(null);
  };

  return (
    <BaseContent maxWidth={800} header="Messages">
      <Grid container justifyContent="space-between" style={{ width: "100%" }}>
        <Grid item>
          {filter !== "unread" ? (
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => handleFilter("unread")}
              style={{ marginRight: 8, minWidth: 175 }}
            >
              Show Unread
            </Button>
          ) : (
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => handleFilter("read")}
              style={{ marginRight: 8, minWidth: 175 }}
            >
              Show Read
            </Button>
          )}
          {filter !== "unarchived" ? (
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => handleFilter("unarchived")}
              style={{ marginLeft: 8, minWidth: 175 }}
            >
              Show Unarchived
            </Button>
          ) : (
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => handleFilter("archived")}
              style={{ marginLeft: 8, minWidth: 175 }}
            >
              Show Archived
            </Button>
          )}
        </Grid>
        <Grid item>
          {filter !== null ? (
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={resetFilter}
            >
              Show All
            </Button>
          ) : (
            <Button
              size="small"
              variant="contained"
              disabled
              color="primary"
              onClick={resetFilter}
            >
              Show All
            </Button>
          )}
        </Grid>
      </Grid>
      <TableContainer>
        <Table className={classes.table} aria-label="messages table">
          <TableHead>
            <TableRow>
              <TableCell onClick={() => handleSort("created_at")}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "left",
                  }}
                >
                  Date
                  {orderBy === "created_at" && order === "asc" && (
                    <ArrowDropUp />
                  )}
                  {orderBy === "created_at" && order === "desc" && (
                    <ArrowDropDown />
                  )}
                </div>
              </TableCell>
              <TableCell onClick={() => handleSort("subject")}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "left",
                  }}
                >
                  Subject
                  {orderBy === "subject" && order === "asc" && <ArrowDropUp />}
                  {orderBy === "subject" && order === "desc" && (
                    <ArrowDropDown />
                  )}
                </div>
              </TableCell>

              <TableCell onClick={() => handleSort("is_read")}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "left",
                  }}
                >
                  Read
                  {orderBy === "is_read" && order === "asc" && <ArrowDropUp />}
                  {orderBy === "is_read" && order === "desc" && (
                    <ArrowDropDown />
                  )}
                </div>
              </TableCell>
              <TableCell onClick={() => handleSort("is_archived")}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "left",
                  }}
                >
                  Archived
                  {orderBy === "is_archived" && order === "asc" && (
                    <ArrowDropUp />
                  )}
                  {orderBy === "is_archived" && order === "desc" && (
                    <ArrowDropDown />
                  )}
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? filteredMessages.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : filteredMessages
            ).map((message) => (
              <TableRow key={message.id}>
                <TableCell
                  component="th"
                  scope="row"
                  padding="none"
                  style={{ width: "30%" }}
                >
                  {new Date(message.created_at).toLocaleString()}
                </TableCell>
                <TableCell
                  style={{ width: "50%" }}
                  onClick={() => setSelectedMessage(message)}
                  padding="none"
                >
                  {message.subject}
                </TableCell>
                <TableCell padding="none" style={{ width: "10%" }}>
                  <Checkbox
                    checked={message.is_read}
                    onChange={() => handleToggleProperty(message.id, "is_read")}
                  />
                </TableCell>
                <TableCell padding="none" style={{ width: "10%" }}>
                  <IconButton
                    aria-label="archive"
                    onClick={() =>
                      handleToggleProperty(message.id, "is_archived")
                    }
                  >
                    {message.is_archived ? (
                      <UnarchiveOutlinedIcon />
                    ) : (
                      <ArchiveIcon />
                    )}
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={5} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={messages.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      {selectedMessage && (
        <MessageDialog
          open={Boolean(selectedMessage)}
          onClose={() => setSelectedMessage(null)}
          message={selectedMessage}
          handleToggleProperty={handleToggleProperty}
        />
      )}
    </BaseContent>
  );
};

export default Messages;
