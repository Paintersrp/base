import React from "react";
import ElementSetColumnForm from "../ColumnForm/ElementSetColumnForm";

const ElementSetColumns = ({
  open,
  setOpen,
  colOneHeaderData,
  setColOneHeaderData,
  colTwoHeaderData,
  setColTwoHeaderData,
  handleSaveDetails,
  columns,
}) => {
  return (
    <React.Fragment>
      <ElementSetColumnForm
        headerOpen={open.header.colOne}
        setHeaderOpen={() =>
          setOpen((prevState) => ({
            ...prevState,
            header: {
              ...prevState.header,
              colOne: !prevState.header.colOne,
            },
          }))
        }
        contentOpen={open.content.colOne}
        setContentOpen={() =>
          setOpen((prevState) => ({
            ...prevState,
            content: {
              ...prevState.content,
              colOne: !prevState.content.colOne,
            },
          }))
        }
        layoutOpen={open.layout.colOne}
        setLayoutOpen={() =>
          setOpen((prevState) => ({
            ...prevState,
            layout: {
              ...prevState.layout,
              colOne: !prevState.layout.colOne,
            },
          }))
        }
        headerData={colOneHeaderData}
        setHeaderData={setColOneHeaderData}
        handleSaveDetails={handleSaveDetails}
        label="Column One"
      />
      {columns > 1 && (
        <ElementSetColumnForm
          headerOpen={open.header.colTwo}
          setHeaderOpen={() =>
            setOpen((prevState) => ({
              ...prevState,
              header: {
                ...prevState.header,
                colTwo: !prevState.header.colTwo,
              },
            }))
          }
          contentOpen={open.content.colTwo}
          setContentOpen={() =>
            setOpen((prevState) => ({
              ...prevState,
              content: {
                ...prevState.content,
                colTwo: !prevState.content.colTwo,
              },
            }))
          }
          layoutOpen={open.layout.colTwo}
          setLayoutOpen={() =>
            setOpen((prevState) => ({
              ...prevState,
              layout: {
                ...prevState.layout,
                colTwo: !prevState.layout.colTwo,
              },
            }))
          }
          headerData={colTwoHeaderData}
          setHeaderData={setColTwoHeaderData}
          handleSaveDetails={handleSaveDetails}
          label="Column Two"
        />
      )}
    </React.Fragment>
  );
};

export default ElementSetColumns;
