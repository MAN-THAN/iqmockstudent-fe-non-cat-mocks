import { Space, Spin } from "antd";
import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../services/Context";
import request from "../services/Request";

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
    const jsonData = {
      name: "Gaurav",
      email: "asdnf@gmail.com",
      uid: "2345678098765",
      mockId: `${process.env.REACT_APP_MOCK_ID}`,
    };
    try {
      const res = await request({
        url: `${process.env.REACT_APP_BASE_URL}/api/student/v1/mocks`,
        type: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(jsonData),
      });
      console.log(res);
      localStorage.setItem("userData", JSON.stringify(res.data));
      userAuthCheck();
    } catch (err) {
      console.log(err);
      console.log("attempt id could not be created!!!");
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
