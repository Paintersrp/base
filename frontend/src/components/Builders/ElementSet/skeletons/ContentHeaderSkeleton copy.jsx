import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { Divider } from "@material-ui/core";

import Flexer from "../../../Elements/Layout/Container/Flexer";

const ContentHeaderSkeleton = () => {
  return (
    <Flexer j="c" a="c" fd="column" mt={16}>
      <div style={{ width: "100%", marginTop: 16, marginBottom: 16 }}>
        <Divider />
      </div>
      <Skeleton variant="text" width={250} height={40} />
      <Skeleton variant="text" width={325} height={20} />
      <Skeleton variant="text" width={225} height={17} />
      <div style={{ width: "100%", marginTop: 16, marginBottom: 16 }}>
        <Divider />
      </div>
      <Skeleton variant="rect" width="100%" height={500} />
    </Flexer>
  );
};

export default ContentHeaderSkeleton;
