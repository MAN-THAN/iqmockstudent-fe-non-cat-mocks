import React, { useState, useContext, useEffect, useLayoutEffect } from "react";
import { fetchAnalysisData } from "./Analysis_api";
import MuiBackdrop from "@mui/material/Backdrop";
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchMockStatus } from "./Analysis_api";

export const Context = React.createContext();

export function useAuth() {
  return useContext(Context);
}

export const ContextProvider = ({ children }) => {
  const [analysisData, setAnalysisData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isErr, setErr] = useState(false);
  const [menuBarOpen, setMenuBarOpen] = useState(false); //Globally state for menu bar
  const [isWindowClosed, setWindowClosed] = useState();
  const [topperData, setTopperData] = useState();
  console.log(isWindowClosed);

  const analysisDataApi = async (attemptId, mockId) => {
    const uid = JSON.parse(localStorage.getItem("userData"))?._id;
    try {
      const response = await fetchAnalysisData(attemptId);
      const response2 = await fetchMockStatus(mockId, uid);
      console.log(response);
      console.log(response2);
      if (response?.status == 200) {
        setAnalysisData(response.data.data);
      } else {
        console.log("--> Error in analysis data fetching");
        showToastMessage();
        setErr(true);
      }
      if (response2?.status == 200) {
        setWindowClosed(response2.data.isWindowClosed);
        window.localStorage.setItem("__wodniw", !response2.data.isWindowClosed);
        setTopperData(response2.data.mockData);
        setLoading(false);
      } else {
        console.log("--> Error in mock status fetching");
        showToastMessage();
        setErr(true);
      }
    } catch (err) {
      console.log(err);
      showToastMessage(err?.response?.data?.message);
      setErr(true);
    }
  };

  const handlePageClick = () => {
    if (menuBarOpen) {
      setMenuBarOpen(false);
    }
  };

  // const openDesktopView = () => {
  //   const isChrome =
  //     /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  //   if (isChrome) {
  //     navigate(previousLocation);
  //     const url = window.location.href.replace("m.", "");
  //     window.location.href = url;
  //   }
  // };

  // function  for disable the right click and inspect panel from keyboard

  //   function handleContextMenu(event) {
  //   event.preventDefault();
  // }

  // function handleKeyDown(event) {
  //   if (event.ctrlKey && event.shiftKey && event.key === 'I') {
  //     event.preventDefault();
  //   }
  // }

  // useEffect(() => {
  //   document.addEventListener('keydown', handleKeyDown);
  //   document.addEventListener('contextmenu', handleContextMenu);
  //   return () => {
  //     document.removeEventListener('keydown', handleKeyDown);
  //     document.removeEventListener('contextmenu', handleContextMenu);
  //   };
  // }, []);

  const Backdrop = styled(MuiBackdrop)(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  }));

  const showToastMessage = (msg) => {
    toast.error(msg == undefined ? "Some error occurred! Please reload the page." : msg.toUpperCase(), {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  console.log("isloading", isLoading);
  //Set data to variables according to category that data exports to pages according to need
  const basicAnalysis = analysisData[0];
  const overallAnalysis = analysisData[1];
  const sectionWiseAnalysis = analysisData[2];
  const topicWiseAnalysis = analysisData[3];
  const difficulty = analysisData[4];
  const subtopicWiseAnalysis = analysisData[6];

  return (
    <>
      <Context.Provider
        value={{
          basicAnalysis,
          sectionWiseAnalysis,
          subtopicWiseAnalysis,
          topicWiseAnalysis,
          overallAnalysis,
          difficulty,
          analysisDataApi,
          isLoading,
          isErr,
          setMenuBarOpen,
          menuBarOpen,
          handlePageClick,
          Backdrop,
          showToastMessage,
          setLoading,
          topperData,
        }}
      >
        {children}
      </Context.Provider>
    </>
  );
};
