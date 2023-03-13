import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "../../Elements/Layout/Container/Container";
import StyledButton from "../../Elements/Buttons/StyledButton";
import ApprovalSharpIcon from "@mui/icons-material/ApprovalSharp";

function ServiceHeader({ data, handleApplyNowClick }) {
  return (
    <>
      <Container justify="flex-end" spacing={0}>
        <StyledButton
          size="small"
          buttonText="Act Now"
          onClick={handleApplyNowClick}
          startIcon={<ApprovalSharpIcon />}
        />
      </Container>
      <Typography
        variant="h2"
        align="center"
        color="primary"
        style={{ marginBottom: 24 }}
      >
        {data.service_title}
      </Typography>
    </>
  );
}

export default ServiceHeader;
