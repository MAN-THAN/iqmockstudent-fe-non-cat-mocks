import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import LoginFormNew from "../Components/LoginFormNew";
import { Typography } from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderNew from "../Components/HeaderNew";
import { DetailCards } from "../Common-comp/Card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getPredictCollege } from "../services/Mock_api";
import PrettoSlider from "../Components/Slider";
import JoyRide from "react-joyride";
import Button from '@mui/material/Button';
import { useSelector } from "react-redux";


function OnBoarding() {
  const [percentile, setPercentile] = useState(90);
  const [college, setCollege] = useState(null);
  const [startMock, setStartMock] = useState(true); //need to change later
  const userData = useSelector((state) => state.userData);
  const navigate = useNavigate();
  const { state } = useLocation();
  const uid = userData?._id;
  const name = userData?.name;
  const email = userData?.email;
  const [expandForm, setExpandForm] = useState(true);
  const [expandPtle, setExpandPtle] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [formData, setFormData] = useState();
  const [isToastDisplayed, setIsToastDisplayed] = useState(false);
  const [isClickDisabled, setIsClickDisabled] = useState(false);
  //console.log(formData);

  const cellStyle = {
    borderBottom: "none",
    pb: 0,
    lineHeight: "unset",
    fontWeight: "bold",
    paddingBottom: "14px",
  };
  const ptle = [
    {
      value: 0,
      label: <Typography sx={{ color: "white", fontSize: 18 }}>0</Typography>,
    },

    {
      value: 60,
      label: <Typography sx={{ color: "white", fontSize: 18 }}>60</Typography>,
    },

    {
      value: 85,
      label: <Typography sx={{ color: "white", fontSize: 18 }}>85</Typography>,
    },
    {
      value: 90,
      label: <Typography sx={{ color: "white", fontSize: 18 }}>90</Typography>,
    },
    {
      value: 95,
      label: <Typography sx={{ color: "white", fontSize: 18 }}>95</Typography>,
    },
    {
      value: 100,
      label: <Typography sx={{ color: "white", fontSize: 18 }}>100</Typography>,
    },
  ];
  //console.log(state.mockId, state.setId);
  //console.log("CKG", college);

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
  //   //console.log(a, d, e);
  //   // if percentile is 100 then no decimal digits
  //   if (a === "100") {
  //     setD(0);
  //     setE(0);
  //   }
  //   const newPtle = Number(String(a) + "." + String(d) + String(e));
  //   setPercentile(newPtle);
  // }, [a, d, e]);

  // //console.log(percentile);
  const handleSubmit = () => {
    if (startMock) {
      navigate("/instructions", {
        state: {
          name: name,
          email: email,
          uid: uid,
          mockId: state.mockId,
          setId: state.setId,
        },
      });
    } else {
      if (isClickDisabled) return;
      toast.info("Please Fill The Details First (If already filled, then click the Next button)", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
      setIsToastDisplayed(true);
      setIsClickDisabled(true);

      // Enable the click after a delay (e.g., 2 seconds)
      setTimeout(() => {
        setIsClickDisabled(false);
      }, 2000);
    }
  };
  const showToastMessage = () => {
    toast.error("Some error occurred! Please try again.", {
      position: toast.POSITION.TOP_CENTER,
    });
    //  return setLoading(false);
  };
  const handlePercentile = async (e) => {
    //console.log("hdfeuw");
    //console.log(e.target.value);
    setPercentile(e.target.value);
    try {
      const uid = userData?._id;
      const res = await getPredictCollege(uid, {
        ...formData,
        minPercentile: e.target.value,
      });
      //console.log(res);
      if (res?.status === 200) {
        let arr = res?.data.bschools;
        const temp_arr = arr;
        setCollege(temp_arr);
      }
    } catch (err) {
      // showToastMessage();
      //console.log(err);
    }
  };
  //console.log("coolr", college);

  // Custom toast content component with a title
  const CustomToastContent = ({ title }) => (
    <div>
      <Typography fontSize={18} color="#4094D2" fontWeight="bold">
        Warning
      </Typography>
      <Typography fontSize={14}>Fill your details first, If its already filled then click the Next button</Typography>
    </div>
  );

  const handleSlider = () => {
    if (isClickDisabled) return;
    if (startMock === false) {
      toast.info(<CustomToastContent title="Warning" />, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "toast-message",
      });
      setIsToastDisplayed(true);
      setIsClickDisabled(true);
    }

    // Enable the click after a delay (e.g., 2 seconds)
    setTimeout(() => {
      setIsClickDisabled(false);
    }, 2000);
  };

  // Tour steps
  const TOUR_STEPS = [
    {
      target: ".login_form",
      content: "Fill your details first, If its already filled then click the Next button on the form",
      disableBeacon: true,
    },
    {
      target: ".set_target_ptle",
      content: "Set your target percentile",
    },
    {
      target: ".college_table",
      content: "Check colleges you can unlock on the basis of your filled data",
    },
    {
      target: ".startMock",
      content: "Now check your preparation, try CAT Mock",
    },
  ];
  return (
    <>
      <ToastContainer />
      <JoyRide
        steps={TOUR_STEPS}
        continuous={true}
        showSkipButton={true}
        showProgress={true}
        styles={{
          tooltipContainer: {
            textAlign: "left",
          },
          buttonNext: {
            backgroundColor: "green",
            outline: "none",
          },
          buttonBack: {
            marginRight: 10,
            color: "gray",
          },
        }}
      />
      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          paddingTop: {xs : 2, sm :4, lg : 4},
          paddingLeft: {xs : 2, sm :6, lg : 6},
          paddingRight: {xs : 2, sm :6, lg : 6},
          width: "100vw",
          height: {xs : "150vh", sm : "150vh", md : "100vh"},
          background: "url(/onboarding_image.png)",
          // overflowX: "hidden",
          // overflowY: "scroll",
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 2,
          }}
        >
          {" "}
          <Box
            sx={{
              display: "flex",
              flexDirection: {xs : "column", sm : "row"},
              width: "100%",
              justifyContent: "space-between",
              gap : 4
            }}
          >
            <Box sx={{ width: {xs : "100%", sm : "100%", md : "40%"}, position: "relative" }} className="login_form">
              <LoginFormNew setCollege={setCollege} percentile={percentile} setFormData={setFormData} />
              {/* <Box sx={{ position: "absolute", top: 40, left: "50%" }} className="login_form"></Box> */}
            </Box>
            <Box sx={{ width: {xs : "100%", sm : "100%", md : "58%"} }}>
              {startMock ? (
                <Box sx={{ width: "100%" }}>
                  <Box
                    sx={{
                      width: "100%",
                      height: "27.5em",
                      background: "white",
                      borderRadius: "1em",
                      padding: "0.5em",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box sx={{ overflow: "scroll" }}>
                      <DetailCards
                        dataLength={college && college.length}
                        logoPath={"/goalSchool.png"}
                        cardContent={
                          <TableContainer>
                            <Table sx={{ border: "none" }} aria-label="simple table">
                              <TableHead>
                                <TableRow
                                  sx={{
                                    fontWeight: 900,
                                    lineHeight: "unset",
                                  }}
                                >
                                  <TableCell
                                    sx={{
                                      fontWeight: "bold",
                                      fontSize: 16.5,
                                    }}
                                    align="left"
                                  >
                                    <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                                      {" "}
                                      <Typography
                                        sx={{
                                          fontWeight: "bold",
                                          fontSize: 16.5,
                                          color: "#676767",
                                        }}
                                      >
                                        Ranking
                                      </Typography>
                                      <img src="/onboarding_arrow.svg" alt="no image" width="10px"></img>
                                    </Box>
                                    {/* <Box sx={{ width: "1.7em" }}></Box> */}
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      fontWeight: "bold",
                                      fontSize: 16.5,
                                      color: "#676767",
                                    }}
                                    align="left"
                                  >
                                    Name
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      fontWeight: "bold",
                                      fontSize: 16.5,
                                      color: "#676767",
                                    }}
                                    align="left"
                                  >
                                    Average Package
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      fontWeight: "bold",
                                      fontSize: 16.5,
                                      color: "#676767",
                                    }}
                                    align="left"
                                  >
                                    Highest Package
                                  </TableCell>
                                </TableRow>

                                {college &&
                                  college.map((item, ind) => {
                                    return (
                                      <TableRow
                                        key={ind}
                                        sx={{
                                          lineHeight: "unset",
                                          borderBottom: "1px solid #E1E1E1",
                                        }}
                                      >
                                        <TableCell sx={{ ...cellStyle, paddingRight: 5 }} align="left">
                                          {ind + 1}
                                        </TableCell>
                                        <TableCell sx={{ cellStyle, fontWeight: 600, width: "40% !important" }} align="left">
                                          {item.name}
                                        </TableCell>
                                        <TableCell sx={cellStyle} align="left">
                                          {item.avgSalary + " LPA" || "tbd"}
                                        </TableCell>
                                        <TableCell sx={cellStyle} align="left">
                                          {item.highestSalary + " LPA" || "tbd"}
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
                    className="college_table"
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: 900,
                          fontSize: "1.5em",
                          color: "#FF074D",
                          paddingLeft: 1,
                        }}
                      >
                        Predict Your B-School
                      </Typography>
                    </Box>
                    <Box>
                      {" "}
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: "1.2em",
                          color: "#5F5F5F",
                          paddingLeft: 1,
                        }}
                      >
                        Fill your details and set your desired percentile to see which
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: "1.2em",
                          color: "#5F5F5F",
                          paddingLeft: 1,
                        }}
                      >
                        B-Schools you can unlock.
                      </Typography>
                    </Box>
                  </Box>
                </>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: "7vh",
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Box>
              {" "}
              <Typography
                sx={{
                  color: "white",
                  fontWeight: 700,
                  fontSize: "1.3em",
                }}
              >
                Set Your Target
              </Typography>
              <Typography
                sx={{
                  color: "#FEBC00",
                  fontWeight: 700,
                  fontSize: "1.3em",
                  marginTop: -0.7,
                }}
              >
                Percentile{" "}
              </Typography>
            </Box>
            <Box sx={{ marginTop: 1 }}>
              {/* <Button onClick={handleSubmit}>Start Mock</Button> */}
              <Button sx={{width : {xs : "10em", sm : "10em", md : "12em"}, height : "3.5em", fontSize : "14px"}} variant="contained" onClick={handleSubmit}>Start Mock</Button>
            </Box>
          </Box>
          <Box onClick={handleSlider} sx={{ marginTop: {xs : 1, sm : 0}, width: "85%" }}>
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
              className="set_target_ptle"
              step={0.1}
              disabled={disabled}
              onChange={(e) => setTimeout(() => handlePercentile(e), 200)}
              valueLabelDisplay={ startMock ? "on" : "off"}
              aria-label="pretto slider"
              defaultValue={percentile}
              setPercentile={setPercentile}
              marks={ptle}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default OnBoarding;
