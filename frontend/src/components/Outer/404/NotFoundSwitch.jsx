import { NotFound } from "./Components/NotFound";

const NotFoundSwitch = (component) => {
  switch (component) {
    case "Standard":
      return <NotFound />;
    case "Minimal":
      return <NotFound />;
    default:
      return null;
  }
};

export default NotFoundSwitch;
