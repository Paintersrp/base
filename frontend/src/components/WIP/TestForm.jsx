import React, { useState } from "react";
import TestField2 from "./Testfield2";

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
      <TestField2
        variant="outlined"
        id="name"
        label="Name"
        value={name}
        onChange={handleNameChange}
        required
      />
      <TestField2
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
