import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { getAttemptId } from "../services/Mock_api";
import { RingLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const UserAuth = () => {
  const navigate = useNavigate();
  const { name, email, uid } = useParams();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    userAuthCheck();
  }, []);

  // Function for checking authorising user
  const userAuthCheck = () => {
    const attemptID = JSON.parse(localStorage.getItem("userData"))?.attemptId;
    console.log(attemptID);
    if (attemptID) {
      console.log("userAttemptID", attemptID);
      console.log("go to m0ck page");
      navigate(`/main/${process.env.REACT_APP_MOCK_ID}/varc`);
    } else {
      console.log("you dont have an attempt id");
      createAttemptId();
    }
  };
  // Function for creating attempt id
  const createAttemptId = async () => {
    console.log("creating attemptid");
    const response = await getAttemptId(name, email, uid);
    console.log(response);
    if (response?.status === 200) {
      localStorage.setItem("userData", JSON.stringify(response.data));
      userAuthCheck();
    } else {
      showToastMessage();
      return 
    }
  };
  const showToastMessage = () => {
    toast.error("Some error occurred! Please reload the page.", {
      position: toast.POSITION.TOP_CENTER,
    });
    return setLoader(false)
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <div style={{ display: "flex", flexDirection: "column", width: "100vw", height: "95vh", justifyContent: "center", alignItems: "center" }}>
        {loader ? (
          <>
            {" "}
            <RingLoader color="var(--orange)" size="150px" />
            <h5 className="loader_title" style={{ textAlign: "center", marginTop: "1em" }}>
              Authenticating..... Please wait!
            </h5>
          </>
        ) : (
          <div></div>
        )}
      </div>
    </React.Fragment>
  );
};
export default UserAuth;
