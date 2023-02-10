import ContactForm from "../../components/Elements/Forms/ContactForm/ContactForm";
import LoginForm from "../../components/Elements/Forms/Login/LoginForm";
import NewsletterForm from "../../components/Elements/Forms/Newsletter/NewsletterForm";
import ProfileForm from "../../components/Elements/Forms/Profile/Profile";
import RegisterForm from "../../components/Elements/Forms/Register/RegisterForm";
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
