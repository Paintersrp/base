import React from "react";
import { Divider } from "@material-ui/core";
import Text from "../../../Elements/Layout/Text/Text";

const ContentHeader = ({ header, divider, mt = 12, mb = 8, dmb = 16 }) => {
  return (
    <React.Fragment>
      <Text t="body2" a="c" mb={mb} mt={mt}>
        {header || "Content Header"}
      </Text>
      {divider && (
        <div style={{ marginBottom: dmb, width: "100%" }}>
          <Divider />
        </div>
      )}
    </React.Fragment>
  );
};

export default ContentHeader;
