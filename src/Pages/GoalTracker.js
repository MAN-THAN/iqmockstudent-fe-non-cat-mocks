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
import LineGraph4 from "../Components/LineGraph4";
import { typographyStyles } from "../styleSheets/StyleNew";
import MultipleSelect from "../Common-comp/SelectField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from "recharts";
import { BarChart, CartesianGrid, XAxis, YAxis, Bar } from "recharts";
import { ResponsiveContainer } from "recharts";
import { Tooltip } from "recharts";

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
  const navigate = useNavigate();
  const [mockList, setMockList] = useState();
  const [mockData, setMockData] = useState([]);
  // const [options, setOptions] = useState([]);
  const options = [{ name: "JKD", value: "jkd" }];
  const [mockIndex, setMockIndex] = useState(0);
  const [defVal, setDefVal] = useState("fewf");
  console.log(userData);

  useEffect(() => {
    if (mockList?.length) {
      setMockData(mockList[mockIndex]);
    }
  }, [mockIndex]);
  console.log(mockData);

  useEffect(() => {
    if (userData) {
      setUserVerified(true);
    }
  }, [userData]);

  const cellStyle = {
    borderBottom: "none",
    pb: 0,
    lineHeight: "unset",
  };
  const ITEM_HEIGHT = "48";
  const ITEM_PADDING_TOP = 3;
  const MenuProps = {
    MenuListProps: {
      autoFocusItem: true,
    },
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
  const [weakTopics, setWeakTopics] = useState();
  const [bschool, setBschool] = useState([]);

  const getData = async () => {
    setLoading(true);
    const uid = JSON.parse(localStorage.getItem("userData"))?._id;
    const res = await getGoalTrackerData(attemptId, uid);
    console.log(res);
    if (res?.status == 200) {
      setMockList(res.data.mockWise);
      setYourData(res.data.yourData);
      setGoalData(res.data.goalData);
      setWeakTopics(res.data.weakTopics[0]);
      setBschool(res.data.bschools);
      setDefVal(res.data.mockWise[0].title);
      setMockData(res.data.mockWise[0]);
      setLoading(false);
    } else {
      console.log("error", res);
      setLoading(false);
    }
  };
  // console.log(goalData);
  // console.log(yourData);
  // console.log(mockList);
  console.log(mockList);
  console.log(defVal);
  // console.log(weakTopics);
  console.log(mockIndex);
  console.log(mockData);

  const data = [
    {
      subject: "Math",
      A: 120,
      B: 110,
      fullMark: 150,
    },
    {
      subject: "English",
      A: 86,
      B: 130,
      fullMark: 100,
    },
    {
      subject: "Geography",
      A: 99,
      B: 100,
      fullMark: 100,
    },
  ];
  const data2 = [
    {
      name: "Page A",
      uv: 80,
      pv: 20,
    },
    {
      name: "Page B",
      uv: 90,
      pv: 30,
    },
    {
      name: "Page C",
      uv: 65,
      pv: 60,
    },
  ];

  const renderCustomBarShape = (props) => {
    const { x, y, width, height, fill } = props;

    // Customize the shape of the bar
    const radius = 8;
    const path = `M${x},${y + radius}
                  A${radius},${radius},0,0,1,${x + radius},${y}
                  L${x + width - radius},${y}
                  A${radius},${radius},0,0,1,${x + width},${y + radius}
                  L${x + width},${y + height}
                  L${x},${y + height}
                  Z`;

    return <path d={path} fill={fill} />;
  };

  return (
    <Box sx={{ width: "100vw", height: "200vh" }}>
      <Box>
        <MenuDrawer />
      </Box>

      <Box
        sx={{
          ml: "65px",
          background: isLoading ? "" : "url(/GoalTrackerBackground.jpg)",
          backgroundSize: "cover",
          height: "200vh",
          p: 2,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {/* Header */}
        <Box component="header">
          <HeaderNew logoPath={"/iQuantaWhite.png"} style={{ color: "white" }} />
        </Box>

        {/* Header end  */}
        {/* main Section start */}
        {isLoading ? (
          <div className="d-flex align-items-center flex-column gap-2 justify-content-center" style={{ width: "100%", height: "80vh" }}>
            <div class="loading-container">
              <div class="loading"></div>
              <div id="loading-text">Loading...</div>
            </div>
          </div>
        ) : (
          <Box component="main" sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
            {/* Two div */}
            <Box component="div" sx={{ display: "flex", gap: 2 }}>
              {/* <Box
                component="div"
                sx={{
                  width: 532,
                  height: 220,
                  zIndex: 999,
                  borderRadius: "25px",
                  background: "white",
                  p: 1,
                }}
              >
                <DetailCards
                  cardContent={<CustomizedAccordions data={weakTopics} />}
                  heading={"Where you went wrong?"}
                  logoPath={"/CardsIcons/idea1.png"}
                />
              </Box> */}

              <Box
                component="div"
                sx={{
                  width: "40vw",
                  height: 560,
                  borderRadius: "25px",
                  background: "white",
                  zIndex: 99,
                  p: 1,
                  overflowX: "hidden",
                  position: "absolute",
                  bottom: 50,
                  right: 20,
                }}
              >
                <DetailCards
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
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  gap: 1,
                                }}
                              >
                                {" "}
                                <Typography
                                  sx={{
                                    fontWeight: "bold",
                                    fontSize: 15,
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
                                fontSize: 15,
                                color: "#676767",
                              }}
                              align="left"
                            >
                              Name
                            </TableCell>
                            <TableCell
                              sx={{
                                fontWeight: "bold",
                                fontSize: 15,
                                color: "#676767",
                              }}
                              align="left"
                            >
                              Avg. Package
                            </TableCell>
                          </TableRow>

                          {bschool &&
                            bschool.map((item, ind) => {
                              return (
                                <TableRow
                                  key={ind}
                                  sx={{
                                    lineHeight: "unset",
                                    borderBottom: "1px solid #E1E1E1",
                                  }}
                                >
                                  <TableCell
                                    sx={{
                                      ...cellStyle,
                                      paddingRight: 5,
                                      fontWeight: 600,
                                      paddingTop: "0 !important",
                                    }}
                                    align="left"
                                  >
                                    {ind + 1}
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      cellStyle,
                                      fontWeight: 600,
                                      width: "40% !important",
                                    }}
                                    align="left"
                                  >
                                    {item.name}
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      ...cellStyle,
                                      paddingTop: "0 !important",
                                    }}
                                    align="left"
                                  >
                                    {item.avgSalary + " LPA" || "tbd"}
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                        </TableHead>
                      </Table>
                    </TableContainer>
                  }
                  heading={"B-Schools You Can Crack"}
                />
              </Box>
              <Box
                component="div"
                sx={{
                  width: "40vw",
                  height: 560,
                  borderRadius: "25px",
                  background: "white",
                  zIndex: 99,
                  p: 1,
                  overflowX: "hidden",
                  position: "absolute",
                  bottom: "-93vh",
                  right: 20,
                }}
              >
                <DetailCards
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
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  gap: 1,
                                }}
                              >
                                {" "}
                                <Typography
                                  sx={{
                                    fontWeight: "bold",
                                    fontSize: 15,
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
                                fontSize: 15,
                                color: "#676767",
                              }}
                              align="left"
                            >
                              Name
                            </TableCell>
                            <TableCell
                              sx={{
                                fontWeight: "bold",
                                fontSize: 15,
                                color: "#676767",
                              }}
                              align="left"
                            >
                              Avg. Package
                            </TableCell>
                          </TableRow>

                          {bschool &&
                            bschool.map((item, ind) => {
                              return (
                                <TableRow
                                  key={ind}
                                  sx={{
                                    lineHeight: "unset",
                                    borderBottom: "1px solid #E1E1E1",
                                  }}
                                >
                                  <TableCell
                                    sx={{
                                      ...cellStyle,
                                      paddingRight: 5,
                                      fontWeight: 600,
                                      paddingTop: "0 !important",
                                    }}
                                    align="left"
                                  >
                                    {ind + 1}
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      cellStyle,
                                      fontWeight: 600,
                                      width: "40% !important",
                                    }}
                                    align="left"
                                  >
                                    {item.name}
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      ...cellStyle,
                                      paddingTop: "0 !important",
                                    }}
                                    align="left"
                                  >
                                    {item.avgSalary + " LPA" || "tbd"}
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                        </TableHead>
                      </Table>
                    </TableContainer>
                  }
                  heading={"B-Schools You Missed"}
                />
              </Box>
            </Box>

            {/* Graphs start */}
            <Box>
              {" "}
              <Box
                sx={{
                  position: "absolute",
                  marginTop: 15,
                }}
              >
                <ResponsiveContainer width={700} height={480}>
                  <RadarChart outerRadius={220} data={mockData?.data} legendType="plain">
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" tick={{ fill: "white" }} />
                    {/* <PolarRadiusAxis angle={30} domain={[0, 100]} /> */}
                    <Radar name="Targeted %ile" dataKey="targetPercentile" stroke="#641CFF" fill="#641CFF" fillOpacity={0.6} />
                    <Radar name="Scored %ile" dataKey="scorePercentile" stroke="#59DE66" fill="#59DE66" fillOpacity={0.6} />
                    <Tooltip />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  top: "110vh",
                  marginTop: 20,
                }}
              >
                <BarChart width={730} height={380} data={mockData?.scoreData}>
                  {/* <CartesianGrid strokeDasharray="3 3" /> */}
                  <XAxis dataKey="name" tick={{ fill: "white" }} />
                  <YAxis domain={[0, 100]} tick={{ fill: "white" }} />
                  <Tooltip />
                  <Legend />
                  <Bar barSize={60} dataKey="TargetScore" fill="#641CFF" />
                  <Bar barSize={60} dataKey="YourScore" fill="#59DE66" />
                </BarChart>
              </Box>
            </Box>

            {/* Graph end */}
            {/* bottom instuction Card */}
            {/* Add the select field */}
            {/* <Box
              component={Paper}
              sx={{
                width: 350,
                height: 41,
                position: "absolute",
                bottom: 20,
                right: 50,
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
              <Typography sx={infoStyle.textstyle}>Current Mock</Typography>
              <div
                style={{
                  ...infoStyle.divStyle,
                  background: "linear-gradient(360deg,#BA27D2 0%, #9533F7 100%)",
                }}
              ></div>
              <Typography sx={infoStyle.textstyle}>Selected Mock</Typography>
            </Box> */}
            <Box>
              {" "}
              <Box
                sx={{
                  width: 200,
                  height: 41,
                  position: "absolute",
                  borderRadius: "15px ",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  p: 1,
                  backgroundColor: "white",
                  zIndex: 2000,
                  marginTop: 2,
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

                    input={
                      <OutlinedInput
                        sx={{
                          width: "100%",
                          borderRadius: 2,
                          height: "100%",
                          fontSize: "12px",
                          fontWeight: 700,
                          fontFamily: "var(--font-inter)",

                          ".MuiOutlinedInput-notchedOutline": {
                            border: 1,
                            borderColor: "transparent",
                          },
                          "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                            border: 1,
                            borderColor: "transparent",
                          },
                          "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            border: 2,
                            borderColor: "transparent",
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
                    <MenuItem value={""}>
                      <em>Select</em>
                    </MenuItem>
                    {mockList &&
                      mockList.map((item, ind) => (
                        <MenuItem
                          key={ind}
                          value={item.title}
                          sx={{
                            fontFamily: "var(--font-inter)",
                            fontSize: "11px",
                            fontWeight: "600",
                          }}
                          onClick={(e) => {
                            setMockIndex(ind);
                          }}
                        >
                          {item.title}
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
