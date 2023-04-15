import React from "react";
import StandardCard from "../../Builders/Parts/Examples/Cards/StandardCard";
import TileCard from "../../Builders/Parts/Examples/Cards/TileCard";
import DenseCard from "../../Builders/Parts/Examples/Cards/DenseCard";
import AvatarListExample from "../../Builders/Parts/Examples/Lists/AvatarListExample";
import IconListExample from "../../Builders/Parts/Examples/Lists/IconListExample";
import ImageListExample from "../../Builders/Parts/Examples/Lists/ImageListExample";
import PollingListExample from "../../Builders/Parts/Examples/Lists/ListExample";
import TaskListExample from "../../Builders/Parts/Examples/Lists/TaskList.jsx";
import PluginBasedCard from "../../Builders/Parts/Examples/Cards/PluginBasedCard";
import TableSkeleton from "../../Builders/Parts/Skeletons/TableSkeleton";
import AccordionSkeleton from "../../Builders/Parts/Skeletons/AccordionSkeleton";
import ListSkeleton from "../../Builders/Parts/Skeletons/ListSkeleton";
import CardSkeleton from "../../Builders/Parts/Skeletons/CardSkeleton";

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
    default:
      return <div>Unknown component type: {item}</div>;
  }
};

export default DemoItemSwitch;
