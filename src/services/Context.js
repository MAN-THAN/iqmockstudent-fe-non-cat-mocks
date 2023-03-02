import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

export const Context = React.createContext();

export function useAuth() {
  return useContext(Context);
}

export const ContextProvider = ({ children }) => {
 
  const params = useParams();
  const [attemptID, setattemptID] = useState("");
  const [responseReceived, setResponseReceived] = useState(false);

  const createAttemptId = () => {
    console.log("create attempt call")
    const jsonData = {
      name: "Gaurav",
      email: "asdnf@gmail.com",
      uid: "2345678098765",
      mockId: "ruksdjhfjdksfgkdfg",
    };


    fetch(`${process.env.REACT_APP_BASE_URL}:8000/api/student/v1/mocks`, {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setattemptID(data.answersheet._id);
        setResponseReceived(true);
      })
      .catch((error) =>{ console.error("Attempt id Response not receive",error)});
  };


 


  return (
    <>
      <Context.Provider
        value={{
          createAttemptId,
          responseReceived,
          attemptID,
              
        }}
      >
        {children}
      </Context.Provider>
    </>
  );
};
