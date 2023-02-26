import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import LandingPage from "./components/Landing/_Page/LandingPage";
import AboutPage from "./components/About/_Page/AboutPage";
import SupportPage from "./components/WIP/Support/SupportPage";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import baseTheme from "./theme";
import withAuth from "./lib/Auth/withAuth/withAuth";
import ScrollToTop from "./utils/ScrollToTop";
import LoginForm from "./components/Elements/Forms/Login/LoginForm";
import RegisterForm from "./components/Elements/Forms/Register/RegisterForm";
import Navigation from "./navigation/Components/Navigation/Navigation";
import linkData from "./navigation/Components/Navigation/linkData";
import Footer from "./navigation/Components/Footer/Footer";
import Profile from "./components/Elements/Forms/Profile/Profile";
import WIPDemo from "./components/WIP/_Page/WIPDemo";
import ArticlesPage from "./components/Articles/_Page/ArticlesPage";
import IndividualArticleView from "./components/Articles/Read/IndividualArticleView";
import UpdateArticleView from "./components/Articles/Update/UpdateArticleView";
import ServicesPage from "./components/Services/_Page/ServicesPage";
import ContactPage from "./components/Contact/_Page/ContactPage";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "./lib/Axios/axiosInstance";
import { setTheme } from "./lib/Actions/auth";
import chroma from "chroma-js";
import GeneratorPage from "./components/WIP/EndPointGenerator/EndPointGeneratorPage";
import Loading from "./components/Elements/Layout/Loading";
import JobIndividualView from "./components/Contact/Jobs/_Pages/JobIndividualView";
import PanelPage from "./components/Admin/Panels/PanelPage";
import AdminSidebar from "./components/Admin/Navigation/AdminSidebar";
import DashboardPage from "./components/Admin/Dashboard/DashboardPage";
import ObjectPage from "./components/Admin/Objects/ObjectPage";

{
  /* 
  import PrivateRoute from "./navigation/Routes/ProtectedRoute";
  import AdminRoute from "./navigation/Routes/AdminRoute";

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

function App() {
  const auth = useSelector((state) => state.auth);
  const [themeSettings, setThemeSettings] = useState({
    primary_color: auth.primary,
    secondary_color: auth.secondary,
    background_color: auth.background,
  });
  const dispatch = useDispatch();
  const [theme, setThemeUpdate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    handleUpdate();
  }, []);

  const handleUpdate = () => {
    axiosInstance
      .get("/auth/settings/")
      .then((response) => {
        setThemeSettings(response.data);
        dispatch(
          setTheme({
            primary: response.data.primary_color,
            secondary: response.data.secondary_color,
            background: response.data.background_color,
          })
        );
        const primaryColor =
          response.data.primary_color || baseTheme.palette.primary.main;
        const primaryColorLight = chroma(primaryColor).brighten(2).hex();
        const primaryColorDark = chroma(primaryColor).darken(1).hex();

        const secondaryColor =
          response.data.secondary_color || baseTheme.palette.primary.main;
        const secondaryColorLight = chroma(secondaryColor).brighten(2).hex();
        const secondaryColorDark = chroma(secondaryColor).darken(1).hex();

        setThemeUpdate(
          createTheme({
            ...baseTheme,
            palette: {
              primary: {
                main: primaryColor || baseTheme.palette.primary.main,
                light: primaryColorLight || baseTheme.palette.primary.light,
                dark: primaryColorDark || baseTheme.palette.primary.dark,
              },
              secondary: {
                main: secondaryColor || baseTheme.palette.secondary.main,
                light: secondaryColorLight || baseTheme.palette.secondary.light,
                dark: secondaryColorDark || baseTheme.palette.secondary.dark,
              },
              background: {
                default:
                  response.data.background_color ||
                  baseTheme.palette.background.default,
                light:
                  response.data.background_color ||
                  baseTheme.palette.background.light,
              },
              text: {
                dark: "black",
                light: "white",
              },
            },
          })
        );
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <ThemeProvider theme={theme ? theme : baseTheme}>
          <CssBaseline />
          <Router>
            <MyRoutes handleUpdate={handleUpdate} setIsLoading={setIsLoading} />
          </Router>
        </ThemeProvider>
      )}
    </>
  );
}

function MyRoutes({ handleUpdate, setIsLoading }) {
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
        <AdminSidebar appName={"EDGELORDS"} />
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
        <Route path="/admin/:id" element={<PanelPage />} />
        <Route path="/admin/:id/control" element={<ObjectPage />} />
        {/* <Route path="/admin/editarticle/:id" element={<EditPage />} /> */}
      </Routes>
      {!isAdminPath ? <Footer /> : <Footer />}
    </>
  );
}

export default withAuth(App);
