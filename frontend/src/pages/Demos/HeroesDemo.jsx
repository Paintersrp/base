import BgImgHero from "../../components/Heroes/BgImgHero/BgImgHero";
import FormHero from "../../components/Heroes/FormHero/FormHero";
import HeroCarousel from "../../components/Heroes/HeroCarousel/HeroCarousel";
import HeroCountdown from "../../components/Heroes/HeroCountdown/HeroCountdown";
import OtherHero from "../../components/Heroes/OtherHero/OtherHero";
import StandardHero from "../../components/Heroes/StandardHero/StandardHero";
import Demo from "./Demo";

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
