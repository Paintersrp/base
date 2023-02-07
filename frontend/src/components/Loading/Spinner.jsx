import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector, useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../lib/Actions/loading";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const Spinner = ({ loading }) => {
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={loading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Spinner;

// import React, { useState, useEffect } from "react";
// import Spinner from "../../components/Loading/Spinner";
// import axiosInstance from "../../lib/Axios/axiosInstance";
// import { useDispatch, useSelector } from "react-redux";

// const MyComponent = () => {
//   const [loading, setLoading] = useState(false);
//   const [articles, setArticles] = useState([]);
//   const [error, setError] = useState(null);
//   const dispatch = useDispatch();

//   const handleClick = () => {
//     setLoading(true);
//   };

//   useEffect(() => {
//     if (!loading) {
//       return;
//     }

//     axiosInstance
//       .get("/articles/")
//       .then((response) => {
//         setArticles(response.data.articles);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err);
//       });
//   }, [loading]);

//   return (
//     <div>
//       <button onClick={handleClick}>Start Loading</button>
//       {loading && <Spinner loading={loading} />}
//     </div>
//   );
// };

// export default MyComponent;

