// Button click effect

// const variants = {
//     pressed: { scale: 0.95 },
//     normal: { scale: 1 },
//   };
{
  /* <motion.button
          variants={variants}
          whileTap="pressed"
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          Click me
</motion.button> */
}

// Paralax Fade In

{
  /* <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ staggerChildren: 0.2, duration: 1 }}
        >
          <Grid container spacing={0}>
            <Grid item xs={6}>
              <motion.div key="1">1</motion.div>
              <motion.div key="2">2</motion.div>
              <motion.div key="3">3</motion.div>
            </Grid>
            <Grid item xs={6}>
              <motion.div key="1">1</motion.div>
              <motion.div key="2">2</motion.div>
              <motion.div key="3">3</motion.div>
            </Grid>
          </Grid>
        </motion.div> */
}

// blur

// <motion.div whileHover={{ filter: "blur(1px)" }}>
//           Tits
//         </motion.div>

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
import FormHero from "../../components/Heroes/FormHero/FormHero";
import CategoryTiles from "../../components/Features/Commerce/Categories/Categories";
import Reviews from "../../components/Features/Reviews/Reviews";
import IconScroller from "../../components/Animations/IconScroller/IconScroller";
import OurProcess from "../../components/Features/Business/OurProcess/OurProcess";
import FeatureCTA from "../../components/Features/Content/FeatureCTA/FeatureCTA";
import FeaturedProducts from "../../components/Features/Commerce/FeaturedProducts/FeaturedProduct";
import Partners from "../../components/Features/Business/Partners/Partners";

const members = [
  {
    id: 1,
    name: "John Smith",
    position: "CEO",
    img: "https://via.placeholder.com/150",
    bio: "John has been in the industry for over 10 years and has a wealth of experience in leading successful teams.",
    linkedin: "https://www.linkedin.com/in/john-smith",
    twitter: "https://twitter.com/johnsmith",
    facebook: "https://www.facebook.com/john.smith",
  },
  {
    id: 2,
    name: "Jane Doe",
    position: "CFO",
    img: "https://via.placeholder.com/150",
    bio: "Jane is a finance expert and has helped many companies achieve their financial goals.",
    linkedin: "https://www.linkedin.com/in/jane-doe",
    twitter: "https://twitter.com/janedoe",
  },
  {
    id: 3,
    name: "Bob Johnson",
    position: "CTO",
    img: "https://via.placeholder.com/150",
    bio: "Bob has a strong background in software development and is always on the cutting edge of technology.",
    linkedin: "https://www.linkedin.com/in/bob-johnson",
  },
];

const data = [
  {
    icon: FaCode,
    title: "Development",
    description:
      "We specialize in creating custom software solutions for businesses of all sizes.",
    onClick: () => console.log("Development clicked"),
  },
  {
    icon: FaPencilRuler,
    title: "Design",
    description:
      "We design visually stunning interfaces and user experiences that are easy to use.",
    onClick: () => console.log("Design clicked"),
  },
  {
    icon: FaServer,
    title: "Infrastructure",
    description:
      "We ensure your software is running smoothly and securely on the cloud or on-premises.",
    onClick: () => console.log("Infrastructure clicked"),
  },
];

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

const partners = [
  {
    id: 1,
    icon: FaTwitter,
  },
  {
    id: 2,
    icon: FaFacebook,
  },
  {
    id: 3,
    icon: FaInstagram,
  },
  {
    id: 4,
    icon: FaLinkedin,
  },
  {
    id: 5,
    icon: FaYoutube,
  },
  {
    id: 6,
    icon: FaGithub,
  },
  {
    id: 7,
    icon: FaStackOverflow,
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
              <IconScroller data={partners} />
            </div>
            <div>
              <OurProcess
                data={data2}
                title="Creating and Hosting Websites"
                subtitle="Our Process"
              />
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
