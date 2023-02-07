import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Axios/axiosInstance";

const handleLogout = () => {
  axiosInstance
    .get("/logout/")
    .then(() => {
      Cookies.remove("jwt");
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
};

export default handleLogout;
