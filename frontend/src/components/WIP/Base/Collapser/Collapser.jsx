import React, { useRef, useState, useEffect, useLayoutEffect } from "react";

const Collapser = ({ isOpen, children }) => {
  const [height, setHeight] = useState("110%");
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    setHeight(isOpen ? contentRef.current.scrollHeight + 20 : 0);
  }, [isOpen, children, contentRef]);

  const handleTransitionEnd = () => {
    if (!isOpen) {
      setHeight(0);
    }
  };

  return (
    <div>
      <div
        ref={contentRef}
        style={{
          maxHeight: `${height}px`,
          transition: "max-height 0.3s ease-in-out",
          overflow: "hidden",
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {children}
      </div>
    </div>
  );
};

export default Collapser;
