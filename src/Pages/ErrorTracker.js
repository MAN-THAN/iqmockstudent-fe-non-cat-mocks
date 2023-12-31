import React, { useEffect, useRef, useState } from "react";
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
import PieGraph from "../Components/BarGraphErrorTracker";
import { useAuth } from "../services/Context";
import { fetchErrorTracker } from "../services/Analysis_api";
import { useNavigate, useParams } from "react-router-dom";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { BsSortDown } from "react-icons/bs";
import Latex from "react-latex-next";
import {
  IncorrectDetailing,
  CorrectDetailing,
  SkippedDetailing,
} from "../services/DataFiles";
import { ToastContainer, toast } from "react-toastify";
import ErrorPage from "./ErrorPage";
import { decode } from "base-64";

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

const filter1 = [
  { name: "Incorrect", value: "incorrect" },
  { name: "Correct", value: "correct" },
  { name: "Skipped", value: "skipped" },
];

const priorities = [
  { name: "All Questions", value: "All Questions" },
  { name: "Easy", value: "Easy" },
  { name: "Moderate", value: "Moderate" },
  { name: "Hard", value: "Hard" },
];

function ErrorTracker() {
  const { menuBarOpen, setMenuBarOpen, Backdrop, setLoading, isLoading } =
    useAuth();
  const { attemptId, mockId } = useParams();
  const [graphData, setGraphData] = useState([]);
  const [colorDetail, setColorDetail] = useState(null);
  const [priorty, setPriorty] = useState(null);
  const [data, setData] = useState([]); //Main Data store

  const [correction, setCorrection] = useState(); // correct or Incorrect or skipped state
  const [section, setSection] = useState([]); // Section wise filter
  const [topic, setTopic] = useState({}); // topic wise

  const [arr, setArr] = useState([]); //main Data

  const [show, setShow] = useState([]); // changeable state come from filter`
  const [isErr,setIsErr]= useState(false);
  const [errorMsg,setErrorMsg] = useState('');
  const [topicList, setTopicList] = useState([
    { name: "All Topics", value: "all topics" },
  ]);
  const sectionType = localStorage.getItem("sectionType");
  const [colorDetailing, setColorDetailing] = useState(IncorrectDetailing);
  const navigate = useNavigate();
  const ref = useRef(null);

  const SectionsList = [{ name: sectionType, value: sectionType }];

  //  calling api
  useEffect(() => {
    const getData = async () => {
      try {
        const uid = JSON.parse(localStorage.getItem("userData"))?._id;
        const res = await fetchErrorTracker(attemptId, uid);
        //console.log(res);
        setLoading(true);
        if (res?.status === 200) {
          setData(res.data);
          setLoading(false);
        } else if (res?.status === 201) {
          showToastMessage(
            "Review your solution and fill the error tracker to generate your error report"
          );
          setTimeout(
            () => navigate(`/viewsolutions/${mockId}/${attemptId}`),
            3500
          );
          setLoading(false);
        } else {
          //console.log("Error in fetching data: ", res);
          setLoading(false);
        }
      } catch (err) {
        //console.log(err);
        setLoading(false);
        showToastMessage(err?.response?.data?.msg);
      }
    };
    getData();
  }, []);

  // set the  subTopics or section:
  useEffect(() => {
    let graphData;
    if (correction === "correct") {
      setColorDetailing(CorrectDetailing);
      graphData = data.sectionsCorrectGraph;
    } else if (correction === "incorrect") {
      setColorDetailing(IncorrectDetailing);
      graphData = data.sectionsIncorrectGraph;
    } else if (correction === "skipped") {
      setColorDetailing(SkippedDetailing);
      graphData = data.sectionsSkippedGraph;
    }

    setGraphData(graphData);
  }, [correction, data]);

  useEffect(() => {
    const topicArr = [];
    if (data || data.length > 0) {
      setArr(data.sections);
    }

    const arr = data?.["sectionsTopic"];
    arr?.forEach((item) => {
      if (!topicArr.includes(item)) {
        topicArr.push(item);
      }
    });

    const newArr = [{ name: "All Topics", value: "all topics" }];
    topicArr.forEach((item) => {
      newArr.push({ name: item, value: item });
    });

    //console.log(newArr);
    setTopicList(newArr);
  }, [section, data]);

  // update the "show" state whenever the filters change

  function filterData() {
    // alert("Enter filterdata");
    // //console.log("array filter", arr);

    if (!arr) {
      //console.log("arr is undefined!");
      return;
    }
    let filteredData = arr;
    if (correction && correction !== "all") {
      filteredData = filteredData.filter(
        (item) => item.isCorrect === correction
      );
    }

    // if (section) {
    //   filteredData = filteredData?.map((item) => item);
    // }

    if (topic && topic !== "all topics") {
      filteredData = filteredData.filter((item) => item.topic === topic);
    }

    switch (priorty) {
      case "All Questions":
        filteredData = filteredData.filter((item) => item);
        break;
      case "Easy":
        filteredData = filteredData.filter(
          (item) => item.difficulty === priorty
        );
        break;

      case "Moderate":
        filteredData = filteredData.filter(
          (item) => item.difficulty === priorty
        );
        break;

      case "Hard":
        filteredData = filteredData.filter(
          (item) => item.difficulty === priorty
        );
        break;

      default:
        break;
    }

    handleColorDetail("all");
    setShow(filteredData);
  }

  const handleColorDetail = (val) => {
    setColorDetail(val);
    if (arr.length > 0) {
      if (val === "all") {
        filterData = arr.filter((item) => item.isCorrect === correction);
        setShow(filterData);
      } else {
        const filterData = arr.filter((item) => item.error === val);
        setShow(filterData);
      }
    }
  };

  
  // //console.log(graphData && graphData[0], "graphData");

  useEffect(filterData, [arr, correction, section, topic, priorty]);
  const showToastMessage = (msg) => {
    // toast.error(
    //   msg == undefined ? "Some error occurred! Please reload the page." : msg,
    //   {
    //     position: toast.POSITION.TOP_CENTER,
    //   }
    // );
    setIsErr(true);
    setErrorMsg(msg);
    //return (ref.current.style.display = "none");
  };


  return (
    <>
      <ToastContainer />
      <Box component="main" sx={{ height: "100vh" }}>
        <MenuDrawer />

       {isErr==true?<ErrorPage errorMessage={errorMsg}/>: <Box
          sx={{
            p: 2,
            position: "absolute",
            left: "65px",
            width: "calc(100% - 70px)",
            height: "100%",
          }}
          ref={ref}
        >
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
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "30%",
                  mt: 4,
                }}
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
                    <MultipleSelect
                      options={SectionsList}
                      setType={setSection}
                    />
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
                   {graphData?.length > 0 &&Object.values(graphData[0]).some(itm=>itm>0) ? (
                        <PieGraph
                          Data={graphData && graphData[0]}
                          width={"97%"}
                          legend={false}
                        />
                      ) : (
                        <Card
                          sx={{
                            height: "20em",
                            // mr: 2,
                            color: "grey",
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                            justifyContent: "center",
                            textAlign: "center",
                            mt:2
                          }}
                        >
                          <CardContent>
                            Please fill the data in analysis tab <br></br>to
                            generate the over the report here...
                          </CardContent>
                        </Card>
                      )}
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    <Typography
                      sx={{
                        ...typographyStyles.subHeading,
                        ml: 2,
                        mb: 1,
                        fontWeight: "700",
                        fontSize: "18px",
                      }}
                    >
                      {`(${
                        correction &&
                        correction.charAt(0).toUpperCase() + correction.slice(1)
                          ? correction.charAt(0).toUpperCase() +
                            correction.slice(1)
                          : ""
                      } Questions: ${
                        graphData &&
                        graphData[0] &&
                        Object.values(graphData[0]).reduce(
                          (acc, curr) => acc + curr,
                          0
                        )
                      })`}
                    </Typography>

                    {<GraphComp colorDetailing={colorDetailing} />}
                  </Box>
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
                        {colorDetailing &&
                          colorDetailing.map((item, ind) => {
                            return (
                              <Tooltip title={item.value} placement="top" arrow>
                                <div
                                  key={ind}
                                  onClick={() => {
                                    // section !== "allsections" && setArr(data[section]);
                                    handleColorDetail(item.value);
                                  }}
                                  style={{
                                    background: item.color,
                                    width: colorDetail === item.value ? 29 : 26,
                                    height:
                                      colorDetail === item.value ? 29 : 26,
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
                              </Tooltip>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                  {show.length>0
                    ? show.map((item, index) => {
                        const colorObj = colorDetailing.find(
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
                                background: "#eaeaea",
                                p: 2,
                                boxShadow: "none",
                                color: "black",
                                borderLeft: "8px solid",
                                borderRadius: "5px 10px 10px 5px",
                                borderColor: borderColor,
                                width: "100%",
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
                                    Avg Time :{" "}
                                    <span>{item.averageDuration}</span>
                                  </Button>
                                </Box>
                                <div>
                                  <Button
                                    size="medium"
                                    endIcon={<IoIosArrowForward />}
                                    sx={{ background: "#3A36DB", float: "end" }}
                                    variant="contained"
                                    onClick={() =>
                                      navigate(
                                        `/viewsolutions/${mockId}/${attemptId}`,
                                        {
                                          state: {
                                            _id: item.question_id,
                                          },
                                        }
                                      )
                                    }
                                  >
                                    Solution
                                  </Button>
                                </div>
                              </CardActions>
                            </Card>
                          </Box>
                        );
                      })
                    : <Card
                    sx={{
                      height: "20em",
                      mr: 2,
                      color: "grey",
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      justifyContent: "center",
                      textAlign: "center",
                      mt:3
                      
                    }}
                  >
                    <CardContent>
                      Please fill the data in analysis tab <br></br>to
                      generate the over the report here...
                    </CardContent>
                  </Card>}
                </Box>
                {/*Question side box end*/}
              </Box>
            </>
          )}
        </Box>}
      </Box>
    </>
  );
}

const GraphComp = ({ colorDetailing }) => {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
      {colorDetailing &&
        colorDetailing.slice(1).map((item, _) => {
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
              <Typography variant="paragraph">{item.value}</Typography>
            </Box>
          );
        })}
    </Box>
  );
};

export default ErrorTracker;
