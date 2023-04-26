import React, { useEffect } from "react";
import MenuDrawer from "../Components/MenuDrawer";
import Box from "@mui/material/Box";
import MainHeader from "../Components/MainHeader";
import LineChart1 from "../Components/LineGraph1";
import LoginForm from "../Components/LoginForm";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/Context";
import HeaderNew from "../Components/HeaderNew";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function GoalTracker() {
  const {
    menuBarOpen,
    setMenuBarOpen,
    Backdrop,
    setLoading,
    isLoading,
    showToastMessage,
  } = useAuth();

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
  console.log(userData);
  useEffect(() => {
    console.log(a, b, c, d);
    console.log(Number(String(a) + String(b)));
    const newPtle = Number(String(a) + String(b) + "." + String(c) + String(d));
    setPercentile(newPtle);
  }, [a, b, c, d]);

  console.log(percentile);
  const handleSubmit = () => {
    navigate("/user_authentication", {
      state: {
        name: "manthan",
        email: "xyz@gmail.com",
        uid: "323445343356",
        mockId: "6430e9e837185e086ad69368",
      },
    });
  };
  const [isEnlarged, setIsEnlarged] = useState(false);

  function handleClick() {
    setIsEnlarged(!isEnlarged);
  }
  return (
    // <Box
    //   component="main"
    //   sx={{
    //     height: "100vh",
    //     width: "100vw",
    //     display: "grid",
    //     gridTemplateColumns: "1fr", // Use grid layout with one column
    //     gridTemplateRows: "auto 1fr", // Define rows for header and main section
    //   }}
    // >
    //   <MenuDrawer />
    //   {/* Header */}

    //   {/* Main Section */}
    //   <Box
    //     sx={{
    //       p: 2,
    //       overflow: "hidden",
    //       background: "url(/onboarding_image.png)",
    //       backgroundSize: "cover",
    //       width: "100%",
    //       height: "100%",
    //       backgroundRepeat: "no-repeat",
    //       gridColumn: "1", // Span across one column
    //       gridRow: "2", // Start from second row
    //     }}
    //   >
    //       <Box component="header">
    //     <HeaderNew />
    //   </Box>
    //     {/* Content of main section */}
    //   </Box>
    // </Box>

    <Box sx={{ display: "flex" }}>
      <Box container>
        <Box>
          <MenuDrawer />
        </Box>

        <Box
          sx={{
            ml: "65px",
            background: "url(/onboarding_image.png)",
            backgroundSize: "cover",
            width: "100vw",
            height: "100vh",
            p: 2,
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Header start  */}
          <HeaderNew />
          {/* Header end  */}
          {/* main Section start */}
          <Box
            component="main"
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <Box>
              <div
                className={isEnlarged ? "myDiv enlarged" : "myDiv"}
                onClick={handleClick}
              >
                Click me!
              </div>
            </Box>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                position: "absolute",
                bottom: 0,
              }}
            >
              <LineChart1 percentile={percentile} />
            </Box>

            <Box
              sx={{
                position: "absolute",
                right: 200,
                top: 120,
                display: "flex",
                flexDirection: "row",
                gap: "10px",
              }}
            >
              <Box
                sx={{
                  width: "9.43em",
                  height: "4.87em",
                  background: "white",
                  borderRadius: "10px",
                  paddingLeft: 2,
                  paddingRight: 2,
                  paddingTop: 0.4,
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "row", gap: "1px" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "1px",
                    }}
                  >
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
                    <Box
                      sx={{
                        padding: 1,
                        background:
                          "linear-gradient(180deg, #000000 0%, #686868 100%)",
                        borderRadius: "2px",
                      }}
                    >
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
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "1px",
                    }}
                  >
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
                    <Box
                      sx={{
                        padding: 1,
                        background:
                          "linear-gradient(180deg, #000000 0%, #686868 100%)",
                        borderRadius: "2px",
                      }}
                    >
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
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "1px",
                      marginLeft: "7px",
                    }}
                  >
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
                    <Box
                      sx={{
                        padding: 1,
                        background:
                          "linear-gradient(180deg, #000000 0%, #686868 100%)",
                        borderRadius: "2px",
                      }}
                    >
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
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "1px",
                    }}
                  >
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
                    <Box
                      sx={{
                        padding: 1,
                        background:
                          "linear-gradient(180deg, #000000 0%, #686868 100%)",
                        borderRadius: "2px",
                      }}
                    >
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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
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
          {/* main Section end */}
        </Box>
      </Box>
    </Box>
  );
}
