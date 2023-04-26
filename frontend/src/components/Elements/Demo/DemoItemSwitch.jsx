import React from "react";

import TileCard from "../../Builders/Cards/examples/TileCard";
import DenseCard from "../../Builders/Cards/examples/DenseCard";
import StandardCard from "../../Builders/Cards/examples/StandardCard";
import LargerCard from "../../Builders/Cards/examples/LargerCard";

import AvatarListExample from "../../Builders/Lists/examples/AvatarListExample";
import IconListExample from "../../Builders/Lists/examples/IconListExample";
import ImageListExample from "../../Builders/Lists/examples/ImageListExample";
import PollingListExample from "../../Builders/Parts/PollListExample";
import TaskListExample from "../../Builders/Parts/TaskListExample";

import FAQTabs from "../../Builders/FAQs/examples/FAQTabs";
import FAQList from "../../Builders/FAQs/examples/FAQList";
import FAQCondensedList from "../../Builders/FAQs/examples/FAQCondensedList";
import StandardList from "../../Builders/Lists/examples/StandardList";

const DemoItemSwitch = ({ item }) => {
  switch (item) {
    case "avatar":
      return <AvatarListExample />;
    case "icon":
      return <IconListExample />;
    case "poll":
      return <PollingListExample />;
    case "task":
      return <TaskListExample />;
    case "image":
      return <ImageListExample />;
    case "ordered":
      return <StandardList />;
    case "alternating-image":
      return <ImageListExample alternate />;
    case "tile":
      return <TileCard />;
    case "dense-text":
      return <DenseCard />;
    case "standard":
      return <StandardCard />;
    case "larger":
      return <LargerCard />;
    case "faq-tabs":
      return <FAQTabs />;
    case "faq-list":
      return <FAQList />;
    case "faq-condensed-list":
      return <FAQCondensedList />;
    default:
      return <div>Unknown component type: {item}</div>;
  }
};

export default DemoItemSwitch;
