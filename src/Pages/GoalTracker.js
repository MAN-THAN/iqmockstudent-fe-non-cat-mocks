import React, { useEffect } from "react";
import MenuDrawer from "../Components/MenuDrawer";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, OutlinedInput, Typography } from "@mui/material";
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
import LineGraph2 from "../Components/LineGraph2";
import LineGraph3 from "../Components/LineGraph3";
import MultipleSelect from "../Common-comp/SelectField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function GoalTracker() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const { menuBarOpen, setMenuBarOpen, Backdrop, setLoading, isLoading, showToastMessage } = useAuth();

  const [percentile, setPercentile] = useState(90);
  const [userData, setUserData] = useState();
  const [isUserVerified, setUserVerified] = useState(false);
  const [a, setA] = useState(8);
  const [b, setB] = useState(8);
  const [c, setC] = useState(0);
  const [d, setD] = useState(0);
  const navigate = useNavigate();
  const [mockList, setMockList] = useState();
  const [mock, setMock] = useState();
  // const [options, setOptions] = useState([]);
  const options = [{ name: "JKD", value: "jkd" }];
  const [mockIndex, setMockIndex] = useState(0);
  const [defVal, setDefVal] = useState();
  console.log(userData);

  useEffect(() => {
    if (mockList?.length) {
      setMock(mockList[mockIndex]);
    }
  }, [mockIndex]);
  console.log(mock);

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
  const ITEM_HEIGHT = "48";
  const ITEM_PADDING_TOP = 3;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
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
  const [yourData, setYourData] = useState([]);

  const getData = async () => {
    setLoading(true);
    const res = await getGoalTrackerData(attemptId);
    console.log(res);
    if (res?.status == 200) {
      setMockList(res.data.mockWise);
      setYourData(res.data.yourData);
      setLoading(false);
    } else {
      console.log("error", res);
      setLoading(false);
    }
  };
  console.log(goalData);
  console.log(yourData);
  console.log(mockList);

  return (
    <Box sx={{ width: "100vw", height: "100vh" }}>
      <Box>
        <MenuDrawer />
      </Box>

      <Box
        sx={{
          ml: "65px",
          background: isLoading ? "" : "url(/GoalTrackerBackground.jpg)",
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
        {isLoading ? (
          <div className="d-flex align-items-center flex-column gap-2 justify-content-center" style={{ width: "100%", height: "80%" }}>
            <div class="loading-container">
              <div class="loading"></div>
              <div id="loading-text">Loading...</div>
            </div>
          </div>
        ) : (
          <Box component="main" sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
            {/* Two div */}
            <Box component="div" sx={{ display: "flex", gap: 2 }}>
              <Box
                component="div"
                sx={{
                  width: 532,
                  height: 200,
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
                <DetailCards cardContent={<CustomizedAccordions />} heading={"Where you went wrong?"} logoPath={"/CardsIcons/idea1.png"} />
              </Box>

              <Box
                component="div"
                sx={{
                  width: 427,
                  height: 126,
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
                      <Table sx={{ border: "none", borderCollapse: "collapse" }} aria-label="simple table">
                        <TableHead>
                          <TableRow sx={{ fontWeight: "bold", lineHeight: "unset" }}>
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
                          <TableRow sx={{ fontWeight: "bold", lineHeight: "unset" }}>
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
            <Box>
              {" "}
              <Box
                sx={{
                  width: "85%",
                  height: "60%",
                  position: "absolute",
                  bottom: 0,
                  marginTop: 20,
                }}
              >
                {/* YourTargetGraph  */}
                <LineGraph2 percentile={yourData && yourData[0]?.percentile} />
              </Box>
              <Box
                sx={{
                  width: "85%",
                  height: "60%",
                  position: "absolute",
                  bottom: 0,
                }}
              >
                {/* <YourActualGraph> */}
                <LineGraph3 />
              </Box>
              <Box
                sx={{
                  width: "85%",
                  height: "60%",
                  position: "absolute",
                  bottom: 0,
                }}
              >
                {/* <otherMocksGraph> */}
                <LineGraph3 />
              </Box>
            </Box>

            {/* Graph end */}
            {/* bottom instuction Card */}
            {/* Add the select field */}

            <Box>
              {" "}
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
            </Box>
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
            <Box>
              {" "}
              <Box
                sx={{
                  width: 150,
                  height: 41,
                  position: "absolute",
                  bottom: 20,
                  right: 420,
                  borderRadius: "15px ",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  p: 1,
                  backgroundColor: "white",
                }}
              >
                {" "}
                <FormControl
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    columnGap: 3,
                  }}
                >
                  <Select
                    defaultValue={defVal}
                    // value={selected}
                    onChange={(e) => {}}
                    input={
                      <OutlinedInput
                        sx={{
                          width: 127,
                          borderRadius: 2,
                          height: 32,
                          fontSize: "12px",
                          fontWeight: 700,
                          fontFamily: "var(--font-inter)",

                          ".MuiOutlinedInput-notchedOutline": {
                            border: 1,
                            borderColor: "#809EB9",
                          },
                          "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                            border: 1,
                            borderColor: "#809EB9",
                          },
                          "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            border: 2,
                            borderColor: "#809EB9",
                          },
                        }}
                      />
                    }
                    // renderValue={(selected) => {
                    //   if (selected.length === 0) {
                    //     return <em>Select{ " " + type }</em>;
                    //   }

                    //   return selected;
                    // }}
                    MenuProps={MenuProps}
                    inputProps={{ "aria-label": "Select value" }}
                  >
                    <MenuItem value={""} disabled>
                      <em>Select</em>
                    </MenuItem>
                    {options &&
                      options.map((item, _) => (
                        <MenuItem
                          key={item.name}
                          value={item.value}
                          sx={{
                            fontFamily: "var(--font-inter)",
                            fontSize: "11px",
                            fontWeight: "600",
                          }}
                        >
                          {item.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>
        )}

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
