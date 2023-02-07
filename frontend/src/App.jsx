import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterForm from "./components/Forms/Register/RegisterForm";
import LoginForm from "./components/Forms/Login/LoginForm";
import LandingPage from "./pages/Landing/LandingPage";
import AboutPage from "./pages/About/AboutPage";
import TestPage from "./pages/Test/Test";
import HeroDemo from "./pages/Demos/HeroesDemo";
import FeatureDemo from "./pages/Demos/FeaturesDemo";
import DrawerBased from "./navigation/Components/DrawerBased/DrawerBased";
import FormDemo from "./pages/Demos/FormDemos";
import PartsDemo from "./pages/Demos/PartDemos";
import SupportPage from "./pages/Support/SupportPage";
import IndividualArticleView from "./pages/Articles/IndividualArticleView";
import ArticleList from "./pages/Articles/ArticleList";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./theme";
import ScrollToTop from "./components/Elements/HOC/ScrollToTop";
import Footer from "./navigation/Components/Footer/SimpleFooter/SimpleFooter";
import PrivateRoute from "./navigation/Routes/ProtectedRoute";
import AdminRoute from "./navigation/Routes/AdminRoute";
import withAuth from "./lib/Auth/withAuth/withAuth";
import ProfileForm from "./components/Forms/Profile/Profile";
import UpdateArticleView from "./pages/Articles/UpdateArticleView";
{
  /* 
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
        <DrawerBased />
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/profile" element={<ProfileForm />} />

          {/* Page Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/ticket" element={<SupportPage />} />
          <Route path="/services" element={<TestPage />} />
          <Route path="/contact" element={<AboutPage />} />

          {/* Demo Routes */}
          <Route path="/heroes" element={<HeroDemo />} />
          <Route path="/features" element={<FeatureDemo />} />
          <Route path="/forms" element={<FormDemo />} />
          <Route path="/parts" element={<PartsDemo />} />

          {/* Feature Routes */}
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/articles/:id" element={<IndividualArticleView />} />
          <Route path="/articles/:id/update" element={<UpdateArticleView />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default withAuth(App);
