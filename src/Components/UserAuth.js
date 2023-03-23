import { Space, Spin } from "antd";
import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../services/Context";
import { getAttemptId } from "../services/Mock_api";

const UserAuth = () => {
  const navigate = useNavigate();
  //   console.log(attemptID);

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
    const response = await getAttemptId();
    console.log(response);
    if (response?.status == 200) {
      localStorage.setItem("userData", JSON.stringify(response.data));
      userAuthCheck();
    }
  };

  return (
    <React.Fragment>
      <div style={{ display: "flex", width: "100vw", height: "100vh", justifyContent: "center", alignItems: "center" }}>
        <Spin tip="Authenticating..... Please wait" size="large" style={{ transform: "scale(1.8)" }} />
      </div>
    </React.Fragment>
  );
};
export default UserAuth;
