import React, { useState } from "react";
import "../../styles.css";

import BaseInput from "../../../Base/BaseInput/BaseInput";
import Flexer from "../../../../Elements/Layout/Container/Flexer";
import Text from "../../../../Elements/Layout/Text/Text";
import Section from "../../../Base/Containers/Section/Section";

import { handleDataChange } from "../../../../../utils/dataHandlers/dataHandlers";
import BaseButton from "../../../Base/BaseButton/BaseButton";
import BaseModal from "../../../Base/BaseModal/BaseModal";
import { shadowSwitch } from "../../../../../utils/styleSwitches/styleSwitches";
import BaseDrawer from "../../../Base/BaseDrawer/BaseDrawer";

const exampleIncome = [
  { name: "Example Income", amount: "100" },
  { name: "Example Income 2", amount: "200" },
];
const exampleExpenses = [
  { name: "Example Expense", amount: "35" },
  { name: "Example Expense 2", amount: "82" },
];

const TrackerForm = ({
  setData,
  data,
  dataArray,
  headerText,
  buttonText,
  addClick,
  position = "left",
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  let exampleItems;

  if (headerText === "Incomes") {
    exampleItems = exampleIncome;
  } else {
    exampleItems = exampleExpenses;
  }

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Section
      header={`Current ${headerText}`}
      divider
      headerVar="h5"
      mb={0}
      mt={2}
      pad={0}
    >
      <Flexer a="fs">
        <Flexer
          fd="column"
          pl={16}
          mt={2}
          mb={2}
          style={{
            borderRadius: 6,
            boxShadow: shadowSwitch(1),
            marginLeft: `${position === "right" ? "8px" : "2px"}`,
            marginRight: `${position === "left" ? "8px" : "2px"}`,
            padding: "16px 16px 0px 16px",
          }}
        >
          <Flexer key="legend" j="sb">
            <Text t="body1" a="l">
              Name
            </Text>
            <Text t="body1" a="r">
              Amount
            </Text>
          </Flexer>
          <div style={{ width: "100%", margin: 0, padding: 0 }}>
            <hr className="hr-divider-light" />
          </div>
          {dataArray.length > 1 ? (
            <React.Fragment>
              {dataArray.map((item, index) => (
                <React.Fragment>
                  <Flexer key={index} j="sb" mt={4}>
                    <Text t="body1" a="l">
                      {item.name}
                    </Text>
                    <Text t="body1" a="r">
                      ${item.amount}
                    </Text>
                  </Flexer>
                  <div style={{ width: "100%" }}>
                    <hr className="hr-divider-light" />
                  </div>
                </React.Fragment>
              ))}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {exampleItems.map((item, index) => (
                <React.Fragment>
                  <Flexer key={index} j="sb" mt={4}>
                    <Text t="body1" a="l">
                      {item.name}
                    </Text>
                    <Text t="body1" a="r">
                      ${item.amount}
                    </Text>
                  </Flexer>
                  <div style={{ width: "100%" }}>
                    <hr className="hr-divider-light" />
                  </div>
                </React.Fragment>
              ))}
            </React.Fragment>
          )}
          <Flexer j="c">
            <BaseButton
              onClick={openModal}
              size="md"
              style={{
                marginTop: 8,
                marginLeft: 8,
              }}
            >
              {buttonText}
            </BaseButton>
          </Flexer>
        </Flexer>
      </Flexer>
      <BaseModal isOpen={modalOpen} onClose={closeModal}>
        <div className="input-group" key={`${headerText}-form`}>
          <BaseInput
            type="text"
            value={data.name}
            onChange={(e) => handleDataChange(e, setData, data)}
            name="name"
            helpText="Name"
          />
          <BaseInput
            type="number"
            value={data.amount}
            onChange={(e) => handleDataChange(e, setData, data)}
            name="amount"
            helpText="Amount"
          />
          <Flexer j="c">
            <BaseButton
              onClick={addClick}
              size="md"
              color="success"
              style={{
                marginTop: 8,
                marginRight: 4,
                minWidth: 65,
              }}
            >
              Confirm
            </BaseButton>
            <BaseButton
              onClick={addClick}
              size="md"
              color="error"
              style={{
                marginTop: 8,
                marginLeft: 4,
                minWidth: 65,
              }}
            >
              Cancel
            </BaseButton>
          </Flexer>
        </div>
      </BaseModal>
    </Section>
  );
};

export default TrackerForm;
