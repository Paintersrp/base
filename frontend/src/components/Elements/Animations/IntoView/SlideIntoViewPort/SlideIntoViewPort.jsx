import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const SlideIntoViewPort = ({
  children,
  from = "below",
  animationDuration = 1,
  onScreenPercentage = 0.5,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const top = ref.current.offsetTop;
      const height = ref.current.clientHeight;
      const isVisible =
        top + height * onScreenPercentage <
        window.pageYOffset + window.innerHeight;
      setIsVisible(isVisible);

      if (isVisible) {
        setHasBeenVisible(isVisible);
      }
    };

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  let start;
  let end;
  if (from === "above") {
    start = { y: "-100%", opacity: 0 };
    end = { y: 0, opacity: 1, transition: { duration: animationDuration } };
  } else if (from === "below") {
    start = { y: "100%", opacity: 0 };
    end = { y: 0, opacity: 1, transition: { duration: animationDuration } };
  } else if (from === "left") {
    start = { x: "-100%", opacity: 0 };
    end = { x: 0, opacity: 1, transition: { duration: animationDuration } };
  } else if (from === "right") {
    start = { x: "100%", opacity: 0 };
    end = { x: 0, opacity: 1, transition: { duration: animationDuration } };
  } else {
    start = { y: "100%", opacity: 0 };
    end = { y: 0, opacity: 1, transition: { duration: animationDuration } };
  }

  return (
    <motion.div
      ref={ref}
      animate={isVisible || hasBeenVisible ? end : start}
      initial={start}
    >
      {children}
    </motion.div>
  );
};
