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
} from "@material-ui/core";
import { Archive as ArchiveIcon, Reply as ReplyIcon } from "@material-ui/icons";
import SendIcon from "@mui/icons-material/Send";
import UnarchiveOutlinedIcon from "@material-ui/icons/UnarchiveOutlined";

import axiosInstance from "../../../lib/Axios/axiosInstance";
import BaseForm from "../../Elements/Base/BaseForm";
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

  useEffect(() => {
    setLoading(true);
    axiosInstance.get("/message/").then((response) => {
      setMessages(response.data);
      setLoading(false);
    });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleToggleProperty = (messageId, property) => {
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
      axiosInstance.patch(`/message/${messageId}/`, {
        [property]: newMessages[messageIndex][getPropertyValue(property)],
      });
    }
    setSelectedMessage(null);
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

  return (
    <BaseForm maxWidth={1200} title="Messages">
      <TableContainer>
        <Table className={classes.table} aria-label="messages table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Subject</TableCell>

              <TableCell align="center">Read</TableCell>
              <TableCell align="center">Replied</TableCell>
              <TableCell align="center">Archived</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? messages.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : messages
            ).map((message) => (
              <TableRow key={message.id}>
                <TableCell component="th" scope="row">
                  {new Date(message.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell onClick={() => setSelectedMessage(message)}>
                  {message.subject}
                </TableCell>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={message.is_read}
                    onChange={() => handleToggleProperty(message.id, "is_read")}
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    aria-label="reply"
                    onClick={() =>
                      handleToggleProperty(message.id, "is_replied")
                    }
                  >
                    {message.is_replied ? <SendIcon /> : <ReplyIcon />}
                  </IconButton>
                </TableCell>
                <TableCell align="center">
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
    </BaseForm>
  );
};

export default Messages;
