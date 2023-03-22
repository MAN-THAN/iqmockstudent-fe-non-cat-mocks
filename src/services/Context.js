import React, { useState, useContext } from "react";
import request from "./Request";

export const Context = React.createContext();
export function useAuth() {
  return useContext(Context);
}

export const ContextProvider = ({ children }) => {
  const [analysisData, setAnalysisData] = useState([]);
  const [isLoading, setLoading] = useState(true);

 
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
