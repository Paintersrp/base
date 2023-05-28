import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import AboutPage from "../../components/About/_Page/AboutPage";
import DashboardPage from "../../components/Admin/Dashboard/DashboardPage";
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
import LandingPage from "../../components/Landing/_Page/LandingPage";
import ServiceIndividualPage from "../../components/Services/Individual/_Page/ServiceIndividualPage";
import ServicesPage from "../../components/Services/_Page/ServicesPage";
import WIPDemo from "../../components/WIP/_Page/WIPDemo";
import { ScrollTopFab } from "../../components/Elements/Buttons/ScrollToTopFAB";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Elements/Layout/Loading/Loading";
import { closeSnackbar } from "../../lib/Actions/snackbar";
import { useEffect, useState } from "react";
import axiosInstance from "../../lib/Axios/axiosInstance";
import AdminLogPage from "../../components/Admin/Reports/AdminLog/AdminLogPage";
import ReadPage from "../../components/Admin/Objects/_Page/ReadPage";
import ApplicationViewPage from "../../components/Admin/Objects/_Page/ApplicationViewPage";
import AnalysisPage from "../../components/Admin/Objects/_Page/AnalysisPage";
import IndividualDashboard from "../../components/Admin/Dashboard/IndividualDashboard";
import WIPPage from "../../components/Elements/Layout/WIPPage";
import CreateUpdateArticle from "../../components/Articles/Create/ArticleCreateUpdate";
import { useMediaQuery, useTheme } from "@material-ui/core";
import DynamicPage from "../../components/Dynamic/DynamicPage";
import NavigationSwitch from "../../components/Dynamic/NavigationSwitch";
import FooterSwitch from "../../components/Dynamic/FooterSwitch";
import { setJobs, setServices, setUsers } from "../../lib/Actions/plugins";
import { ProtectedRoute, AdminRoute, PublicRoute } from "./RouteAccess";
import SnackbarSwitch from "../../components/Outer/Snackbar/SnackbarSwitch";
import NotFoundSwitch from "../../components/Outer/404/NotFoundSwitch";
import BuilderPage from "../../components/Builders/_Page/BuilderPage";
import TrackerPage from "../../components/WIP/Tracker/TrackerPage";

export default function SiteRoutes({ handleUpdate }) {
  const [ready, setReady] = useState(false);
  const [appData, setAppData] = useState([]);
  const location = useLocation();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  const auth = useSelector((state) => state.auth);
  const plugins = useSelector((state) => state.plugins);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isAdminPath = location.pathname.startsWith("/admin");
  const isBuildPath = location.pathname.startsWith("/build");
  const isTrackerPath = location.pathname.startsWith("/tracker");
  const { message, type, open } = useSelector((state) => state.snackbar);
  const [count, setCount] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(`/get-app/main/`)
      .then((response) => {
        console.log("appData", response.data.jobs);
        setAppData(response.data);

        dispatch(
          setJobs({
            jobsPlugin: response.data.jobs,
          })
        );
        dispatch(
          setUsers({
            usersPlugin: response.data.users,
          })
        );
        dispatch(
          setServices({
            servicesPlugin: response.data.services,
          })
        );
        setReady(true);
      })
      .catch((error) => console.log(error));
  }, []);

  if (!ready || Object.keys(appData).length === 0) {
    return <Loading loading={true} message="Gathering Resources" />;
  }

  const NotFoundPage = NotFoundSwitch(appData.not_found_component);

  return (
    <>
      <NavigationSwitch
        component={appData.nav_component}
        isAdminPath={isAdminPath}
        isBuildPath={isBuildPath}
        appData={appData}
        setCount={setCount}
        count={count}
      />
      <SnackbarSwitch
        component={appData.snackbar_component}
        message={message}
        type={type}
        open={open}
        onClose={() => dispatch(closeSnackbar())}
        position={isSmallScreen ? "top-center" : "top-right"}
      />

      {!isBuildPath && <ScrollTopFab />}

      {!loading.isLoading && auth.is_checked ? (
        <Routes>
          {/* Auth Routes */}
          {appData.users && (
            <React.Fragment>
              <Route
                path="/login"
                element={<LoginForm handleLogin={handleUpdate} />}
              />
              <Route
                path="/register"
                element={<RegisterForm handleRegister={handleUpdate} />}
              />
              <Route path="/profile" element={<Profile />} />
            </React.Fragment>
          )}
          {/* Page Routes */}
          <Route
            path="/"
            element={<LandingPage handleUpdate={handleUpdate} />}
          />
          <Route
            path="/about"
            element={<AboutPage handleUpdate={handleUpdate} />}
          />
          {/* <Route
            path="/support"
            element={<SupportPage handleUpdate={handleUpdate} />}
          /> */}
          {appData.services && (
            <React.Fragment>
              <Route
                path="/services"
                element={<ServicesPage handleUpdate={handleUpdate} />}
              />
              <Route
                path="/services/:id"
                element={<ServiceIndividualPage handleUpdate={handleUpdate} />}
              />
            </React.Fragment>
          )}
          <Route
            path="/contact"
            element={<ContactPage handleUpdate={handleUpdate} />}
          />
          {/* Demo Routes */}
          {Object.entries(appData.page_set_data.pages).map(
            ([id, page], index) => {
              const filteredPageData = Object.values(
                appData.page_set_data.pages
              ).find((p) => p.page_name === page.page_name);

              if (filteredPageData.access === "private") {
                return null;
              }

              let accessElement;
              if (filteredPageData.access === "public") {
                accessElement = <PublicRoute />;
              } else if (filteredPageData.access === "protected") {
                accessElement = <ProtectedRoute />;
              } else if (filteredPageData.access === "admin") {
                accessElement = <AdminRoute />;
              }

              return (
                <Route path={`/${page.page_name}`} element={accessElement}>
                  <Route
                    exact
                    key={id}
                    path={`/${page.page_name}`}
                    element={
                      <DynamicPage
                        handleUpdate={handleUpdate}
                        page={page.page_name}
                        filteredPageData={filteredPageData}
                      />
                    }
                  />
                </Route>
              );
            }
          )}
          <Route path="/inprogress" element={<WIPPage />} />
          <Route path="/WIP" element={<WIPDemo />} />

          {appData.jobs && (
            <Route
              path="/jobposting/:id"
              element={<JobIndividualView handleUpdate={handleUpdate} />}
            />
          )}
          {/* Feature Routes */}
          <Route
            path="/articles"
            element={<ArticlesPage handleUpdate={handleUpdate} />}
          />
          <Route
            path="/articles/create"
            element={<CreateUpdateArticle handleUpdate={handleUpdate} />}
          />
          <Route
            path="/articles/:id"
            element={<IndividualArticleView handleUpdate={handleUpdate} />}
          />
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
            element={<PanelPage setCount={setCount} />}
            key={location.pathname}
          />
          <Route path="/admin/:str/control" element={<ObjectPage />} />
          <Route path="/admin/:str/control/:pk" element={<ObjectPage />} />
          <Route path="/admin/:str/analysis" element={<AnalysisPage />} />
          <Route path="/admin/:str/analysis/:pk" element={<AnalysisPage />} />
          <Route
            path="/admin/messages/read"
            element={<ReadPage setCount={setCount} />}
          />
          <Route
            path="/admin/messages/read/:pk"
            element={<ReadPage setCount={setCount} />}
          />
          <Route
            path="/admin/application/read"
            element={<ApplicationViewPage />}
          />
          <Route
            path="/admin/application/read/:pk"
            element={<ApplicationViewPage />}
          />
          <Route path="/admin/model/:str" element={<IndividualDashboard />} />
          <Route path="*" element={NotFoundPage} />
          <Route path="/build" element={<BuilderPage />} />
          <Route path="/build/tracker" element={<TrackerPage />} />
        </Routes>
      ) : (
        <div>
          <Loading loading={loading} message={"Gathering Resources"} />
        </div>
      )}
      <FooterSwitch
        component={appData.footer_component}
        isAdminPath={isAdminPath}
        isBuildPath={isBuildPath}
        appData={appData}
      />
    </>
  );
}
