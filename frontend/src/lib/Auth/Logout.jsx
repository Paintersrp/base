import Cookies from "js-cookie";
import axiosInstance from "../Axios/axiosInstance";

const handleLogout = () => {
  if (Cookies.get("jwt")) {
    axiosInstance
      .get("/auth/logout/")
      .then(() => {
        Cookies.remove("jwt");
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    window.location.href = "/";
  }
};

export default handleLogout;
