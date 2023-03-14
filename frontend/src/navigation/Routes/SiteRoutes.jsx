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
import WIP2Demo from "../../components/WIP2/_Page/WIP2Demo";
import { ScrollTopFab } from "../../components/Elements/Buttons/ScrollToTopFAB";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Elements/Layout/Loading/Loading";
import { closeSnackbar } from "../../lib/Actions/snackbar";
import AdvancedSnackbar from "../../components/Elements/Snackbars/Snackbar";
import { useEffect, useState } from "react";
import axiosInstance from "../../lib/Axios/axiosInstance";
import AdminRoute from "./AdminRoute";
import AdminLogPage from "../../components/Admin/Reports/AdminLog/AdminLogPage";
import ReadPage from "../../components/Admin/Objects/_Page/ReadPage";

{
  /* 
  import PrivateRoute from "./navigation/Routes/ProtectedRoute";
 

    Private Route Example:
        <Route exact path="/logout" element={<PrivateRoute />}>
          <Route path="/logout" element={<RegisterForm />} />
        </Route> 

    Admin Route Example:
        <Route exact path="/register" element={<AdminRoute />}>
          <Route path="/register" element={<RegisterForm />} />
        </Route> 
  */
}

export default function SiteRoutes({ handleUpdate }) {
  const [jobPostings, setJobPostings] = useState();
  const [socialData, setSocialData] = useState();
  const location = useLocation();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  const isAdminPath = location.pathname.startsWith("/admin");
  const { message, type, open } = useSelector((state) => state.snackbar);
  const [count, setCount] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      axiosInstance
        .get("/appinfo/")
        .then((response) => {
          setJobPostings(response.data.jobs);
          setSocialData(response.data.contact_information);
        })
        .catch((err) => {
          setError(err);
        });
    };
    fetchData();
  }, []);

  return (
    <>
      {jobPostings && (
        <>
          {!isAdminPath ? (
            <Navigation links={linkData(jobPostings)} appName={"EDGELORDS"} />
          ) : (
            <AdminNavigation setCount={setCount} count={count} />
          )}
        </>
      )}
      <AdvancedSnackbar
        message={message}
        type={type}
        open={open}
        onClose={() => dispatch(closeSnackbar())}
      />
      <ScrollTopFab />

      {!loading.isLoading ? (
        <Routes>
          {/* Auth Routes */}
          <Route
            path="/login"
            element={<LoginForm handleLogin={handleUpdate} />}
          />
          <Route
            path="/register"
            element={<RegisterForm handleRegister={handleUpdate} />}
          />
          <Route path="/profile" element={<Profile />} />
          {/* Page Routes */}
          <Route
            path="/"
            element={<LandingPage handleUpdate={handleUpdate} />}
          />
          <Route
            path="/about"
            element={<AboutPage handleUpdate={handleUpdate} />}
          />
          <Route
            path="/support"
            element={<SupportPage handleUpdate={handleUpdate} />}
          />
          <Route
            path="/services"
            element={<ServicesPage handleUpdate={handleUpdate} />}
          />
          <Route
            path="/services/:id"
            element={<ServiceIndividualPage handleUpdate={handleUpdate} />}
          />
          <Route
            path="/contact"
            element={<ContactPage handleUpdate={handleUpdate} />}
          />
          {/* Demo Routes */}
          <Route path="/WIP" element={<WIPDemo />} />
          <Route path="/WIP2" element={<WIP2Demo />} />
          <Route
            path="/generator"
            element={<GeneratorPage handleUpdate={handleUpdate} />}
          />
          <Route path="/jobposting/:id" element={<JobIndividualView />} />
          {/* Feature Routes */}
          <Route
            path="/articles"
            element={<ArticlesPage handleUpdate={handleUpdate} />}
          />
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
          <Route exact path="/admin" element={<AdminRoute />}>
            <Route path="/admin" element={<DashboardPage />} />
          </Route>
          <Route exact path="/adminlog" element={<AdminRoute />}>
            <Route path="/adminlog" element={<AdminLogPage />} />
          </Route>

          <Route
            path="/admin/:id"
            element={<PanelPage />}
            key={location.pathname}
          />
          <Route path="/admin/:str/control" element={<ObjectPage />} />
          <Route
            path="/admin/:str/read"
            element={<ReadPage setCount={setCount} />}
          />
        </Routes>
      ) : (
        <div>
          <Loading loading={loading} message={"Tits?"} />
        </div>
      )}
      {!isAdminPath ? (
        <Footer socialData={socialData} />
      ) : (
        <Footer socialData={socialData} />
      )}
    </>
  );
}
