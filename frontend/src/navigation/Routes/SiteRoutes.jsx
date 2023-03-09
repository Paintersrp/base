import { Route, Routes, useLocation } from "react-router-dom";
import AboutPage from "../../components/About/_Page/AboutPage";
import DashboardPage from "../../components/Admin/Dashboard/DashboardPage";
import AdminNavigation from "../../components/Admin/Navigation/AdminNavigation";
import ObjectPage from "../../components/Admin/Objects/_Page/ObjectPage";
import PanelPage from "../../components/Admin/Panel/_Page/PanelPage";
import IndividualArticleView from "../../components/Articles/Read/IndividualArticleView";
import UpdateArticleView from "../../components/Articles/Update/UpdateArticleView";
import ArticlesPage from "../../components/Articles/_Page/ArticlesPage";
import JobIndividualView from "../../components/Contact/Jobs/_Pages/JobIndividualView";
import ContactPage from "../../components/Contact/_Page/ContactPage";
import LoginForm from "../../components/Elements/Forms/Login/LoginForm";
import Profile from "../../components/Elements/Forms/Profile/Profile";
import RegisterForm from "../../components/Elements/Forms/Register/RegisterForm";
import GeneratorPage from "../../components/EndPointGenerator/EndPointGeneratorPage";
import LandingPage from "../../components/Landing/_Page/LandingPage";
import ServiceIndividualPage from "../../components/Services/Individual/_Page/ServiceIndividualPage";
import ServicesPage from "../../components/Services/_Page/ServicesPage";
import SupportPage from "../../components/Support/_Page/SupportPage";
import WIPDemo from "../../components/WIP/_Page/WIPDemo";
import ScrollToTop from "../../utils/ScrollToTop";
import Footer from "../Components/Footer/Footer";
import Navigation from "../Components/Navigation/Navigation";
import linkData from "../Components/Navigation/linkData";

export default function SiteRoutes({ handleUpdate, setIsLoading }) {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/admin");
  return (
    <>
      <ScrollToTop />
      {!isAdminPath ? (
        <Navigation
          links={linkData}
          appName={"EDGELORDS"}
          handleUpdate={handleUpdate}
        />
      ) : (
        <AdminNavigation />
      )}
      <Routes>
        {/* Auth Routes */}
        <Route
          path="/login"
          element={
            <LoginForm
              handleUpdate={handleUpdate}
              setIsLoading={setIsLoading}
            />
          }
        />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/profile" element={<Profile />} />
        {/* Page Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:id" element={<ServiceIndividualPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* Demo Routes */}
        <Route path="/WIP" element={<WIPDemo />} />
        <Route path="/generator" element={<GeneratorPage />} />
        <Route path="/jobposting/:id" element={<JobIndividualView />} />
        {/* Feature Routes */}
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:id" element={<IndividualArticleView />} />
        <Route
          path="/articles/:id/update"
          element={
            <div style={{ width: "100vw" }}>
              <UpdateArticleView />
            </div>
          }
        />
        {/* Admin Routes */}
        <Route path="/admin" element={<DashboardPage />} />
        <Route
          path="/admin/:id"
          element={<PanelPage />}
          key={location.pathname}
        />
        <Route path="/admin/:str/control" element={<ObjectPage />} />
      </Routes>
      {!isAdminPath ? <Footer /> : <Footer />}
    </>
  );
}
