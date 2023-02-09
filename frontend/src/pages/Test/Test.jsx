import { useState, useEffect } from "react";
import {
  motion,
  useAnimation,
  AnimateSharedLayout,
  AnimatePresence,
} from "framer-motion";
import "./test.css";
import { FaCode, FaPencilRuler, FaServer } from "react-icons/fa";
import AllInclusiveIcon from "@material-ui/icons/AllInclusive";
import LockIcon from "@material-ui/icons/Lock";
import DesignIcon from "@material-ui/icons/Brush";
import DevelopIcon from "@material-ui/icons/Code";
import HostingIcon from "@material-ui/icons/Public";
import LaunchIcon from "@material-ui/icons/Launch";
import {
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaGithub,
  FaStackOverflow,
} from "react-icons/fa";
import CategoryTiles from "../../components/WIP/Categories/Categories";
import Reviews from "../../components/WIP/Reviews/Reviews";
import FeatureCTA from "../../components/WIP/Features/FeatureCTA/FeatureCTA";
import Partners from "../../components/WIP/Partners/Partners";
import IconScroller from "../../components/Animations/IconScroller/IconScroller";
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
  // and so on
];

const data2 = [
  {
    title: "Design",
    description:
      "Our experienced designers create visually stunning websites that accurately reflect your brand and appeal.",
    icon: DesignIcon,
  },
  {
    title: "Develop",
    description:
      "Our developers use the latest technologies and best practices to turn your design into a fully functional website.",
    icon: DevelopIcon,
  },
  {
    title: "Secure",
    description:
      "We implement industry-standard security measures to protect your website and users' data.",
    icon: LockIcon,
  },
  {
    title: "Host",
    description:
      "We offer a variety of hosting options optimized for speed and reliability, and provide ongoing support.",
    icon: HostingIcon,
  },
  {
    title: "Launch",
    description:
      "We ensure a smooth launch of your website, including SEO optimization and social media promotion.",
    icon: LaunchIcon,
  },
  {
    title: "Maintain",
    description:
      "We provide ongoing maintenance services to keep your website updated and running smoothly.",
    icon: AllInclusiveIcon,
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
