import React, { useState, useContext } from "react";
import { fetchAnalysisData } from "./Analysis_api";
import MuiBackdrop from "@mui/material/Backdrop";
import { styled } from "@mui/material/styles";

export const Context = React.createContext();

export function useAuth() {
  return useContext(Context);
}

export const ContextProvider = ({ children }) => {
  const [analysisData, setAnalysisData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isErr, setErr] = useState(false);

  const [menuBarOpen, setMenuBarOpen] = useState(false); //Globally state for menu bar

  const analysisDataApi = async (attemptId) => {

    const response = await fetchAnalysisData(attemptId);
    console.log(response);
    if (response?.status === 200) {
      setAnalysisData(response.data.data);
      setLoading(false);
    } else {
      console.log("--> Error in analysis data fetching");
      return setErr(true);
    }
  };

  //Function for getting a response from domain and convert to http

  const [content, setContent] = useState("");

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.text();
      setContent(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageClick = () => {
    if (menuBarOpen) {
      setMenuBarOpen(false);
    }
  };

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

  //Set data to variables according to category that data exports to pages accordin to need
  const basicAnalysis = analysisData[0];
  const overallAnalysis = analysisData[1];
  const sectionWiseAnalysis = analysisData[2];
  const topicWiseAnalysis = analysisData[3];
  const difficulty = analysisData[4];

  return (
    <>
      <Context.Provider
        value={{
          basicAnalysis,
          sectionWiseAnalysis,
          topicWiseAnalysis,
          overallAnalysis,
          difficulty,
          analysisDataApi,
          isLoading,
          fetchData,
          isErr,
          setMenuBarOpen,
          menuBarOpen,
          handlePageClick,
          Backdrop,
        }}
      >
        {children}
      </Context.Provider>
    </>
  );
};
