import React, { useEffect } from "react";
import MenuDrawer from "../Components/MenuDrawer";
import Box from "@mui/material/Box";
import MainHeader from "../Components/MainHeader";
import LineChart1 from "../Components/LineGraph1";
import LoginForm from "../Components/LoginForm";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function OnBoarding() {
  const [percentile, setPercentile] = useState(90);
  const [userData, setUserData] = useState();
  const [isUserVerified, setUserVerified] = useState(false);
  const [a, setA] = useState(8);
  const [b, setB] = useState(8);
  const [c, setC] = useState(0);
  const [d, setD] = useState(0);
  const navigate = useNavigate();
  console.log(userData);
 
  useEffect(() => {
    if (userData) {
      setUserVerified(true);
    }
  }, [userData]);
  // set percentile state
console.log(userData)
  useEffect(() => {
    console.log(a, b, c, d);
    console.log(Number(String(a) + String(b)));
    const newPtle = Number(String(a) + String(b) + "." + String(c) + String(d));
    setPercentile(newPtle);
  }, [a, b, c, d]);

  console.log(percentile);
  const handleSubmit = () => {
    navigate("/user_authentication", {
      state: { name: "manthan", email: "xyz@gmail.com", uid: "323445343356", mockId: "6430e9e837185e086ad69368" },
    });
  };
  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        paddingTop: 6,
        paddingLeft: 6,
        paddingRight: 6,
        width: "100vw",
        height: "100vh",
        background: "url(/onboarding_image.png)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box>
        <MainHeader />
      </Box>
      <Box sx={{ width: "100%", height: "100%" }}>
        <LineChart1 percentile={percentile} />
      </Box>
      <Box sx={{ position: "absolute", top: "17%", zIndex: 100 }}>
        <LoginForm setUserData={setUserData} />
      </Box>
      <Box sx={{ position: "absolute", bottom: "28.5%", right: 50 }}>
        {isUserVerified ? (
          <Button
            startIcon={<img alt="rocket" width="20px" height="20px" src="/rocket.png" />}
            sx={{ background: "linear-gradient(to bottom, #306DF8, #661FCF)" }}
            variant="contained"
            style={{ borderRadius: "25px", padding: "14px" }}
            onClick={handleSubmit}
          >
            Start Mock
          </Button>
        ) : (
          <></>
        )}
      </Box>
      <Box sx={{ position: "absolute", right: 200, top: 120, display: "flex", flexDirection: "row", gap: "10px" }}>
        <Box sx={{ width: "9.43em", height: "4.87em", background: "white", borderRadius: "10px", paddingLeft: 2, paddingRight: 2, paddingTop: 0.4 }}>
          <Box sx={{ display: "flex", flexDirection: "row", gap: "1px" }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1px" }}>
              <img
                src="/IncUp.svg"
                alt="IncArrow"
                width="12px"
                height="12px"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (a < 9) {
                    setA(a + 1);
                  }
                }}
              />
              <Box sx={{ padding: 1, background: "linear-gradient(180deg, #000000 0%, #686868 100%)", borderRadius: "2px" }}>
                <Typography color="white" fontSize="20px">
                  {a}
                </Typography>
              </Box>
              <img
                onClick={() => {
                  if (a > 0) {
                    setA(a - 1);
                  }
                }}
                src="/DecDown.svg"
                alt="IncArrow"
                width="12px"
                height="12px"
                style={{ cursor: "pointer" }}
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1px" }}>
              <img
                src="/IncUp.svg"
                alt="IncArrow"
                width="12px"
                height="12px"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (b < 9) {
                    setB(b + 1);
                  }
                }}
              />
              <Box sx={{ padding: 1, background: "linear-gradient(180deg, #000000 0%, #686868 100%)", borderRadius: "2px" }}>
                <Typography color="white" fontSize="20px">
                  {b}
                </Typography>
              </Box>
              <img
                onClick={() => {
                  if (b > 0) {
                    setB(b - 1);
                  }
                }}
                src="/DecDown.svg"
                alt="IncArrow"
                width="12px"
                height="12px"
                style={{ cursor: "pointer" }}
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1px", marginLeft: "7px" }}>
              <img
                onClick={() => {
                  if (c < 9) {
                    setC(c + 1);
                  }
                }}
                src="/IncUp.svg"
                alt="IncArrow"
                width="12px"
                height="12px"
                style={{ cursor: "pointer" }}
              />
              <Box sx={{ padding: 1, background: "linear-gradient(180deg, #000000 0%, #686868 100%)", borderRadius: "2px" }}>
                <Typography color="white" fontSize="20px">
                  {c}
                </Typography>
              </Box>
              <img
                onClick={() => {
                  if (c > 0) {
                    setC(c - 1);
                  }
                }}
                src="/DecDown.svg"
                alt="IncArrow"
                width="12px"
                height="12px"
                style={{ cursor: "pointer" }}
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1px" }}>
              <img
                onClick={() => {
                  if (d < 9) {
                    setD(d + 1);
                  }
                }}
                src="/IncUp.svg"
                alt="IncArrow"
                width="12px"
                height="12px"
                style={{ cursor: "pointer" }}
              />
              <Box sx={{ padding: 1, background: "linear-gradient(180deg, #000000 0%, #686868 100%)", borderRadius: "2px" }}>
                <Typography color="white" fontSize="20px">
                  {d}
                </Typography>
              </Box>
              <img
                onClick={() => {
                  if (d > 0) {
                    setD(d - 1);
                  }
                }}
                src="/DecDown.svg"
                alt="IncArrow"
                width="12px"
                height="12px"
                style={{ cursor: "pointer" }}
              />
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          {" "}
          <Typography fontSize="16px" fontWeight={600} color="white">
            Set your target
          </Typography>
          <Typography color="#FFC700" fontSize="16px" fontWeight={600}>
            Percentile
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default OnBoarding;
