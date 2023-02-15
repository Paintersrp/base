import Cookies from "js-cookie";
import axiosInstance from "../Axios/axiosInstance";

const handleLogout = () => {
  axiosInstance
    .get("/auth/logout/")
    .then(() => {
      Cookies.remove("jwt");
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
};

export default handleLogout;
