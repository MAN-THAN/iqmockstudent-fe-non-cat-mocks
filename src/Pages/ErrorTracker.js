import React, { useEffect, useState } from "react";
import MenuDrawer from "../Components/MenuDrawer";
import HeaderNew from "../Components/HeaderNew";
import { Box, Typography } from "@mui/material";
import { typographyStyles } from "../styleSheets/StyleNew";
import MultipleSelect from "../Common-comp/SelectField";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { IoIosArrowForward } from "react-icons/io";
import Button from "@mui/material/Button";
import BarGraph from "../Components/BarGraphErrorTracker";
import { useAuth } from "../services/Context";
import { graphinstructionPoints } from "../services/DataFiles";
import { fetchErrorTracker } from "../services/Analysis_api";
import { useParams } from "react-router";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import { BsSortDown } from "react-icons/bs";
import Latex from "react-latex-next";
import { Filter } from "@mui/icons-material";

const disableStyle = {
  ":disabled": {
    backgroundColor: "#E5E5E9",
    color: "black",
    fontWeight: 600,
    fontSize: 13,
    borderRadius: "5px",
    fontFamily: "var( --font-inter)",
    "& > span": {
      // apply style to child span element
      color: "green",
    },
  },
};

const GraphComp = () => {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
      {graphinstructionPoints.map((item, _) => {
        return (
          <Box
            component="item"
            sx={{
              display: "flex",

              p: 1,
              flexBasis: "50%",
              textAlign: "left",
            }}
          >
            <Box
              sx={{
                bgcolor: item.color,
                borderRadius: "50%",
                marginRight: "5px",
                width: "21px",
                height: "21px",
              }}
            ></Box>
            <Typography variant="paragraph">{item.description}</Typography>
          </Box>
        );
      })}
    </Box>
  );
};

const ColorDetailing = [
  {
    id: 0,
    color: " linear-gradient(180deg, #48E5DD 0%, #484EE5 100%)",
    value: "all",
  },
  {
    id: 1,
    color: "#48E5DD",
    value: "Did not understand the concept",
  },
  {
    id: 2,
    color: "#FF6CB6",
    value: "I understood the concept but failed to apply it correctly",
  },

  { id: 3, color: "#FFBC5E", value: "I misread the question" },
  { id: 4, color: "#4732CC", value: "I ran out of time" },
  { id: 5, color: "#1D9374", value: "I made a silly mistake" },
  {
    id: 6,
    color: "#FF6238",
    value: "I fell for the trap answer",
  },
  { id: 7, color: "#1D5C81", value: "I guessed the answer" },
];

const filter1 = [
  { name: "All Questions", value: "all" },
  { name: "Incorrect", value: "incorrect" },
  { name: "Correct", value: "correct" },
];

const filter2 = [
  { name: "VARC", value: "varc" },
  { name: "LRDI", value: "lrdi" },
  { name: "Quants", value: "quants" },
];


const priorities=[

  {name:"Low to High" , value:"lowtohigh"},
  {name:"High to Low" , value:"hightolow"},
]

function ErrorTracker() {
  const { menuBarOpen, setMenuBarOpen, Backdrop, setLoading, isLoading } =
    useAuth();
  const { attemptId } = useParams();
  const [graphData, setGraphData] = useState([]);
  const [colorDetail, setColorDetail] = useState(null);
   const[priorty,setPriorty]=useState(null)
  const [data, setData] = useState([]); //Main Data store

  const [correction, setCorrection] = useState(); // correct or Inncorect
  const [section, setSection] = useState(); // Section wise filter
  const [topic, setTopic] = useState({}); // topic wise

  const [arr, setArr] = useState([]); //main Data

  const [show, setShow] = useState([]); // changeable state come from filter`

  const [topicList, setTopicList] = useState([
    { name: "All Topics", value: "all topics" },
  ]);

  // setting topic list
  useEffect(() => {
    console.log(data);
    const arr = data?.[section + "Topic"];
    console.log(arr);
    const newArr = [{ name: "All Topics", value: "all topics" }];
    arr?.map((item, index) => {
      newArr.push({ name: item, value: item });
    });
    console.log(newArr);
    return setTopicList(newArr);
  }, [section, data]);

  console.log("Topic", topic);

  useEffect(() => {
    const getData = async () => {
      const res = await fetchErrorTracker(attemptId);
      setLoading(true);
      if (res?.status === 200) {
        setData(res.data);
        setLoading(false);
      } else {
        console.log("Error fetching data: ", res);
        setLoading(false);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (data.graph) {
      setGraphData(data.changedGraph[0]);
    }
    if (data[section] && data[section].length > 0) {
      setArr(data[section]);
    }
  }, [data, section]);

  // update the "show" state whenever the filters change


useEffect(() => {
  let filteredData = arr;

  if (correction && correction !== "all") {
    filteredData = filteredData.filter(item => item.isCorrect === correction);
  }

  if (section) {
    filteredData = filteredData.map(item => item);
  }

  if (topic && topic !== "all topics") {
    filteredData = filteredData.filter(item => item.topic === topic);
  }

  console.log("first", filteredData)

  switch (priorty) {
    case "hightolow":
      filteredData.sort((a, b) => {
        if (a.difficulty === b.difficulty) {
          return 0;
        }
        if (a.difficulty === "Easy") {
          return 1;
        }
        if (a.difficulty === "Moderate") {
          if (b.difficulty === "Easy") {
            return -1;
          }
          return 1;
        }
        if (a.difficulty === "Hard") {
          return -1;
        }
      });
      break;

    case "lowtohigh":
      filteredData.sort((a, b) => {
        if (a.difficulty === b.difficulty) {
          return 0;
        }
        if (a.difficulty === "Easy") {
          return -1;
        }
        if (a.difficulty === "Moderate") {
          if (b.difficulty === "Easy") {
            return 1;
          }
          return -1;
        }
        if (a.difficulty === "Hard") {
          return 1;
        }
      });
      break;

    default:
      break;
  }

  setShow(filteredData);
}, [correction, section, topic, arr, priorty]);

  
  

  const handleColorDetail = (val) => {
    setColorDetail(val);
    if (val === "all") {
      setShow(arr);
    } else {
      const filterData = arr.filter((item) => item.error === val);
      setShow(filterData);
    }
  };

 

  console.log("arr", arr);
  console.log("data", data);
  console.log("show", show);
  console.log(topic);

  
  return (
    <Box component="main" sx={{ height: "100vh" }}>
      <MenuDrawer />

      <Box sx={{ p: 2, position: "absolute", left: "70px" }}>
        {/* Header */}
        <Box component="header">
          <HeaderNew />
        </Box>

        {isLoading ? (
          <div
            className="d-flex align-items-center flex-column gap-2 justify-content-center"
            style={{ width: "100%", height: "80%" }}
          >
            <div class="loading-container">
              <div class="loading"></div>
              <div id="loading-text">Loading...</div>
            </div>
          </div>
        ) : (
          <>
            <Box
              component="div"
              sx={{ display: "flex", flexDirection: "row", gap: "30%", mt: 4 }}
            >
              {" "}
              <MultipleSelect options={filter1} setType={setCorrection} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexBasis: "100%",
                  justifyContent: "space-between",
                }}
              >
                <div className="d-flex gap-3">
                  <MultipleSelect options={filter2} setType={setSection} />
                  <MultipleSelect options={topicList} setType={setTopic} />
                </div>
                <div>
                <MultipleSelect options={priorities} setType={setPriorty} />
                </div>
              </Box>
            </Box>

            <Typography
              sx={{
                ...typographyStyles.mainHeading,
                pt: 2,
              }}
            >
              {" "}
              Error Tracker
            </Typography>

            <Box
              component="main"
              sx={{ display: "flex", width: "100%", height: "76Vh" }}
            >
              <Backdrop
                sx={{
                  zIndex: (theme) => theme.zIndex.drawer - 1,
                  color: "#fff",
                }}
                open={menuBarOpen}
                onClick={() => setMenuBarOpen(false)}
              />
              {/* Graph side div start */}
              <Box
                sx={{
                  backgroundColor: "",
                  flexBasis: "40%",
                  borderRight: "2px solid #928F8F ",
                  justifyContent: " ",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    width: "35rem",
                  }}
                >
                  <BarGraph Data={graphData} width={"97%"} legend={false} />
                </Box>
                <Box sx={{ mt: 2 }}>{<GraphComp />}</Box>
              </Box>
              {/* Graph side div end */}

              {/*Question side box start*/}
              <Box
                sx={{
                  flexBasis: "60%",
                  px: 3,
                  overflow: "scroll",
                  height: "100%",
                }}
              >
                {/* Color selection div */}
                <div className="d-flex justify-content-between align-items-center">
                  <Typography
                    sx={{
                      ...typographyStyles.subHeading,
                      alignSelf: "flex-end",
                      fontWeight: "600",
                    }}
                  >
                    Question Summary
                  </Typography>
                  <div>
                    <Typography
                      sx={{
                        lineHeight: 3,
                        fontSize: 11,
                        fontWeight: 400,
                        fontFamily: "var(--font-inter)",
                      }}
                    >
                      Question Selector
                    </Typography>

                    <div className="d-flex gap-3">
                      {ColorDetailing.map((item, ind) => {
                        return (
                          <div
                            key={ind}
                            onClick={() => {
                              setArr(data[section]);
                              handleColorDetail(item.value);
                            }}
                            style={{
                              background: item.color,
                              width: colorDetail === item.value ? 29 : 26,
                              height: colorDetail === item.value ? 29 : 26,
                              borderRadius: "50%",
                              cursor: "pointer",
                              transition: "all 0.2s ease-in-out",
                              boxShadow:
                                colorDetail === item.value
                                  ? "0 0 10px rgba(0, 0, 0, 0.5)"
                                  : "none",
                              border:
                                colorDetail === item.value
                                  ? "0px solid #333"
                                  : "none",
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
                {show &&
                  show.map((item, index) => {
                    const colorObj = ColorDetailing.find(
                      (detail) => item.error === detail.value
                    );

                    const borderColor = colorObj
                      ? colorObj.color
                      : "transparent";

                    return (
                      <Box sx={{ display: "flex", pt: 3, gap: 2 }}>
                        <Card
                          sx={{
                            maxWidth: " 100% ",
                            background: "#F6F7F8",
                            p: 2,
                            boxShadow: "none",
                            color: "black",
                            borderLeft: "8px solid",
                            borderRadius: "5px 10px 10px 5px",
                            borderColor: borderColor,
                          }}
                        >
                          <CardContent sx={{ display: "flex", gap: 2 }}>
                            <Typography
                              sx={{
                                fontFamily: "var(--inter)",
                                fontSize: "19px",
                                fontWeight: 800,
                                lineHeight: "29px",
                                textAlign: "left",
                              }}
                            >
                              Q{index + 1}.
                            </Typography>
                            <div>
                              <Latex>{item.question}</Latex>
                            </div>
                          </CardContent>
                          <CardActions
                            sx={{ justifyContent: "space-between", px: 3 }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                columnGap: 2,
                                flexWrap: "wrap",
                                rowGap: 2,
                              }}
                            >
                              <Button
                                size="medium"
                                disabled={true}
                                variant="contained"
                                sx={{
                                  ...disableStyle,
                                  ":disabled": {
                                    color: "#000000",
                                  },
                                  "& > span": {
                                    color:
                                      item.difficulty === "Easy"
                                        ? "#00C838 !important"
                                        : item.difficulty === "Moderate"
                                        ? "#FF6238"
                                        : "#FF0000",
                                  },
                                }}
                              >
                                Difficulty:<span>{item.difficulty}</span>
                              </Button>
                              <Button
                                size="medium"
                                disabled={true}
                                variant="contained"
                                sx={{
                                  ...disableStyle,
                                  ":disabled": {
                                    color: "#636363",
                                  },
                                  "& > span": {
                                    color: "#000000 !important",
                                  },
                                }}
                              >
                                Time :<span>{item.duration}</span>
                              </Button>
                              <Button
                                disabled={true}
                                sx={{
                                  ...disableStyle,
                                  ":disabled": {
                                    color: "#636363",
                                  },
                                  "& > span": {
                                    color: "black !important",
                                  },
                                }}
                                variant="contained"
                              >
                                Avg Time : <span>{item.averageDuration}</span>
                              </Button>
                            </Box>
                            <div>
                              <Button
                                size="medium"
                                endIcon={<IoIosArrowForward />}
                                sx={{ background: "#3A36DB", float: "end" }}
                                variant="contained"
                              >
                                Solution
                              </Button>
                            </div>
                          </CardActions>
                        </Card>
                      </Box>
                    );
                  })}
              </Box>
              {/*Question side box end*/}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}

const MyStyledSelect = styled(Select)(({ theme, icon }) => ({
  select: {
    paddingRight: theme.spacing(4),
    "& .MuiSelect-icon": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      right: 0,
      top: "50%",
      transform: "translateY(-50%)",
    },
  },
  icon: {
    position: "absolute",
    pointerEvents: "none",
    right: 0,
    top: "50%",
    transform: "translateY(-50%)",
    color: "black",
  },
}));

function MySelectField({ label, value, onChange, options }) {
  const handleSortChange = (event) => {
    const sortOption = event.target.value;
    if (sortOption === "low-to-high") {
      // Sort low to high
      console.log("Low to high selected");
    } else if (sortOption === "high-to-low") {
      // Sort high to low
      console.log("High to low selected");
    } else {
      // No sort selected
      console.log("No sort selected");
    }
  };

  return (
    <FormControl variant="outlined">
      <MyStyledSelect
        value="high-to-low"
        onChange={onChange}
        icon={<BsSortDown />}
        sx={{
          width: "127",
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
          "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              border: 2,
              borderColor: "#809EB9",
            },
        }}
      >
        <MenuItem
          value="low-to-high"
          sx={{
            fontFamily: "var(--font-inter)",
            fontSize: "11px",
            fontWeight: "600",
          }}
        >
          Low to High
        </MenuItem>
        <MenuItem
          value="high-to-low"
          sx={{
            fontFamily: "var(--font-inter)",
            fontSize: "11px",
            fontWeight: "600",
          }}
        >
          High to Low
        </MenuItem>
      </MyStyledSelect>
    </FormControl>
  );
}
export default ErrorTracker;
