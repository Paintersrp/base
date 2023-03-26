import React from "react";
import FormField from "../../../../../Elements/Fields/FormField";
import Container from "../../../../../Elements/Layout/Container/Container";
import Item from "../../../../../Elements/Layout/Item/Item";
import StyledButton from "../../../../../Elements/Buttons/StyledButton";

const SearchMixin = ({ handleClearSearch, searchTerm, setSearchTerm }) => {
  return (
    <>
      <Item xs={12} sm={12} md={6} style={{ width: "100%" }} justify="flex-end">
        <Container justify="flex-end">
          <Item
            xs={2}
            style={{
              alignItems: "center",
              display: "flex",
              width: "100%",
              height: "100%",
            }}
          >
            {searchTerm !== "" ? (
              <StyledButton
                noHover
                buttonText="Clear"
                variant="contained"
                color="primary"
                minWidth={50}
                onClick={handleClearSearch}
                borderRadius={2}
              />
            ) : (
              <StyledButton
                noHover
                buttonText="Clear"
                variant="contained"
                color="primary"
                onClick={handleClearSearch}
                minWidth={50}
                borderRadius={2}
                disabled
              />
            )}
          </Item>
          <Item
            xs={9}
            sm={9}
            md={8}
            lg={6}
            style={{
              alignItems: "center",
              display: "flex",
              width: "100%",
              height: "100%",
            }}
          >
            <FormField
              label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ height: "100%", marginBottom: "0px !important" }}
            />
          </Item>
        </Container>
      </Item>
    </>
  );
};

export default SearchMixin;
