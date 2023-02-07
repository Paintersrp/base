import ContactForm from "../../components/Forms/Contact/ContactForm";
import LoginForm from "../../components/Forms/Login/LoginForm";
import NewsletterForm from "../../components/Forms/Newsletter/NewsletterForm";
import ProfileForm from "../../components/Forms/Profile/Profile";
import RegisterForm from "../../components/Forms/Register/RegisterForm";
import Demo from "./Demo";

const formComponents = [
  {
    component: ContactForm,
    title: "ContactForm",
  },
  {
    component: LoginForm,
    title: "LoginForm",
  },
  {
    component: RegisterForm,
    title: "RegisterForm",
  },
  {
    component: NewsletterForm,
    title: "NewsletterForm",
  },
  {
    component: ProfileForm,
    title: "ProfileForm WIP",
  },
];

export default function FormDemo() {
  return (
    <div>
      <Demo demoTitle="Form Components" components={formComponents} />
    </div>
  );
}
