import React, { useEffect, useMemo } from "react";
import { useNavigate ,useParams} from "react-router";
import { getAttemptId } from "../services/Mock_api";

const UserAuth = () => {
  const navigate = useNavigate();
   const {name,email,uid}=useParams()


  useEffect(() => {
    userAuthCheck();
  }, []);

  // Function for checking authorising user
  const userAuthCheck = () => {
    const attemptID = JSON.parse(localStorage.getItem("userData"))?.attemptId;
    console.log(attemptID);
    if (attemptID) {
      console.log("userAttemptID", attemptID);
      console.log("go to m0ck page");
      navigate(`/main/${process.env.REACT_APP_MOCK_ID}/varc`);
    } else {
      console.log("you dont have an attempt id");
      createAttemptId();
    }
  };
  // Function for creating attempt id
  const createAttemptId = async () => {
    console.log("creating attemptid");
    const response = await getAttemptId(name,email,uid);
    console.log(response);
    if (response?.status == 200) {
      localStorage.setItem("userData", JSON.stringify(response.data));
      userAuthCheck();
    }
  };

  return (
    <React.Fragment>
      <div style={{ display: "flex",flexDirection:"column", width: "100vw", height: "100vh", justifyContent: "center", alignItems: "center" }}>
      <img src="/AuthLoader.gif"  className="img-fluid"  alt=""  width={150} />
            <h5 className=" text-muted" style={{color:"", textAlign:"center"}}>Authenticating..... Please wait</h5>
      
      </div>
    </React.Fragment>
  );
};
export default UserAuth;
