import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

export function TypingIn({ text, duration }) {
  const animation = useAnimation();

  useEffect(() => {
    animation.start("typing");
  }, []);

  return (
    <motion.div
      animate={animation}
      initial={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="clown-ass"
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: duration, delay: index * duration }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
}
