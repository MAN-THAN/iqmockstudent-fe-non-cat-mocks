import React, { useEffect } from "react";
import MenuDrawer from "../Components/MenuDrawer";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
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
import GoalGraph from "../Common-comp/GoalGraph";

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

  const cellStyle = {
    borderBottom: "none",
    pb: 0,
    lineHeight: "unset",
  };

  return (
      <Box sx={{width:"100vw",height:"100vh"}}>
        <Box>
          <MenuDrawer />
        </Box>

        <Box
          sx={{
            ml: "65px",
            background: "url(/onboarding_image.png)",
            backgroundSize: "cover",
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
                  zIndex: 999,
                  borderRadius: "25px",
                  background: "white",
                  p: 1,
                }}
              >
                <DetailCards
                  cardContent={<CustomizedAccordions />}
                  heading={"Where you went wrong?"}
                />
              </Box>

              <Box
                component="div"
                sx={{
                  width: 427,
                  height: 176,
                  borderRadius: "25px",
                  background: "white",
                  zIndex: 999,
                  p: 1,
                }}
              >
                <DetailCards
                  cardContent={
                    <TableContainer>
                      <Table
                        sx={{ border: "none", borderCollapse: "collapse" }}
                        aria-label="simple table"
                      >
                        <TableHead>
                          <TableRow
                            sx={{ fontWeight: "bold", lineHeight: "unset" }}
                          >
                            <TableCell sx={cellStyle} align="left">
                              1
                            </TableCell>
                            <TableCell sx={cellStyle} align="left">
                              IIM Indore
                            </TableCell>
                            <TableCell sx={cellStyle} align="left">
                              IIM Rokiee
                            </TableCell>
                            <TableCell sx={cellStyle} align="left">
                              FMS
                            </TableCell>
                          </TableRow>
                          <TableRow
                            sx={{ fontWeight: "bold", lineHeight: "unset" }}
                          >
                            <TableCell sx={cellStyle} align="left">
                              1
                            </TableCell>
                            <TableCell sx={cellStyle} align="left">
                              IIM Indore
                            </TableCell>
                            <TableCell sx={cellStyle} align="left">
                              IIM Rokiee
                            </TableCell>
                            <TableCell sx={cellStyle} align="left">
                              FMS
                            </TableCell>
                          </TableRow>
                        </TableHead>
                      </Table>
                    </TableContainer>
                  }
                  heading={"Where you went wrong?"}
                />
              </Box>
            </Box>

            {/* Graph start */}
            <Box
              sx={{
              width:"95%",
              height:"30em",
              position: "absolute",
               bottom:0,
            
             
              }}
            >
              <GoalGraph />
            </Box>
            {/* Graph end */}
          </Box>
          {/* main Section end */}
        </Box>
      </Box>
  
  );
}

const DetailCards = ({ heading, cardContent }) => {
  const [isEnlarged, setIsEnlarged] = useState(false);
  return (
    <Card
      className={isEnlarged ? "enlarged" : ""}
      sx={{
        overflow: "scroll",
        width: "100%",
        height: "100%",
        borderRadius: "25px",
        boxShadow: "none",
      }}
      // onClick={() => setIsEnlarged(!isEnlarged)}
    >
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
         alignItems:"center",
         fontFamily:"var(--font-inter)"
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
            {heading}
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

      <CardContent sx={{pt:0}}>{cardContent}</CardContent>
    </Card>
  );
};
