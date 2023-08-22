import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getAttemptId } from "../services/Mock_api";
import { RingLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addMockData } from "../store/slices/mockDataSlice";

const UserAuth = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const { state } = useLocation();
  const dispatch = useDispatch();

  //console.log(state);
  useEffect(() => {
    // userAuthCheck();
    createAttemptId();
  }, []);

  // Function for checking authorising user
  // const userAuthCheck = () => {
  //   const attemptID = JSON.parse(localStorage.getItem("userData"))?.attemptId;
  //   //console.log(attemptID);
  //   if (attemptID) {
  //     //console.log("userAttemptID", attemptID);
  //     //console.log("go to m0ck page");
  //     // navigate(`/main/${state.mockId}/varc`);
  //     navigate(`/instructions`, {
  //       state: {
  //       mockId : state.mockId
  //     } });
  //   } else {
  //     //console.log("you dont have an attempt id");
  //     createAttemptId();
  //   }
  // Function for creating attempt id
  const createAttemptId = async () => {
    ////console.log("creating attemptid");
    dispatch(
      addMockData({
        mockname: "TISS",
        sections: [
          { name: "QUANTS", timing: 30, question: [] },
          { name: "VARC", timing: 30, question: [] },
          { name: "LRDI", timing: 30, question: [] },
          { name: "GK", timing: 30, question: [] },
        ],
        isCalculatorAllowed: false,
        isToggleAllowed: true,
      })
    );
    try {
      const response = await getAttemptId(
        state.name,
        state.email,
        state.uid,
        state.mockId,
        state.setId
      );
      console.log(response);
      if (response?.status === 200) {
        localStorage.setItem("attemptId", response.data.attemptId);
        localStorage.setItem("currMockId", state.mockId);
        localStorage.setItem("mockName", response.data.title);
        // userAuthCheck();
        navigate(`/main`, {
          state: {
            mockId: state.mockId,
            attemptId: response.data.attemptId,
          },
        });
      } else if (response?.status == 201 || response?.status == 202) {
        showToastMessage(
          response?.data?.message || "Please Make a Purchase To Access!"
        );
        localStorage.clear();
        setTimeout(() => {
          window.location.href = "https://www.iquanta.in/cat-mock-test";
        }, 4000);
      } else {
        showToastMessage(response?.data?.message);
        return;
      }
    } catch (err) {
      //console.log(err);
      showToastMessage();
    }
  };
  const showToastMessage = (msg) => {
    toast.error(
      msg == undefined
        ? "Some error occurred! Please reload the page."
        : msg.toUpperCase(),
      {
        position: toast.POSITION.TOP_CENTER,
      }
    );
    return setLoader(false);
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100vw",
          height: "95vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {loader ? (
          <>
            {" "}
            <RingLoader color="var(--orange)" size="150px" />
            <h5
              className="loader_title"
              style={{ textAlign: "center", marginTop: "1em" }}
            >
              Loading..... Please wait!
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
