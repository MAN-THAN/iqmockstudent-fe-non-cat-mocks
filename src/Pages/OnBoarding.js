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

  const cellStyle = {
    borderBottom: "none",
    pb: 0,
    lineHeight: "unset",
  };
  console.log(state.mockId, state.setId);
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
      state: {
        name: name,
        email: email,
        uid: uid,
        mockId: state.mockId,
        setId: state.setId,
      },
    });
  };

  // console.log("coolr", college.bschools);
  return (
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
      }}
    >
      <Box>
        <HeaderNew logoPath={"/iQuantaWhite.png"} style={{ color: "white" }} />
      </Box>
      <Box sx={{ width: "100%", height: "100%" }}>
        <LineChart1 percentile={percentile} />
      </Box>
      <Box sx={{ position: "absolute", top: "15%", zIndex: 100 }}>
        <LoginForm setCollege={setCollege} percentile={percentile} />
      </Box>
      <Box sx={{ position: "absolute", bottom: "10.5%", right: 50 }}>
        {startMock ? (
          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "right",
              }}
            >
              {" "}
              <Button
                startIcon={
                  <img
                    alt="rocket"
                    width="20px"
                    height="20px"
                    src="/rocket.png"
                  />
                }
                sx={{
                  background: "linear-gradient(to bottom, #306DF8, #661FCF)",
                }}
                variant="contained"
                style={{ borderRadius: "25px", padding: "14px" }}
                onClick={handleSubmit}
              >
                Start Mock
              </Button>
            </Box>
            <Box>
              <Box
                sx={{
                  width: "34vw",
                  height: "12em",
                  background: "white",
                  borderRadius: "1em",
                  padding: "1em",
                  marginTop: "1em",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box sx={{ overflow: "scroll" }}>
                  <DetailCards
                    logoPath={"/goalSchool.png"}
                    cardContent={
                      <TableContainer>
                        <Table
                          sx={{ border: "none", borderCollapse: "collapse" }}
                          aria-label="simple table"
                        >
                          <TableHead>
                            <TableRow
                              sx={{
                                fontWeight: 900,
                                lineHeight: "unset",
                              }}
                            >
                              <TableCell
                                sx={{ fontWeight: "bold", fontSize: 15 }}
                                align="left"
                              ></TableCell>
                              <TableCell
                                sx={{ fontWeight: "bold", fontSize: 15 }}
                                align="left"
                              >
                                Name
                              </TableCell>
                              <TableCell
                                sx={{ fontWeight: "bold", fontSize: 15 }}
                                align="left"
                              >
                                Average Package
                              </TableCell>
                              <TableCell
                                sx={{ fontWeight: "bold", fontSize: 15 }}
                                align="left"
                              >
                                Current Package
                              </TableCell>
                            </TableRow>

                            {college &&
                              college.bschools.map((item, ind) => {
                                return (
                                  <TableRow
                                    sx={{
                                      lineHeight: "unset",
                                    }}
                                  >
                                    <TableCell sx={cellStyle} align="left">
                                      {ind + 1}
                                    </TableCell>
                                    <TableCell sx={cellStyle} align="left">
                                      {item.college}
                                    </TableCell>
                                    <TableCell sx={cellStyle} align="left">
                                      {item.avgSalary || "tbd"}
                                    </TableCell>
                                    <TableCell sx={cellStyle} align="left">
                                      {item.currentSalary || "tbd"}
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                          </TableHead>
                        </Table>
                      </TableContainer>
                    }
                    heading={"Where you went wrong?"}
                  />
                </Box>
                {/* <Box>
                  {college?.length &&
                    college.map((e, i) => {
                      console.log(e);
                      return (
                        <>
                          <Typography sx={{ color: "green", fontWeight: 600, fontSize: "1em", marginTop : 2}}>{e}</Typography>
                        </>
                      );
                    })}
                </Box> */}
              </Box>
            </Box>
          </Box>
        ) : (
          <></>
        )}
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
            width: "11.199em",
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
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  padding: 1,
                  background:
                    "linear-gradient(180deg, #000000 0%, #686868 100%)",
                  borderRadius: "2px",
                }}
              >
                <Typography color="white" fontSize="20px">
                  {a[0]}
                </Typography>
              </Box>
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
              <Box
                sx={{
                  padding: 1,
                  background:
                    "linear-gradient(180deg, #000000 0%, #686868 100%)",
                  borderRadius: "2px",
                }}
              >
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  padding: 1,
                  background:
                    "linear-gradient(180deg, #000000 0%, #686868 100%)",
                  borderRadius: "2px",
                }}
              >
                <Typography color="white" fontSize="20px">
                  {a[2]}
                </Typography>
              </Box>
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
              <Box
                sx={{
                  padding: 1,
                  background:
                    "linear-gradient(180deg, #000000 0%, #686868 100%)",
                  borderRadius: "2px",
                }}
              >
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
  );
}

export default OnBoarding;
