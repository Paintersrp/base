import React, { useState, useEffect } from "react";

export const TypingIn = ({ children, delay = 100, ...props }) => {
  const [display, setDisplay] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (index === children.length) {
        clearInterval(interval);
      } else {
        setDisplay((prevDisplay) => prevDisplay + children[index]);
        setIndex((prevIndex) => prevIndex + 1);
      }
    }, delay);

    return () => {
      clearInterval(interval);
    };
  }, [children, delay, index]);

  return <span {...props}>{display}</span>;
};
