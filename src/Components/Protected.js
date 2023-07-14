import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { saveStudentProgress } from "../services/Mock_api";
import { encode, decode } from "base-64";

function Protected(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const { Comp } = props;

  if (location.state) {
    localStorage.setItem("sectionType", encode(location.state.type));
  } else if (!location.state) {
    //alert("else executed");
    const secType = decode(localStorage.getItem("sectionType"));
    const mockId = decode(localStorage.getItem("currMockId"));
    location.state = { type: secType, mockId: mockId };
  }

 // console.log("Location", location);

  const [confirmedNavigation, setConfirmedNavigation] = useState(false);

  const handleBeforeUnload = (event) => {
    
    event.preventDefault();
    alert('!!');
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

    const handleBeforeUnloadEvent = (event) => {
      
      if (!confirmedNavigation) {
        event.preventDefault();
        event.returnValue = ""; // For Chrome
        let attempt_id=decode(localStorage.getItem('attemptId'));
        let type = decode(localStorage.getItem('sectionType'));
        let uid = JSON.parse(decode(localStorage.getItem("userData"))).uid;
        
        let payload = JSON.parse(decodeURIComponent(window.atob(localStorage.getItem("questionStatus"))));
        let timer = {minutes:Number(localStorage.getItem("my-counter-min")),seconds:Number(localStorage.getItem("my-counter-sec"))}

        saveStudentProgress(attempt_id,type,payload,uid,timer);
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

