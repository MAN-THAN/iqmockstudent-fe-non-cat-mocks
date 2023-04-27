import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { getVerified } from "../services/Mock_api";

const MainUserAuth = () => {
  const navigate = useNavigate();
  const { email, otp, mockId, setId } = useParams();
  const [loader, setLoader] = useState(true);
  const temp = { email: "john@example.com", otp: "49858", setId: "xyx", mockId: "6430e9e837185e086ad69368" };

  useEffect(() => {
    // userAuthCheck();
    startVerification();
  }, []);

  // Function for VERIFICATION
  const startVerification = async () => {
    console.log("verifying");
    try {
      const response = await getVerified(email, otp);
      console.log(response);
      if (response?.status == 200) {
          localStorage.setItem("auth_token", response?.data?.accessToken);
           localStorage.setItem("userData", JSON.stringify(response?.data?.data));
        navigate(`/onboarding`, {
          state: {
            mockId: mockId,
            setId: setId
          },
        });
      }
    } catch (err) {
        showToastMessage();
      console.log(err);
    }
  };
  const showToastMessage = () => {
    toast.error("Some error occurred! Please reload the page.", {
      position: toast.POSITION.TOP_CENTER,
    });
    return setLoader(false);
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
export default MainUserAuth;
