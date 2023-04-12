import { useState } from "react";

export default function useExampleSwitch(layoutOptions) {
  const [selectedOption, setSelectedOption] = useState(layoutOptions[0].value);
  const [showExample, setShowExample] = useState(false);

  const handleOptionSelect = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleShowExample = () => {
    setShowExample(!showExample);
  };

  return {
    selectedOption,
    handleOptionSelect,
    showExample,
    handleShowExample,
  };
}
