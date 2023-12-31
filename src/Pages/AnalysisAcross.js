import React, { useEffect, useState, useRef, useCallback } from "react";
import MenuDrawer from "../Components/MenuDrawer";
import HeaderNew from "../Components/HeaderNew";
import { Box, Typography, Stack, Card, CardContent } from "@mui/material";
import { typographyStyles, style } from "../styleSheets/StyleNew";
import MultipleSelect from "../Common-comp/SelectField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useAuth } from "../services/Context";
import { LogoCard } from "../Common-comp/Card";
import { AnalysisAcrossCard } from "../services/DataFiles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";
import { fetchOverallAcross } from "../services/Analysis_api";
import PieGraphNew from "../Common-comp/PieGraphNew";
import ExampleAlignmentButtons from "../Common-comp/RadioView";
import LineGraph from "../Common-comp/LineGraphAcross";
import { motion } from "framer-motion";

const FilterList = ({ mocksList, setIndex, scrollTo }) => {
  const [defaultVal, setDefaultVal] = useState(mocksList[0]?.title);
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">
        {" "}
        <Typography
          variant="paragrapgh"
          sx={{ ...style.subHeading, fontSize: "21.96px", color: "black" }}
        >
          Filter
        </Typography>
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        defaultValue={defaultVal}
        onClick={() => {
          scrollTo("info"); // Replace "divId" with the actual ID of the element to scroll to
        }}
      >
        {mocksList?.map((item, index) => {
          return (
            <FormControlLabel
              onClick={() => setIndex(index)}
              value={item.title}
              control={<Radio />}
              label={item.title}
              key={item.title}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

const GraphLegend = [
  { shade: "#4CAF50", Value: "Correct" },
  { shade: "#2196F3", Value: "Incorrect" },
  { shade: "#FFC107", Value: "Skipped" },
];

const GraphListDetails = [
  { name: "Overall Precentile", value: "overallMocks" },
  { name: "VARC Percentile", value: "varcMocks" },
  { name: "LRDI Percentile", value: "lrdiMocks" },
  { name: "Quants Percentile ", value: "quantsMocks" },
];

const DataTable = ({ data }) => {
  return (
    <TableContainer
      sx={{ p: 2, borderRadius: 4, border: "none", boxShadow: 2 }}
      component={Paper}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {data?.map((row) => (
            <TableRow
              key={row.topic}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell sx={{ fontWeight: "bold", width: "20%" }}>
                {row.topic || row.subtopic}
              </TableCell>
              <TableCell align="left">
                {row.noOfQuestion || row.numberOfQuestions}
              </TableCell>
              <TableCell align="left">
                {row.attempted || row.numberOfAttemptedQuestions}
              </TableCell>
              <TableCell align="left" sx={{ color: "green" }}>
                {row.correct || row.numberOfCorrectAttempt}
              </TableCell>
              <TableCell align="left">
                {row.incorrect || row.numberOfIncorrectAttempt}
              </TableCell>
              <TableCell align="left">
                {row.skipped || row.numberofSkippedQuestion}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const CardStyle = {
  fontSize: 8,
  width: "169px",
  height: "52px",
  display: "flex",
  flexDirection: "row-reverse",
  justifyContent: "flex-end",
  columnGap: 10,
  alignItems: "center",
  alignContent: "center",
};

const cardsColor = ["#FFD800", "#006CFF", "#46CB18"];

function AnalysisAcross() {
  const params = useParams();
  const [type, setType] = useState(localStorage.getItem("sectionType")); // this state for the type of section
  const [mocksList, setMocksList] = useState([]); // This state for setting the filter for left side list
  const [index, setIndex] = useState(0); // state for setting the index
  const [show, setShow] = useState([]); // this state for table data has been showing
  const [view, setView] = useState("Table"); // View setting state graph or table
  const [response, setResponse] = useState([]); // main Data that come from api set in this state
  const [topics, setTopics] = useState([]); // for weak strong and moderate card state
  const [topicsType, setTopicsType] = useState(null); //for topic and subtopic filter state
  const [graph, setGraph] = useState(null); //state for setting the line graph

  const {
    menuBarOpen,
    setMenuBarOpen,
    Backdrop,
    setLoading,
    isLoading,
    showToastMessage,
    sectionName,
  } = useAuth();

  //console.log("SectionNAme", sectionName);

  const scrollableDivRef = useRef(null);

  useEffect(() => {
   
    setShow(mocksList[index]?.data?.[type]);
  }, [index, type, mocksList, graph]);

  useEffect(() => {
    if (response) {
      setGraph(response.overallMocks);
      setType(response.sectionName);
      const topicWiseData = response?.[topicsType] || [];
      setMocksList(topicWiseData);
    }
  }, [topicsType, response]);

  useEffect(() => {
    const uid = JSON.parse(localStorage.getItem("userData"))?._id;
    const fetchData = async (uid, attemptId) => {
      setLoading(true);
      const response = await fetchOverallAcross(uid, attemptId, type);
      //console.log("Analysis across Data", response);
      if (response?.status === 200) {
        setResponse(response.data);
        const topicWiseData = response.data?.[topicsType] || ["topicWise"];
        setMocksList(topicWiseData); //first time data pre setting

        setLoading(false);
      } else {
        showToastMessage();
        setLoading(false);
        return;
      }
    };
    fetchData(uid, params.attemptId);
  }, []);

  useEffect(() => {
    if (response.analysismetrics && type !== null) {
      const newTopics = { weak: [], moderate: [], strong: [] };

      response.analysismetrics[0]?.[response.sectionName].forEach((e) => {
        if (e.accuracy <= 30) {
          newTopics.weak.push({
            title: "Weak",
            icon: "",
            topic: e.topic,
            accuracy: e.accuracy,
          });
        } else if (e.accuracy > 30 && e.accuracy <= 60) {
          newTopics.moderate.push({
            title: "",
            icon: "",
            topic: e.topic,
            accuracy: e.accuracy,
          });
        } else {
          newTopics.strong.push({
            title: "",
            icon: "",
            topic: e.topic,
            accuracy: e.accuracy,
          });
        }
      });

      setTopics(newTopics);
    }
  }, [response, type]);

  const scrollToDiv = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: "smooth" });
  };

  //console.log("Mock List", mocksList);
  //console.log("show", show);
  //console.log("graph", graph);

  return (
    <>
      <Box component="main">
        <MenuDrawer />

        <Box
          sx={{
            position: "absolute",
            left: "65px",
            height: "100vh",
            overflow: "hidden",
            width: "calc(100% - 65px)",
            p: 2,
          }}
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
              <Typography sx={{ fontWeight: 500 }}>
                It may take some longer, Please be patient!
              </Typography>
            </div>
          ) : (
            <>
              {/* Select box */}
              <Box component="div" sx={{ mt: 4 }}>
                {/* <MultipleSelect options={Subjects} setType={setType} /> */}
                <div className="d-flex justify-content-between align-items-center">
                  <Typography
                    sx={{
                      ...typographyStyles.mainHeading,
                      pt: 2,
                    }}
                  >
                    {" "}
                    Analysis Across All Mocks
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems={"center"}
                    sx={{
                      fontFamily: "var(--font-inter)",
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    <span>Change View</span>{" "}
                    <ExampleAlignmentButtons setValue={setView} value={view} />
                  </Stack>
                </div>
              </Box>

              {/* Main Section */}
              <Box
                component="main"
                sx={{
                  display: "flex",
                  width: "calc(100vw - 108px)",
                  height: "70vh",

                  mt: 3,

                  flexWrap: "wrap",
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
                {/*left side Filter div start */}
                <Box
                  sx={{
                    flexBasis: "15%",
                    height: "100%",
                    overflow: "scroll",
                    py: 2,
                    // border: "2px solid #928F8F ",
                  }}
                >
                  <Stack
                    spacing={2}
                    direction="column"
                    useFlexGap
                    flexWrap="wrap"
                  >
                    {show && (
                      <FilterList
                        scrollTo={scrollToDiv}
                        mocksList={mocksList}
                        setIndex={setIndex}
                      />
                    )}
                  </Stack>
                </Box>
                {/* Filter div end */}

                {/*Question side box start*/}
                <Box
                  className={
                    view === "Table" ? "table-section" : "graph-section"
                  }
                  sx={{
                    flexBasis: { xs: "100%", md: "85%" },
                    height: "100%",
                    background: "#F6F7F8",
                    p: 3,
                    borderRadius: "15px",
                    overflow: "scroll",
                  }}
                  ref={scrollableDivRef}
                >
                  {/* Switching sections */}

                  {view === "Table" ? (
                    <>
                      <Stack
                        justifyContent={"center"}
                        my={5}
                        direction="row"
                        id="lineGraph"
                      >
                        <motion.div
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 1.0 }}
                          style={{ width: "80vw", height: "20em" }}
                        >
                          {graph && graph.length > 0 ? (
                            <LineGraph
                              Data={graph}
                              xKey={"name"}
                              ykey={"percentile"}
                            />
                          ) : (
                            <div className="text-center">
                              Graph Data Not Available
                            </div>
                          )}
                        </motion.div>
                      </Stack>
                      <hr />
                      {/* Cards of table*/}
                      <Box
                        component="div"
                        sx={{
                          display: "flex",
                          gap: 2,
                          justifyContent: "space-around",
                          alignItems: "center",
                        }}
                      >
                        {mocksList.length > 0 && (
                          <MultipleSelect
                            options={[
                              { name: "Topics", value: "topicWise" },
                              {
                                name: "Sub-Topics",
                                value: "Subtopic",
                              },
                            ]}
                            setType={setTopicsType}
                          />
                        )}
                        {AnalysisAcrossCard.map((item, _) => (
                          <LogoCard
                            cardTitle={item.title}
                            key={item.id}
                            icon={item.icon}
                            style={CardStyle}
                          />
                        ))}
                      </Box>

                      {/* Table */}
                      <Box component="div" id="info" mt={4}>
                        <Box component="div" id="info" mt={4}>
                          {show && show.length > 0 ? (
                            <DataTable data={show} />
                          ) : (
                            <Card
                              className="text-center w-100"
                              sx={{ padding: 2, borderRadius: 3 }}
                            >
                              <h6 className="pt-2">
                                {topicsType &&
                                  topicsType.charAt(0).toUpperCase() +
                                    topicsType.slice(1).toLowerCase()}{" "}
                                data not available
                              </h6>
                            </Card>
                          )}
                        </Box>
                      </Box>

                      {/* Cards of weak , moderate and  strong */}
                      <Typography
                        sx={{
                          ...typographyStyles.mainHeading,
                          pt: 2,
                        }}
                      >
                        {" "}
                        Analysis Metrics
                      </Typography>
                      <div className="my-2 d-flex justify-content-between">
                        {Object.keys(topics).length > 0 &&
                          ["Weak", "Moderate", "Strong"].map((type, index) => {
                            return (
                              <>
                                <div
                                  className="d-flex flex-column p-2"
                                  key={index}
                                >
                                  <Typography
                                    sx={{
                                      ...typographyStyles.mainHeading,
                                      lineHeight: 4,
                                      fontSize: "17.02px",
                                      pl: 2,
                                    }}
                                  >
                                    {" "}
                                    <span className="me-2">
                                      <img
                                        src={
                                          type === "Weak"
                                            ? "/CardsIcons/broken.png"
                                            : type === "Moderate"
                                            ? "/CardsIcons/flag.png"
                                            : "/CardsIcons/arm.png"
                                        }
                                        width={28}
                                        className="img-fluid"
                                      />
                                    </span>{" "}
                                    {type}
                                  </Typography>
                                  <Card
                                    key={type}
                                    sx={{
                                      minHeight: "19.188em",
                                      minWidth: "17.938em",
                                      backgroundColor:
                                        cardsColor[index % cardsColor.length],
                                      borderRadius: 5,
                                      display: "flex",
                                      flexDirection: "column",
                                      gap: 3,
                                    }}
                                  >
                                    <CardContent>
                                      {topics[type.toLowerCase()].length > 0 ? (
                                        topics[type.toLowerCase()].map(
                                          (item, ind) => (
                                            <motion.div
                                              key={ind}
                                              initial={{
                                                opacity: 0,
                                                scale: 0.5,
                                              }}
                                              animate={{ opacity: 1, scale: 1 }}
                                              transition={{ duration: 0.5 }}
                                            >
                                              <LogoCard
                                                cardTitle={item.topic}
                                                icon={"/Acc.png"}
                                                style={{
                                                  ...CardStyle,
                                                  fontSize: "15px",
                                                  iconSize: 24,
                                                  width: "17.1em",
                                                  marginBottom: "15px",
                                                  justifyContent: "flex-end",
                                                  columnGap: "10px",
                                                  borderRadius: "15px",
                                                }}
                                              />
                                            </motion.div>
                                          )
                                        )
                                      ) : (
                                        <>
                                          {" "}
                                          <LogoCard
                                            cardTitle={"No Topic"}
                                            // icon={"/Acc.png"}
                                            style={{
                                              ...CardStyle,
                                              fontSize: "15px",
                                              iconSize: 24,
                                              width: "17.1em",
                                              marginBottom: "15px",
                                              justifyContent: "flex-end",
                                              columnGap: "10px",
                                              borderRadius: "15px",
                                            }}
                                          />
                                        </>
                                      )}
                                    </CardContent>
                                  </Card>
                                </div>
                              </>
                            );
                          })}
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Graphs view */}

                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.0 }}
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 1,
                          rowGap: 5,
                          justifyContent: "space-around",
                        }}
                      >
                        {show &&
                          show.map((item, ind) => {
                            //console.log(show);
                            return (
                              <Box key={ind}>
                                <Typography
                                  lineHeight={0}
                                  sx={{
                                    ...typographyStyles.subHeading,
                                    textAlign: "center",
                                  }}
                                  color="black"
                                >
                                  {item.topic || item.subtopic}
                                </Typography>
                                <Box sx={{ width: "14em", height: "15em" }}>
                                  <PieGraphNew
                                    data={{
                                      topic: item.topic || item.subtopic,
                                      correct:
                                        item.correct ||
                                        item.numberOfCorrectAttempt,
                                      incorrect:
                                        item.incorrect ||
                                        item.numberOfIncorrectAttempt,
                                      skipped:
                                        item.skipped ||
                                        item.numberofSkippedQuestion,
                                    }}
                                    color={GraphLegend.map((e) => e.shade)}
                                  />
                                </Box>
                              </Box>
                            );
                          })}
                      </motion.div>

                      {show && show.length > 0 ? (
                        <Stack
                          direction="row"
                          spacing={2}
                          justifyContent={"center"}
                          mt={2}
                        >
                          {GraphLegend.map((e, ind) => {
                            return (
                              <div
                                className="d-flex gap-1 align-items-center"
                                key={ind}
                              >
                                <div
                                  style={{
                                    borderRadius: "40%",
                                    height: "24px",
                                    width: "24px",
                                    background: e.shade,
                                  }}
                                ></div>
                                <span
                                  style={{
                                    fontSize: 13,
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 600,
                                  }}
                                >
                                  {e.Value}
                                </span>
                              </div>
                            );
                          })}
                        </Stack>
                      ) : (
                        <div className="text-center pt-5">
                          <h6>
                            {topicsType &&
                              topicsType.charAt(0).toUpperCase() +
                                topicsType.slice(1).toLowerCase()}{" "}
                            data not Available
                          </h6>
                        </div>
                      )}
                    </>
                  )}
                </Box>
              </Box>
              {/*Question side box end*/}
            </>
          )}
        </Box>
      </Box>
    </>
  );
}

export default AnalysisAcross;
