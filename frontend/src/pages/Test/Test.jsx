import { useState, useEffect } from "react";
import { motion, useAnimation, AnimateSharedLayout } from "framer-motion";
import "./test.css";
import CategoryTiles from "../../components/WIP/Categories/Categories";
import Reviews from "../../components/WIP/Reviews/Reviews";
import FeatureCTA from "../../components/WIP/Features/FeatureCTA/FeatureCTA";
import Partners from "../../components/WIP/Partners/Partners";
import FeaturedProducts from "../../components/WIP/FeaturedProducts/FeaturedProduct";

export function TypingEffect({ text, duration }) {
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

const products = [
  {
    id: 1,
    name: "Product 1",
    image: "https://via.placeholder.com/300x200",
    rating: 4,
    price: "10.99",
    description: "This is a sample product 1",
  },
  {
    id: 2,
    name: "Product 2",
    image: "https://via.placeholder.com/300x200",
    rating: 3,
    price: "20.99",
    description: "This is a sample product 2",
  },
  {
    id: 3,
    name: "Product 3",
    image: "https://via.placeholder.com/300x200",
    rating: 5,
    price: "30.99",
    description: "This is a sample product 3",
  },
];

export default function TestPage() {
  return (
    <>
      <div className="yar-container">
        <div className="testerer">
          <AnimateSharedLayout>
            <div>
              <FormHero />
            </div>
            <div>
              <CategoryTiles />
            </div>
            <div>
              <Reviews />
            </div>
            <div>
              <FeatureCTA />
            </div>

            <div>
              <FeaturedProducts products={products} />
            </div>

            <div>
              <Partners />
            </div>
          </AnimateSharedLayout>
        </div>
      </div>
    </>
  );
}
