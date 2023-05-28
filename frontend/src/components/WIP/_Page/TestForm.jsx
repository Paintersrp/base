import React, { useState } from "react";
import TestField from "./TestField";

const TestForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <form style={{ padding: 24 }}>
      <TestField
        variant="outlined"
        id="name"
        label="Name"
        value={name}
        onChange={handleNameChange}
        required
      />
      <TestField
        multiline
        variant="outlined"
        id="email"
        label="Email"
        value={email}
        onChange={handleEmailChange}
        rows={6}
        required
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default TestForm;
