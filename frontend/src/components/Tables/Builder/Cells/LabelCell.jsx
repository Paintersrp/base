import React from "react";
import {
  TextField,
  TableCell,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

const useStyles = makeStyles((theme) => ({
  customField: {
    width: "100%",
    minWidth: 120,
    backgroundColor: "#f7fafc",
    "& .MuiFilledInput-root": {},
    "& .MuiFilledInput-input": {
      color: "#1a202c",
      fontWeight: 600,
    },
    "& .MuiFilledInput-underline:before": {
      borderBottomColor: "#e2e8f0",
    },
    "& .MuiFilledInput-underline:after": {
      borderBottomColor: "#4a5568",
    },
    "& .MuiFormLabel-root": {
      color: "#1a202c",
      fontWeight: 600,
    },
    "& .Mui-focused .MuiFormLabel-root": {
      color: "#4a5568",
    },
    "& .MuiFormHelperText-root": {
      color: "#4a5568",
      fontWeight: 500,
    },
  },
  tableCell: {
    maxWidth: 250,
    minWidth: 250,
    paddingRight: 8,
    paddingLeft: 0,
  },
  removeButton: {
    color: theme.palette.error.light,
  },
  dragInner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.info.main,
    paddingRight: 4,
  },
}));

const LabelCell = ({
  label,
  index,
  data,
  item,
  handleNameFunc,
  removeFunc,
  onDragStart,
  onDragEnd,
  onDrop,
  onDragOver,
  drag = false,
  draggedColumnIndex,
}) => {
  const classes = useStyles();

  return (
    <TableCell
      key={index}
      align="center"
      className={classes.tableCell}
      onDragStart={onDragStart ? onDragStart : null}
      onDragEnd={onDragEnd ? onDragEnd : null}
      onDrop={onDrop ? onDrop : null}
      onDragOver={onDragOver ? onDragOver : null}
      style={{
        opacity: index === draggedColumnIndex ? 0.4 : 1,
      }}
    >
      <div key={index} style={{ width: "100%", display: "flex" }}>
        {drag && (
          <div
            draggable
            onDragStart={onDragStart ? onDragStart : null}
            onDragEnd={onDragEnd ? onDragEnd : null}
            onDrop={onDrop ? onDrop : null}
            onDragOver={onDragOver ? onDragOver : null}
            className={classes.dragInner}
          >
            <DragIndicatorIcon />
          </div>
        )}
        <TextField
          className={classes.customField}
          variant="filled"
          required
          label={`${label} ${index + 1}`}
          value={item.name}
          onChange={(event) => handleNameFunc(event, index)}
          InputProps={{
            endAdornment: data.length > 1 && (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={() => removeFunc(index, item)}
                  className={classes.removeButton}
                >
                  <RemoveCircleIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
    </TableCell>
  );
};

export default LabelCell;
