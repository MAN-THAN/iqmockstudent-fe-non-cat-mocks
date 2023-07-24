import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { saveStudentProgress } from "../services/Mock_api";
import { encode, decode } from "base-64";

function Protected(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const { Comp } = props;

  if (!location.state) {
  
    const attemptId = localStorage.getItem("attemptId");
    const mockId = localStorage.getItem("currMockId");
    location.state = { attemptId: attemptId, mockId: mockId };
  }

 // //console.log("Location", location);
 //console.log("Location" , location)
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);

  const handleBeforeUnload = (event) => {
    
    event.preventDefault();
    
    const confirmationMessage =
      "Changes that you made may not be saved. Are you sure you want to leave this page?";

    if (!confirmedNavigation && window.confirm(confirmationMessage)) {
      setConfirmedNavigation(true);
      window.location.href = "https://www.iquanta.in/cat-mock-test";
    } else {
      window.history.pushState(null, document.title, location.href);
    }

    event.returnValue = confirmationMessage; // For Chrome
  };

  useEffect(() => {
    const attemptID = decode(localStorage.getItem("attemptId"));
    if (!attemptID || attemptID === null) {
      navigate("/");
    }

    const handleBeforeUnloadEvent =async (event) => {
      
      if (!confirmedNavigation) {
        event.preventDefault();
        event.returnValue = ""; // For Chrome
        let attempt_id=localStorage.getItem('attemptId');
        let type = localStorage.getItem("sectionType");
        let uid = JSON.parse(localStorage.getItem("userData")).uid;
        
        //let payload = JSON.parse(decodeURIComponent(window.atob(localStorage.getItem("questionStatus"))));
        let payload = JSON.parse(localStorage.getItem("questionStatus"));
        let timer = {minutes:Number(localStorage.getItem("my-counter-min")),seconds:Number(localStorage.getItem("my-counter-sec"))}
        //console.log(attempt_id,"attempt_id");
        await saveStudentProgress(attempt_id,type,payload,uid,timer);
        //localStorage.clear();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnloadEvent);
    window.addEventListener("unload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnloadEvent);
      window.removeEventListener("unload", handleBeforeUnload);
    };
  }, [navigate]);

  useEffect(() => {
    window.history.pushState(null, document.title, location.href);

    window.addEventListener("popstate", function (event) {
      window.history.pushState(null, document.title, location.href);
    });
    return () => {
      window.removeEventListener("popstate", function (event) {
        window.history.pushState(null, document.title, location.href);
      });
    };
  }, []);

  return (
    <div>
      <Comp />
    </div>
  );
}

export default Protected;

