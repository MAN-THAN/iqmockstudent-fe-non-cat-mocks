import React, { useState, useContext } from "react";
import { fetchAnalysisData } from "./Analysis_api";
import { useParams } from "react-router-dom";

export const Context = React.createContext();
export function useAuth() {
  return useContext(Context);
}

export const ContextProvider = ({ children }) => {
  const params=useParams()
  const [analysisData, setAnalysisData] = useState([]);
  const [isLoading, setLoading] = useState(true);
 
  
  
  
  
  const analysisDataApi = async (attemptId) => {
    const response = await fetchAnalysisData(attemptId);
    console.log(response);
    if (response?.status === 200) {
      setAnalysisData(response.data.data);
      setLoading(false);
    } else {
      console.log("--> Error in analysis data fetching");
    }
  };



  //Function for getting a response from domain and convert to http

  // const simpleGetQuizs = (myURL) => {
  //    https.get(myURL, function (remoteRes) {
  //     let data = '';
  //     remoteRes.on('data', function (chunk) {
  //       data += chunk;
  //     });
  //     remoteRes.on('end', function () {
  //       res.writeHead(200, { 'Content-Type': 'text/html' });
  //       res.write(data);
  //     return  res.end();

  //     });
  //   }).on('error', function (err) {
  //     res.writeHead(500);
  //    return res.end('Error: ' + err.message);
  //   });
  // }

 

  


  
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
