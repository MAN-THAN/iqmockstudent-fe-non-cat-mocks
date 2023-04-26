import React, { useEffect } from "react";
import MenuDrawer from "../Components/MenuDrawer";
import Box from "@mui/material/Box";

import LineChart1 from "../Components/LineGraph1";

import { Button, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/Context";
import HeaderNew from "../Components/HeaderNew";

import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Stack } from "react-bootstrap";
import CustomizedAccordions from "../Common-comp/Accordian";

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

  return (
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
            sx={{ display: "flex", flexDirection: "column", mt: 2 }}
          >
            <Box component="div" sx={{ display: "flex", gap: 2 }}>
              <Box
                component="div"
                sx={{
                  width: 532,
                  height: 269,
                  zIndex: 9999,
                  borderRadius:"25px",
                  background: "white",
                  p:1,
                }}
              >
                <Card
                  className={isEnlarged ? "enlarged" : ""}
                  sx={{
                    overflow: "scroll",
                    
                    width: "100%",
                    height: "100%",
                  //  borderRadius:"25px",
                   boxShadow:"none",
                  }}
                  // onClick={() => setIsEnlarged(!isEnlarged)}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    <div className="d-flex">
                      <img
                        src="/CardsIcons/idea1.png"
                        className="img-fluid me-2"
                        alt=""
                        width={22}
                      />
                      <Typography variant="h4" color="black" fontSize={18}>
                        Where you went wrong?
                      </Typography>
                    </div>

                    <div>
                      <img
                        src="/CardsIcons/zoom.png"
                        className="img-fluid cursor-pointer"
                        width={22}
                      />
                    </div>
                  </CardContent>

                  <CardContent>
                    <CustomizedAccordions />
                  </CardContent>
                </Card>
              </Box>

              <Card
                sx={{
                  width: 427,
                  height: 176,
                  borderRadius: "25px",
                  background: "",
                }} // className={isEnlarged ? "enlarged" : "myDiv"}
                onClick={() => setIsEnlarged(!isEnlarged)}
              >
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Word of the Day
                  </Typography>

                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    adjective
                  </Typography>
                  <Typography variant="body2">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Box>

            {/* Graph start */}
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
            {/* Graph end */}
          </Box>
          {/* main Section end */}
        </Box>
      </Box>
    </Box>
  );
}
