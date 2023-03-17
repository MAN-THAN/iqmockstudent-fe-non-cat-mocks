import React, { useState, useContext } from "react";
import request from "./Request";

export const Context = React.createContext();
export function useAuth() {
  return useContext(Context);
}

export const ContextProvider = ({ children }) => {
  const [attemptID, setattemptID] = useState("");
  const [responseReceived, setResponseReceived] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const createAttemptId = () => {
    console.log("create attempt call");
    setButtonLoading(true);
    const jsonData = {
      name: "Gaurav",
      email: "asdnf@gmail.com",
      uid: "2345678098765",
      mockId: `${process.env.REACT_APP_MOCK_ID}`,
    };

    fetch(`${process.env.REACT_APP_BASE_URL}/api/student/v1/mocks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setattemptID(data.attemptId);
        setButtonLoading(false);
        localStorage.setItem("userName", data.name);
        localStorage.setItem("userID", data.uid);
        localStorage.setItem("img_url", data.email);
        return setResponseReceived(true);
      })
      .catch((error) => {
        console.error("Attempt id Response not receive", error);
      });
  };

  const analysisDataApi = async (attemptId) => {
    try {
      const res = await request({
        url: `api/student/v1/analyse/create/${attemptId}`,
        type: "GET",
        headers: { "Content-Type": "application/json" },
      });
      setAnalysisData(res.data.data);
    } catch (error) {
      console.log("Analysis Data api error", error);
    } finally {
      setLoading(false);
    }
  };


 //Set data to vaiables according to category that data exports to pages accordin to need
  const basicAnalysis = analysisData[0];
  const overallAnalysis = analysisData[1];
  const sectionWiseAnalysis = analysisData[2];
  const topicWiseAnalysis = analysisData[3];
  const difficulty = analysisData[4];
 

  return (
    <>
      <Context.Provider
        value={{
          createAttemptId,
          responseReceived,
          attemptID,
          buttonLoading,
          basicAnalysis,
          sectionWiseAnalysis,
          topicWiseAnalysis,
          overallAnalysis,
          difficulty,
          analysisDataApi,
          isLoading,
        }}
      >
        {children}
      </Context.Provider>
    </>
  );
};
