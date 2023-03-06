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
          <Item xs={2}>
            {searchTerm !== "" ? (
              <div
                style={{
                  justifyContent: "center",
                  alignContent: "center",
                  display: "flex",
                  marginTop: 8,
                  marginBottom: 4,
                }}
              >
                <StyledButton
                  noHover
                  buttonText="Clear"
                  variant="contained"
                  color="primary"
                  minWidth={50}
                  onClick={handleClearSearch}
                  borderRadius={2}
                />
              </div>
            ) : (
              <div
                style={{
                  justifyContent: "center",
                  alignContent: "center",
                  display: "flex",
                  marginTop: 8,
                  marginBottom: 4,
                }}
              >
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
              </div>
            )}
          </Item>
          <Item xs={10} sm={10} md={8} lg={6}>
            <FormField
              label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Item>
        </Container>
      </Item>
    </>
  );
};

export default SearchMixin;
