import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Protected(props) {
  const navigate = useNavigate();
  const params = useParams();
  const { Comp } = props;

  useEffect(() => {
    const attemptID = localStorage.getItem("attemptID");

    if (!attemptID  || attemptID === null) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Comp />
    </div>
  );
}

export default Protected;
