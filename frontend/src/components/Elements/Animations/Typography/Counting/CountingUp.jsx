import { useState, useEffect } from "react";

export const NumberCounter = ({ end, seconds }) => {
  const [final, setfinal] = useState(end - 1);
  const [count, setCount] = useState(1);
  const duration = 1000 * seconds;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((count) => {
        if (count === final) {
          clearInterval(intervalId);
        }
        return count + 1;
      });
    }, duration / (final - count));
    return () => clearInterval(intervalId);
  }, [final]);

  return <div>{count}</div>;
};
