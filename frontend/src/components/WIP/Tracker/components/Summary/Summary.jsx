import React, { useState } from "react";
import "../../styles.css";

import Text from "../../../../Elements/Layout/Text/Text";
import Section from "../../../Base/Containers/Section/Section";

const Summary = ({ incomes, expenses }) => {
  const calculateTotal = (items) => {
    return items.reduce((total, item) => {
      return total + item.amount;
    }, 0);
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Section
      boxShadow={1}
      br={1.5}
      pl={2}
      pr={2}
      mb={3}
      mt={3}
      pt={0}
      pad={3}
      header="Summary"
      divider
    >
      <Text t="body2">Total Income: {calculateTotal(incomes)}</Text>
      <Text t="body2">Total Expenses: {calculateTotal(expenses)}</Text>
      <Text t="body2">
        Remaining Balance: {calculateTotal(incomes) - calculateTotal(expenses)}
      </Text>
    </Section>
  );
};

export default Summary;
