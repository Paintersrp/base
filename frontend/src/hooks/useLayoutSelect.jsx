import { useState } from "react";

export default function useLayoutSelect(initialValue = "layout-1") {
  const [value, setValue] = useState(initialValue);

  function handleChange(event) {
    setValue(event.target.value);
  }

  return {
    value,
    handleChange,
  };
}
