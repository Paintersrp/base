import React from "react";

import StandardCard from "../../Builders/Cards/examples/StandardCard";
import TileCard from "../../Builders/Cards/examples/TileCard";
import DenseCard from "../../Builders/Cards/examples/DenseCard";
import LargeCard from "../../Builders/Cards/examples/LargeCard";

import AvatarListExample from "../../Builders/Lists/examples/AvatarListExample";
import IconListExample from "../../Builders/Lists/examples/IconListExample";
import ImageListExample from "../../Builders/Lists/examples/ImageListExample";
import PollingListExample from "../../Builders/Lists/examples/ListExample";
import TaskListExample from "../../Builders/Lists/examples/TaskListExample";

import TableSkeleton from "../../Builders/FAQs/skeletons/TableSkeleton";
import AccordionSkeleton from "../../Builders/FAQs/skeletons/AccordionSkeleton";
import ListSkeleton from "../../Builders/FAQs/skeletons/ListSkeleton";
import CardSkeleton from "../../Builders/Cards/skeletons/CardSkeleton";

import FAQTabs from "../../Builders/FAQs/examples/FAQTabs";
import FAQList from "../../Builders/FAQs/examples/FAQList";
import FAQCondensedList from "../../Builders/FAQs/examples/FAQCondensedList";

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
    case "alternating-image":
      return <ImageListExample alternate />;
    case "tile":
      return <TileCard />;
    case "dense-text":
      return <DenseCard />;
    case "standard":
      return <StandardCard />;
    case "plugin":
      return <PluginBasedCard />;
    case "card-skeleton":
      return <CardSkeleton />;
    case "list-skeleton":
      return <ListSkeleton />;
    case "accordion-skeleton":
      return <AccordionSkeleton />;
    case "table-skeleton":
      return <TableSkeleton />;
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
