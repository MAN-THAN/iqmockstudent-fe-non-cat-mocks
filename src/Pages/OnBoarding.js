import React, { useEffect } from "react";
import MenuDrawer from "../Components/MenuDrawer";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import LineChart1 from "../Components/LineGraph1";
import LoginForm from "../Components/LoginForm";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderNew from "../Components/HeaderNew";
import { DetailCards } from "../Common-comp/Card";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Slider from "@mui/material/Slider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getPredictCollege } from "../services/Mock_api";
import { motion } from "framer-motion";
import PrettoSlider from "../Components/Slider";

function OnBoarding() {
  const [percentile, setPercentile] = useState(90);
  const [college, setCollege] = useState(null);
  const [startMock, setStartMock] = useState(false);
  const [a, setA] = useState("099");
  const [d, setD] = useState(0);
  const [e, setE] = useState(0);
  const navigate = useNavigate();
  const { state } = useLocation();
  const uid = JSON.parse(localStorage.getItem("userData"))?._id;
  const mbrId = JSON.parse(localStorage.getItem("userData"))?.uid;
  const name = JSON.parse(localStorage.getItem("userData"))?.name;
  const email = JSON.parse(localStorage.getItem("userData"))?.email;
  const [expandForm, setExpandForm] = useState(true);
  const [expandPtle, setExpandPtle] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [formData, setFormData] = useState();
  console.log(formData);

  const cellStyle = {
    borderBottom: "none",
    pb: 0,
    lineHeight: "unset",
    fontWeight: "bold",
  };
  const ptle = [
    {
      value: 0,
      label: "0",
    },

    {
      value: 60,
      label: "60",
    },

    {
      value: 85,
      label: "85",
    },
    {
      value: 90,
      label: "90",
    },
    {
      value: 95,
      label: "95",
    },
    {
      value: 100,
      label: "100",
    },
  ];
  console.log(state.mockId, state.setId);
  console.log("CKG", college);

  useEffect(() => {
    if (college !== null) {
      setStartMock(true);
      setExpandForm(false);
      setExpandPtle(true);
      setDisabled(false);
    }
  }, [college]);
  // set percentile state
  // useEffect(() => {
  //   console.log(a, d, e);
  //   // if percentile is 100 then no decimal digits
  //   if (a === "100") {
  //     setD(0);
  //     setE(0);
  //   }
  //   const newPtle = Number(String(a) + "." + String(d) + String(e));
  //   setPercentile(newPtle);
  // }, [a, d, e]);

  // console.log(percentile);
  const handleSubmit = () => {
    navigate("/user_authentication", {
      state: {
        name: name,
        email: email,
        uid: uid,
        mockId: state.mockId,
        setId: state.setId,
      },
    });
  };
  const showToastMessage = () => {
    toast.error("Some error occurred! Please try again.", {
      position: toast.POSITION.TOP_CENTER,
    });
    //  return setLoading(false);
  };
  const handlePercentile = async (e) => {
    console.log("hdfeuw");
    console.log(e.target.value);
    try {
      const uid = JSON.parse(localStorage.getItem("userData"))?._id;
      const res = await getPredictCollege(uid, { ...formData, minPercentile: e.target.value });
      console.log(res);
      if (res?.status == 200) {
        setCollege(res?.data);
      }
    } catch (err) {
      // showToastMessage();
      console.log(err);
    }
  };
  // console.log("coolr", college.bschools);

  const handleSlider = () => {
    if (startMock === false) {
      toast.info("Please Fill The Details First ", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
    }
  };
  return (
    <>
      <ToastContainer />
      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          paddingTop: 5,
          paddingLeft: 6,
          paddingRight: 6,
          width: "100vw",
          height: "100vh",
          background: "url(/onboarding_image.png)",
          overflow: "hidden",
          position: "relative",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <Box>
          <HeaderNew logoPath={"/iQuantaWhite.png"} style={{ color: "white" }} />
        </Box>
        {/* <Box sx={{ width: "100%", height: "100%", marginTop: "8em" }}>
        <LineChart1 percentile={percentile} />
      </Box> */}
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 4 }}>
          {" "}
          <Box sx={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
            <Box sx={{ width: "40%" }}>
              <LoginForm setCollege={setCollege} percentile={percentile} setFormData={setFormData} />
            </Box>
            <Box sx={{ width: "55%" }}>
              {startMock ? (
                <Box sx={{ width: "100%" }}>
                  <Box
                    sx={{
                      width: "100%",
                      height: "27.5em",
                      background: "white",
                      borderRadius: "1em",
                      padding: "1em",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box sx={{ overflow: "scroll" }}>
                      <DetailCards
                        logoPath={"/goalSchool.png"}
                        cardContent={
                          <TableContainer>
                            <Table sx={{ border: "none", borderCollapse: "collapse" }} aria-label="simple table">
                              <TableHead>
                                <TableRow
                                  sx={{
                                    fontWeight: 900,
                                    lineHeight: "unset",
                                  }}
                                >
                                  <TableCell sx={{ fontWeight: "bold", fontSize: 15 }} align="center">
                                    Ranking
                                  </TableCell>
                                  <TableCell sx={{ fontWeight: "bold", fontSize: 15 }} align="center">
                                    Name
                                  </TableCell>
                                  <TableCell sx={{ fontWeight: "bold", fontSize: 15 }} align="center">
                                    Average Package
                                  </TableCell>
                                  <TableCell sx={{ fontWeight: "bold", fontSize: 15 }} align="center">
                                    Highest Package
                                  </TableCell>
                                </TableRow>

                                {college &&
                                  college.bschools[0].college.map((item, ind) => {
                                    return (
                                      <TableRow
                                        sx={{
                                          lineHeight: "unset",
                                        }}
                                      >
                                        <TableCell sx={cellStyle} align="center">
                                          {ind + 1}
                                        </TableCell>
                                        <TableCell sx={cellStyle} align="center">
                                          {item}
                                        </TableCell>
                                        <TableCell sx={cellStyle} align="center">
                                          {item.avgSalary || "tbd"}
                                        </TableCell>
                                        <TableCell sx={cellStyle} align="center">
                                          {item.currentSalary || "tbd"}
                                        </TableCell>
                                      </TableRow>
                                    );
                                  })}
                              </TableHead>
                            </Table>
                          </TableContainer>
                        }
                        heading={"B-Schools you can Crack"}
                      />
                    </Box>
                  </Box>
                  {/* <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", marginTop: 2 }}>
                    <Button
                      startIcon={<img alt="rocket" width="20px" height="20px" src="/rocket.png" />}
                      sx={{
                        background: "linear-gradient(to bottom, #306DF8, #661FCF)",
                      }}
                      variant="contained"
                      style={{ borderRadius: "25px", padding: "14px" }}
                      onClick={handleSubmit}
                    >
                      Start Mock
                    </Button>
                  </Box> */}
                </Box>
              ) : (
                <>
                  {" "}
                  <Box
                    sx={{
                      width: "100%",
                      height: "27.5em",
                      background: "white",
                      borderRadius: "1em",
                      padding: "1.5em",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box>
                      <Typography sx={{ fontWeight: 900, fontSize: "1.5em", color: "#FF074D", paddingLeft: 1 }}>Predict Your B-School</Typography>
                    </Box>
                    <Box>
                      {" "}
                      <Typography sx={{ fontWeight: 500, fontSize: "1.2em", color: "#5F5F5F", paddingLeft: 1 }}>
                        Fill your details and set your desired percentile to see which
                      </Typography>
                      <Typography sx={{ fontWeight: 500, fontSize: "1.2em", color: "#5F5F5F", paddingLeft: 1 }}>B-Schools you unlock.</Typography>
                    </Box>
                  </Box>
                </>
              )}
            </Box>
          </Box>
          <Box sx={{ marginTop: 1, width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <Box>
              {" "}
              <Typography
                sx={{
                  color: "white",
                  fontWeight: 700,
                  fontSize: "1.5em",
                }}
              >
                Set Your Target
              </Typography>
              <Typography
                sx={{
                  color: "#FEBC00",
                  fontWeight: 700,
                  fontSize: "1.5em",
                  marginTop: -0.7,
                }}
              >
                Percentile{" "}
              </Typography>
            </Box>
            {startMock ? (
              <Box sx={{ marginTop: 1 }}>
                {/* <Button onClick={handleSubmit}>Start Mock</Button> */}
                <button onClick={handleSubmit} className="custom-btn btn-12">
                  <span>Click!</span>
                  <span>Start Mock</span>
                </button>
              </Box>
            ) : (
              <></>
            )}
          </Box>
          <Box onClick={handleSlider} sx={{ marginTop: 0, width: "85%" }}>
            {/* <Slider
              marks={ptle}
              disabled={disabled}
              defaultValue={percentile}
              aria-label="Default"
              valueLabelDisplay="on"
              onChange={handlePercentile}
              step={0.1}
            /> */}
            <PrettoSlider
              step={0.1}
              disabled={disabled}
              onChange={handlePercentile}
              valueLabelDisplay="on"
              aria-label="pretto slider"
              defaultValue={percentile}
              setPercentile={setPercentile}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default OnBoarding;
