import BgImgHero from "../../components/WIP/Heros/BgImgHero/BgImgHero";
import HeroCarousel from "../../components/Landing/HeroCarousel/HeroCarousel";
import HeroCountdown from "../../components/WIP/Heros/HeroCountdown/HeroCountdown";
import OtherHero from "../../components/WIP/Heros/OtherHero/OtherHero";
import Demo from "./Demo";
import FormHero from "../../components/WIP/Heros/FormHero/FormHero";
import StandardHero from "../../components/WIP/Heros/StandardHero/StandardHero";

const items = [
  {
    index: 0,
    image: "images/masonry/img1.jpg",
    buttonText: "View Project",
    buttonLink: "/item-1",
  },
  {
    index: 1,
    image: "images/masonry/img2.jpg",
    buttonText: "View Project",
    buttonLink: "/item-2",
  },
  {
    index: 2,
    image: "images/masonry/img3.jpg",
    buttonText: "View Project",
    buttonLink: "/item-3",
  },
  {
    index: 3,
    image: "images/masonry/img4.jpeg",
    buttonText: "View Project",
    buttonLink: "/item-4",
  },
  {
    index: 4,
    image: "images/masonry/img5.jpeg",
    buttonText: "View Project",
    buttonLink: "/item-5",
  },
  {
    index: 5,
    image: "images/masonry/img6.jpeg",
    buttonText: "View Project",
    buttonLink: "/item-6",
  },
];

const heroComponents = [
  {
    component: OtherHero,
    title: "OtherHero",
    props: {
      title: "Welcome to My App",
      subtitle: "Learn more about our services",
      tagline: "Discover the best way to improve your business",
      buttonText: "Learn More",
      buttonLink: "#services",
    },
  },
  {
    component: HeroCountdown,
    title: "HeroCountdown",
  },
  {
    component: FormHero,
    title: "FormHero",
  },
  {
    component: HeroCarousel,
    title: "HeroCarousel",
    props: { items },
  },
  {
    component: StandardHero,
    title: "StandardHero",
  },
  // {
  //   component: BgImgHero,
  //   title: "BgImgHero",
  // },
];

export default function HeroDemo() {
  return (
    <div>
      <Demo demoTitle="Hero Components" components={heroComponents} />
    </div>
  );
}
