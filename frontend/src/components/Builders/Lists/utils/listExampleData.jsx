import AssignmentIcon from "@material-ui/icons/Assignment";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import EventNoteIcon from "@material-ui/icons/EventNote";
import BuildIcon from "@material-ui/icons/Build";

export const avatarExampleData = [
  {
    id: 1,
    title: "John Doe",
    subtitle: "john.doe@example.com",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    title: "Jane Smith",
    subtitle: "jane.smith@example.com",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 3,
    title: "Bob Johnson",
    subtitle: "bob.johnson@example.com",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  },
];

export const iconExampleData = [
  {
    id: 1,
    title: "Invoices",
    description: "Manage your invoices and payments",
    icon: <AttachMoneyIcon />,
  },
  {
    id: 2,
    title: "Tasks",
    description: "Keep track of your to-do list",
    icon: <AssignmentIcon />,
  },
  {
    id: 3,
    title: "Calendar",
    description: "View your upcoming events and meetings",
    icon: <EventNoteIcon />,
  },
  {
    id: 4,
    title: "Settings",
    description: "Customize your account settings",
    icon: <BuildIcon />,
  },
];

export const imageExampleData = [
  {
    id: 1,
    title: "Nature",
    subtitle: "A beautiful landscape",
    imageUrl: "https://source.unsplash.com/300x169/?landscape",
  },
  {
    id: 2,
    title: "City",
    subtitle: "A bustling metropolis",
    imageUrl: "https://source.unsplash.com/301x169/?city",
  },
  {
    id: 3,
    title: "Travel",
    subtitle: "Visit anywhere on the globe",
    imageUrl: "https://source.unsplash.com/300x170/?airplane",
  },
  {
    id: 4,
    title: "Town",
    subtitle: "A budding young polis",
    imageUrl: "https://source.unsplash.com/301x169/?smalltown",
  },
];

export const favExampleData = [
  {
    id: 1,
    title: "Choice 1",
    subtitle: "This is the first choice",
    favorite: false,
  },
  {
    id: 2,
    title: "Choice 2",
    subtitle: "This is the second choice",
    favorite: true,
  },
  {
    id: 3,
    title: "Choice 3",
    subtitle: "This is the third choice",
    favorite: false,
  },
];

export const taskExampleData = [
  {
    id: 1,
    category: "Shopping",
    title: "Task 1",
    subtitle: "Complete by 2023-04-15",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut auctor euismod nisi.",
  },
  {
    id: 2,
    category: "General",
    title: "Task 2",
    subtitle: "Complete by 2023-04-20",
    description:
      "Sed ullamcorper ante vel tellus volutpat vestibulum. Sed nec metus lacinia, lacinia mi nec, suscipit est.",
  },
  {
    id: 3,
    category: "Today",
    title: "Task 3",
    subtitle: "Complete by 2023-04-30",
    description:
      "Proin vestibulum elit sit amet faucibus malesuada. Mauris vel accumsan odio. ",
  },
  {
    id: 4,
    category: "Today",
    title: "Task 4",
    subtitle: "Complete by 2023-05-05",
    description:
      "Vivamus ac faucibus dolor. Aliquam vel justo vitae urna malesuada fermentum.",
  },
];
