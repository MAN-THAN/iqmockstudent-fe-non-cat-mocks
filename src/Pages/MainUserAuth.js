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
    const isMobileOrTablet = window.matchMedia("(max-width:1000px)").matches;
    console.log(isMobileOrTablet);
    if (isMobileOrTablet) {
      navigate("/mobileErrorPage");
    } else {
      // userAuthCheck();
      startVerification();
    }
  }, []);

  // Function for VERIFICATION
  const startVerification = async () => {
    console.log("verifying");
    try {
      const response = await getVerified(email, otp, mockId);
      console.log(response);
      if (response?.status == 200) {
        localStorage.setItem("auth_token", response?.data?.accessToken);
        localStorage.setItem("userData", JSON.stringify(response?.data?.data));
        const arr_length = response?.data?.attemptList?.length;
        if (arr_length == 0) {
          console.log("New user");
          navigate(`/onboarding`, {
            state: {
              mockId: mockId,
              setId: setId,
            },
          });
        } else {
          console.log("already attempted");
          showToastMessageForAnalysis();
          const Last_attempt_id = response?.data.attemptList[0];
          setTimeout(() => { 
            navigate(`/analysis/${mockId}/${Last_attempt_id}/overall`);
          }, 4000)
        }
      }
    } catch (err) {
      showToastMessage(err?.response?.data?.message);
      console.log(err);
    }
  };
   const showToastMessageForAnalysis = () => {
     toast.info("You have already attempted this mock, redirecting to your Analysis", {
       position: toast.POSITION.TOP_CENTER,
     });
     return null;
   };
  const showToastMessage = (msg) => {
    toast.error(msg == undefined ? "Some error occurred! Please reload the page." : msg, {
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
