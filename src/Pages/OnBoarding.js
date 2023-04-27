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
  const [college, setCollege] = useState(null);
  const [startMock, setStartMock] = useState(false);
  const [a, setA] = useState("099");
  const [d, setD] = useState(0);
  const [e, setE] = useState(0);
  const navigate = useNavigate();


  console.log(college);
  useEffect(() => {
    if (college !== null) {
      setStartMock(true);
    }
  }, [college]);
  // set percentile state
  useEffect(() => {
    console.log(a, d, e);
    // if percentile is 100 then no decimal digits
    if (a === "100") {
      setD(0);
      setE(0);
    }
    const newPtle = Number(String(a) + "." + String(d) + String(e));
    setPercentile(newPtle);
  }, [a, d, e]);

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
        <LoginForm setCollege={setCollege} percentile={percentile} />
      </Box>
      <Box sx={{ position: "absolute", bottom: "10.5%", right: 50 }}>
        {startMock ? (
          <Box>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "right" }}>
              {" "}
              <Button
                startIcon={<img alt="rocket" width="20px" height="20px" src="/rocket.png" />}
                sx={{ background: "linear-gradient(to bottom, #306DF8, #661FCF)" }}
                variant="contained"
                style={{ borderRadius: "25px", padding: "14px" }}
                onClick={handleSubmit}
              >
                Start Mock
              </Button>
            </Box>
            <Box
              sx={{
                width: "34vw",
                height: "12em",
                background: "white",
                borderRadius: "1em",
                padding: "1.5em",
                marginTop: "1em",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <img alt="no image" width="25px" height="25px" src="/school (1).png" />
              <Typography sx={{ color: "black", fontWeight: 800, fontSize: "1em", marginLeft: "2em" }}>B-Schools you can Crack</Typography>{" "}
            </Box>
          </Box>
        ) : (
          <></>
        )}
      </Box>
      <Box sx={{ position: "absolute", right: 200, top: 120, display: "flex", flexDirection: "row", gap: "10px" }}>
        <Box
          sx={{ width: "11.199em", height: "4.87em", background: "white", borderRadius: "10px", paddingLeft: 2, paddingRight: 2, paddingTop: 0.4 }}
        >
          <Box sx={{ display: "flex", flexDirection: "row", gap: "1px" }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <Box sx={{ padding: 1, background: "linear-gradient(180deg, #000000 0%, #686868 100%)", borderRadius: "2px" }}>
                <Typography color="white" fontSize="20px">
                  {a[0]}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1px" }}>
              <img
                src="/IncUp.svg"
                alt="IncArrow"
                width="12px"
                height="12px"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  let num = Number(a);
                  let inc;
                  if (num < 100) {
                    inc = String(num + 1);
                    if (inc.length === 1) {
                      setA("00" + inc);
                    } else if (inc.length === 2) {
                      setA("0" + inc);
                    } else {
                      setA(inc);
                    }
                  }
                }}
              />
              <Box sx={{ padding: 1, background: "linear-gradient(180deg, #000000 0%, #686868 100%)", borderRadius: "2px" }}>
                <Typography color="white" fontSize="20px">
                  {a[1]}
                </Typography>
              </Box>
              <img
                onClick={() => {
                  let num = Number(a);
                  let dec;
                  if (num > 0) {
                    dec = String(num - 1);
                    if (dec.length === 1) {
                      setA("00" + dec);
                    } else if (dec.length === 2) {
                      setA("0" + dec);
                    } else {
                      setA(dec);
                    }
                  }
                }}
                src="/DecDown.svg"
                alt="IncArrow"
                width="12px"
                height="12px"
                style={{ cursor: "pointer" }}
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <Box sx={{ padding: 1, background: "linear-gradient(180deg, #000000 0%, #686868 100%)", borderRadius: "2px" }}>
                <Typography color="white" fontSize="20px">
                  {a[2]}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1px", marginLeft: "7px" }}>
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
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1px" }}>
              <img
                onClick={() => {
                  if (e < 9) {
                    setE(e + 1);
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
                  {e}
                </Typography>
              </Box>
              <img
                onClick={() => {
                  if (e > 0) {
                    setE(e - 1);
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
