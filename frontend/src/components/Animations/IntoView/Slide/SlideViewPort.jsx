import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const SlideOnScroll = ({ children, from }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      });
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  let start;
  let end;
  if (from === "up") {
    start = { y: "-100%", opacity: 0 };
    end = { y: 0, opacity: 1, transition: { duration: 1 } };
  } else if (from === "down") {
    start = { y: "100%", opacity: 0 };
    end = { y: 0, opacity: 1, transition: { duration: 1 } };
  } else if (from === "left") {
    start = { x: "-100%", opacity: 0 };
    end = { x: 0, opacity: 1, transition: { duration: 1 } };
  } else if (from === "right") {
    start = { x: "100%", opacity: 0 };
    end = { x: 0, opacity: 1, transition: { duration: 1 } };
  } else {
    start = { y: "100%", opacity: 0 };
    end = { y: 0, opacity: 1, transition: { duration: 1 } };
  }

  return (
    <motion.div ref={ref} animate={isVisible ? end : start} initial={start}>
      {children}
    </motion.div>
  );
};
