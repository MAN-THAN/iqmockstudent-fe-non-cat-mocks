import React, { useEffect } from "react";
import MenuDrawer from "../Components/MenuDrawer";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../services/Context";
import HeaderNew from "../Components/HeaderNew";
import { styled } from "@mui/material/styles";
import Paper, { paperClasses } from "@mui/material/Paper";
import { DetailCards } from "../Common-comp/Card";
import CustomizedAccordions from "../Common-comp/Accordian";
import GoalGraph from "../Common-comp/GoalGraph";
import { getGoalTrackerData } from "../services/Analysis_api";
import YourGraph from "../Common-comp/YourGraph";

export default function GoalTracker() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

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
  // console.log(userData);
  useEffect(() => {
    console.log(a, b, c, d);
    console.log(Number(String(a) + String(b)));
    const newPtle = Number(String(a) + String(b) + "." + String(c) + String(d));
    setPercentile(newPtle);
  }, [a, b, c, d]);

  // console.log(percentile);
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

  const infoStyle = {
    textstyle: {
      fontSize: "10px",
      fontFamily: "var(--font-inter)",
      fontWeight: "bold",
    },
    divStyle: {
      width: "46px",
      height: "11px",
      background: "linear-gradient(180deg, #21D3E7 0%, #0099F4 100%)",
      borderRadius: "20px",
    },
  };

  // api call
  useEffect(() => {
    getData();
  }, []);

  // function for fetching data
  const { attemptId } = useParams();
  const [goalData, setGoalData] = useState([]);
  const [result, setResult] = useState([]);
  const getData = async () => {
    setLoading(true)
    const res = await getGoalTrackerData(attemptId);
    console.log(res);
    if (res?.status == 200) {
      setResult(res.data.goalData);
      setGoalData(res.data.yourData);
      setLoading(false)
    } else {
      console.log("error", res);
      setLoading(false)
    }
  };
  return (
    <Box sx={{ width: "100vw", height: "100vh" }}>
      <Box>
        <MenuDrawer />
      </Box>

      <Box
        sx={{
          ml: "65px",
          background: "url(/GoalTrackerBackground.jpg)",
          backgroundSize: "cover",
          height: "100vh",
          p: 2,
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Header start  */}
        <HeaderNew logoPath={"/iQuantaWhite.png"} style={{ color: "white" }} />

        {/* Header end  */}
         {/* main Section start */}
        {isLoading? 
            <div className="d-flex align-items-center flex-column gap-2 justify-content-center" style={{width:"100%", height:"80%"}}>
            <div class="loading-container">
              <div class="loading"></div>
              <div id="loading-text">Loading...</div>
            </div>
           </div>:
        
         <Box
          component="main"
          sx={{ display: "flex", flexDirection: "column", mt: 2 }}
        >
          {/* Two div */}
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
              <Backdrop
                sx={{
                  zIndex: (theme) => theme.zIndex.drawer - 1,
                  color: "#fff",
                }}
                open={menuBarOpen}
                onClick={() => setMenuBarOpen(false)}
              />
              <DetailCards
                cardContent={<CustomizedAccordions />}
                heading={"Where you went wrong?"}
                logoPath={"/CardsIcons/idea1.png"}
              />
            </Box>

            <Box
              component="div"
              sx={{
                width: 427,
                height: 176,
                borderRadius: "25px",
                background: "white",
                zIndex: 99,
                p: 1,
              }}
            >
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
              width: "95%",
              height: "30em",
              position: "absolute",
              bottom: 0,
            }}
          >
            {/* <YourGraph goalData={goalData} /> */}
            <GoalGraph result={result} />
          </Box>

          {/* Graph end */}
          {/* bottom instuction Card */}
          {/* Add the select field */}

          <Box
            component={Paper}
            sx={{
              width: 265,
              height: 41,
              position: "absolute",
              bottom: 20,
              right: 100,
              borderRadius: "15px ",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              p: 1,
            }}
          >
            <div style={infoStyle.divStyle}></div>
            <Typography sx={infoStyle.textstyle}>Goal</Typography>
            <div
              style={{
                ...infoStyle.divStyle,
                background: "linear-gradient(360deg, #6427D2 0%, #336CF7 100%)",
              }}
            ></div>
            <Typography sx={infoStyle.textstyle}>Selected Mock</Typography>
          </Box>
        </Box>}

        {/* main Section end */}
      </Box>
    </Box>
  );
}

// const DetailCards = ({ heading, cardContent,logoPath }) => {
//   const [isEnlarged, setIsEnlarged] = useState(false);
//   return (
//     <Card
//       className={isEnlarged ? "enlarged" : ""}
//       sx={{
//         overflow: "scroll",
//         width: "100%",
//         height: "100%",
//         borderRadius: "25px",
//         boxShadow: "none",
//       }}
//       // onClick={() => setIsEnlarged(!isEnlarged)}
//     >
//       <CardContent
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           width: "100%",
//           alignItems: "center",
//           fontFamily: "var(--font-inter)",
//         }}
//       >
//         <div className="d-flex">
//           <img
//             src={logoPath}
//             className="img-fluid me-2"
//             alt=""
//             width={22}
//           />
//           <Typography variant="h4" color="black" fontSize={18}>
//             {heading}
//           </Typography>
//         </div>

//         <div>
//           <img
//             src="/CardsIcons/zoom.png"
//             className="img-fluid cursor-pointer"
//             width={22}
//           />
//         </div>
//       </CardContent>

//       <CardContent sx={{ pt: 0 }}>{cardContent}</CardContent>
//     </Card>
//   );
// };
