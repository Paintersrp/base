import React from "react";
import StandardCard from "../../Builders/Cards/Display/StandardCard";
import TileCard from "../../Builders/Cards/Display/TileCard";
import DenseCard from "../../Builders/Cards/Display/DenseCard";
import AvatarListExample from "../../Builders/Lists/Display/AvatarListExample";
import IconListExample from "../../Builders/Lists/Display/IconListExample";
import ImageListExample from "../../Builders/Lists/Display/ImageListExample";
import PollingListExample from "../../Builders/Lists/Display/ListExample";
import TaskListExample from "../../Builders/Lists/Display/TaskListExample.jsx";
import PluginBasedCard from "../../Builders/Cards/Display/PluginBasedCard";
import TableSkeleton from "../../Builders/Parts/Skeletons/TableSkeleton";
import AccordionSkeleton from "../../Builders/Parts/Skeletons/AccordionSkeleton";
import ListSkeleton from "../../Builders/Parts/Skeletons/ListSkeleton";
import CardSkeleton from "../../Builders/Parts/Skeletons/Cards/CardSkeleton";
import FAQTabs from "../../Builders/FAQs/Display/FAQTabs";
import FAQList from "../../Builders/FAQs/Display/FAQList";
import FAQCondensedList from "../../Builders/FAQs/Display/FAQCondensedList";

const DemoItemSwitch = ({ item }) => {
  console.log("item", item);
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
