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


 

  //Timer code

  const [seconds, setSeconds] = useState(2400); // 40 minutes in seconds
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } 
    return () => clearInterval(interval);
  }, [isActive, seconds]);
  // // else if (!isActive && seconds !== 0) {
  //   clearInterval(interval);

  // }

  const startTimer = () => {
    setIsActive(true);
  };

  const stopTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setSeconds(20);
    setIsActive(false);
  };

  return (
    <>
      <Context.Provider
        value={{
          createAttemptId,
          responseReceived,
          attemptID,
          seconds,
          isActive,
          startTimer,
          stopTimer,
          resetTimer,
        }}
      >
        {children}
      </Context.Provider>
    </>
  );
};
