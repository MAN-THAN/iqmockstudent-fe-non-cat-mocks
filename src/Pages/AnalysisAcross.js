import React, { useEffect, useState, useRef } from "react";
import MenuDrawer from "../Components/MenuDrawer";
import HeaderNew from "../Components/HeaderNew";
import { Box, Typography, Stack, Item } from "@mui/material";
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

const Subjects = [
  { name: "VARC", value: "varc" },
  { name: "LRDI", value: "lrdi" },
  { name: "Quants", value: "quants" },
];

const GraphListDetails = [
  { name: "Overall Precentile", value: "overallMocks" },
  { name: "VARC Percentile", value: "varcMocks" },
  { name: "LRDI Percentile", value: "lrdiMocks" },
  { name: "Quants Percentile ", value: "quantsMocks" },
];

function AnalysisAcross() {
  const params = useParams();
  const [type, setType] = useState(null);
  const [mocksList, setMocksList] = useState([]);
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState([]);
  const [view, setView] = useState("Table");
  const [response, setResponse] = useState([]);

  const [lineGraph, setLineGraph] = useState([]);

  const [graphList, setGraphList] = useState(null);

  const {
    menuBarOpen,
    setMenuBarOpen,
    Backdrop,
    setLoading,
    isLoading,
    showToastMessage,
  } = useAuth();

  const scrollableDivRef = useRef(null);

  useEffect(() => {
    setLineGraph(response[graphList]);
    setShow(mocksList[index]?.data?.[type]);
  }, [index, type, mocksList, graphList]);

  // useEffect(() => {
  //   if (type === "varc") {
  //     setShow(mocksList[index]?.data?.varc);
  //   }
  //   if (type === "lrdi") {
  //     setShow(mocksList[index]?.data?.lrdi);
  //   }
  //   if (type === "quants") {
  //     setShow(mocksList[index]?.data?.quants);
  //   }
  // }, [type]);

  useEffect(() => {
    const uid = JSON.parse(localStorage.getItem("userData"))?._id;
    const fetchData = async (mockId, uid) => {
      setLoading(true);
      const response = await fetchOverallAcross(mockId, uid);
      console.log(response);
      if (response?.status === 200) {
        setResponse(response.data);
        setMocksList(response.data?.topicWise);
        // setShow(response.data?.topicWise[index].data.varc);
        setLoading(false);
      } else {
        showToastMessage();
        setLoading(false);
        return;
      }
    };
    fetchData(params.mockId, uid);
  }, []);

  const scrollToDiv = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: "smooth" });
  };

  console.log("response", response);
  // console.log("MOCKList", mocksList[0].title);
  console.log("show", show);
  console.log("type", type);
  console.log("index", index);

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
            </div>
          ) : (
            <>
              {/* Select box */}
              <Box component="div" sx={{ mt: 4 }}>
                <MultipleSelect
                  options={Subjects}
                  setType={setType}
                />
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
                      <Stack direction="row" justifyContent={"flex-end"}>
                        <MultipleSelect
                          options={GraphListDetails}
                          setType={setGraphList}
                        />
                      </Stack>
                      <Stack
                        justifyContent={"center"}
                        my={5}
                        direction="row"
                        id="lineGraph"
                      >
                        <Box sx={{ width: "80vw", height: "20em" }}>
                          <LineGraph Data={lineGraph} />
                        </Box>
                      </Stack>
                      <hr />
                      {/* Cards */}
                      <Box
                        component="div"
                        sx={{
                          display: "flex",
                          gap: 2,
                          justifyContent: "flex-end",
                        }}
                      >
                        {AnalysisAcrossCard.map((item, _) => (
                          <LogoCard
                            cardTitle={item.title}
                            key={item.id}
                            icon={item.icon}
                            style={{
                              fontSize: 8,
                              width: "169px",
                              height: "52px",
                              flexBasis: "15%",
                              flexGrow: 0,
                              justifyContent: "center",
                            }}
                          />
                        ))}
                      </Box>

                      {/* Table */}
                      <Box component="div" id="info" mt={4}>
                        <DataTable data={show} />
                      </Box>
                    </>
                  ) : (
                    <>
                      {/* Graphs view */}

                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 1,
                          rowGap: 5,

                          justifyContent: "space-around",
                        }}
                      >
                        {show &&
                          show.map((item, ind) => {
                            console.log(show);
                            return (
                              <Box>
                                <Typography
                                  lineHeight={0}
                                  sx={{
                                    ...typographyStyles.subHeading,
                                    textAlign: "center",
                                  }}
                                  color="black"
                                >
                                  {item.topic}
                                </Typography>
                                <Box sx={{ width: "14em", height: "15em" }}>
                                  <PieGraphNew
                                    data={{
                                      topic: item.topic,
                                      correct: item.correct,
                                      incorrect: item.incorrect,
                                      skipped: item.skipped,
                                    }}
                                    color={GraphLegend.map((e) => e.shade)}
                                  />
                                </Box>
                              </Box>
                            );
                          })}
                      </Box>

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
                {row.topic}
              </TableCell>
              <TableCell align="center">{row.noOfQuestion}</TableCell>
              <TableCell align="center">{row.attempted}</TableCell>
              <TableCell align="center">{row.correct}</TableCell>
              <TableCell align="center">{row.incorrect}</TableCell>
              <TableCell align="center">{row.skipped}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AnalysisAcross;
