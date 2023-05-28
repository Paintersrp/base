import CardBuilder from "../../Cards/CardBuilder";
import ElementSetBuilder from "../../ElementSet/ElementSetBuilder";
import FAQBuilder from "../../FAQs/FAQBuilder";
import ListBuilder from "../../Lists/ListBuilder";
import TableBuilder from "../../Tables/TableBuilder";
import TaskListBuilder from "../../TaskList/TaskListBuilder";

export function getBuilderComponent(currentBuilder, stepOpen) {
  switch (currentBuilder) {
    case "Element Set":
      return <ElementSetBuilder stepOpen={stepOpen} />;
    // case "Component":
    //   return <ComponentBuilder />;
    // case "Page":
    //   return <PageBuilder />;
    case "List":
      return <ListBuilder />;
    case "FAQ":
      return <FAQBuilder />;
    case "Card":
      return <CardBuilder />;
    case "TaskList":
      return <TaskListBuilder />;
    case "Table":
      return <TableBuilder />;
    default:
      return null;
  }
}
