import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { Divider } from "@material-ui/core";
import CollectionsIcon from "@mui/icons-material/Collections";
import NoteAddIcon from "@mui/icons-material/NoteAdd";

import Flexer from "../../../Elements/Layout/Container/Flexer";
import { elementObjectMap } from "../utils/elementObjectMap";

const ContentSkeleton = ({ elementObject, contentType, openDialog }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const speedDialOptions = [
    {
      text: "Create Content",
      onClick: () => console.log("Create clicked"),
      icon: <NoteAddIcon />,
    },
    {
      text: "Choose Content",
      onClick: () => console.log("Choose clicked"),
      icon: <CollectionsIcon />,
    },
  ];

  return (
    <Flexer fd="column" a="center" style={{ height: "100%" }}>
      <div style={{ width: "100%", marginTop: 0, marginBottom: 16 }}>
        <Divider />
      </div>

      {!elementObject ? (
        <div
          style={{
            position: "relative",
            width: "100%",
          }}
        >
          <SpeedDial
            ariaLabel="content menu"
            icon={<SpeedDialIcon />}
            FabProps={{
              size: "medium",
              sx: { backgroundColor: "#2e3b55" },
            }}
            style={{
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1,
            }}
            sx={{ "& .MuiSpeedDial-actions": { paddingBottom: 5 } }}
            onClick={handleOpen}
            open={open}
          >
            {speedDialOptions.map((option, index) => (
              <SpeedDialAction
                key={index}
                icon={option.icon}
                onClick={option.onClick}
                tooltipTitle={option.text}
                FabProps={{
                  size: "small",
                  sx: {
                    backgroundColor: "#ff8c00",
                    color: "#ffffff",
                    fontSize: "12px",
                    "&:hover": {
                      backgroundColor: "#42a5f5",
                      color: "#ffffff",
                    },
                  },
                }}
              />
            ))}
          </SpeedDial>

          <Skeleton
            variant="rect"
            width="100%"
            height={500}
            style={{ zIndex: 0 }}
            onClick={() => console.log("Clicked")}
          />
        </div>
      ) : (
        elementObjectMap(contentType, elementObject)
      )}
    </Flexer>
  );
};

export default ContentSkeleton;
