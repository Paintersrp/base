import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/Landing/LandingPage";
import AboutPage from "./pages/About/AboutPage";
import SupportPage from "./pages/WIP/Support/SupportPage";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./theme";
import withAuth from "./lib/Auth/withAuth/withAuth";
import ScrollToTop from "./lib/ScrollToTop";
import LoginForm from "./components/Elements/Forms/Login/LoginForm";
import RegisterForm from "./components/Elements/Forms/Register/RegisterForm";
import Navigation from "./navigation/Components/Navigation/Navigation";
import linkData from "./navigation/Components/Navigation/linkData";
import ComplexFooter from "./navigation/Components/Footer/ComplexFooter/ComplexFooter";
import Profile from "./components/Elements/Forms/Profile/Profile";
import FeatureDemo from "./pages/Demos/WIPDemo";
import Articles from "./pages/Articles/Articles/Articles";
import IndividualArticleView from "./pages/Articles/Individual/IndividualArticleView";
import UpdateArticleView from "./pages/Articles/Edit/UpdateArticleView";

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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <ScrollToTop />
        <Navigation links={linkData} appName={"EDGELORDS"} />
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/profile" element={<Profile />} />

          {/* Page Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/services" element={<AboutPage />} />
          <Route path="/contact" element={<AboutPage />} />

          {/* Demo Routes */}
          <Route path="/WIP" element={<FeatureDemo />} />

          {/* Feature Routes */}
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:id" element={<IndividualArticleView />} />
          <Route
            path="/articles/:id/update"
            element={
              <div style={{ width: "100vw" }}>
                <UpdateArticleView />
              </div>
            }
          />
        </Routes>
        <ComplexFooter />
      </Router>
    </ThemeProvider>
  );
}

export default withAuth(App);
