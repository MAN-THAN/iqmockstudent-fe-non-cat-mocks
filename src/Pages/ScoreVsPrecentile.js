import React, { useEffect, useRef, useState } from "react";
import MenuDrawer from "../Components/MenuDrawer";
import HeaderNew from "../Components/HeaderNew";
import { Box, Typography, Paper } from "@mui/material";
import { typographyStyles } from "../styleSheets/StyleNew";
import MultipleSelect from "../Common-comp/SelectField";
import { motion } from "framer-motion";
import LineGraph from "../Common-comp/LineGraphAcross";
import { useAuth } from "../services/Context";
import { useNavigate, useParams } from "react-router-dom";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { BsSortDown } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import Table from "../Common-comp/Table";
import { fetchScoreVsPrecentile } from "../services/Analysis_api";

const filter1 = [
  { name: "Incorrect", value: "incorrect" },
  { name: "Correct", value: "correct" },
  { name: "Skipped", value: "skipped" },
];

const filter2 = [
  { name: "All Sections", value: "allsections" },
  { name: "VARC", value: "varc" },
  { name: "LRDI", value: "lrdi" },
  { name: "Quants", value: "quants" },
];

const tableHeading = ["%ile", "Overall", "QA", "VA", "lrdi"];
const bodyData = ["%ile", "Overall", "QA", "VA", "lrdi"];
const LineGraphData = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];


function ScoreVsPrecentile() {
  const {
    menuBarOpen,
    setMenuBarOpen,
    Backdrop,
    setLoading,
    isLoading,
    showToastMessage,
  } = useAuth();
  const { attemptId, mockId } = useParams();

const { mocks, setMocks } = useState([]);
const { sections, setSections } = useState([]);
const { data, setData } = useState([]);

  //  calling api
  useEffect(() => {
    const getData = async () => {
      try {
        const uid = JSON.parse(localStorage.getItem("userData"))?._id;
        const res = await fetchScoreVsPrecentile(mockId,attemptId,uid);
        console.log(res);
        setLoading(true);
        if (res?.status === 200) {
          setData(res.data);
          setLoading(false);
        } else {
          console.log("Error in fetching data: ", res);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        showToastMessage(err?.response?.data?.msg);
      }
    };
    const isWindow = JSON.parse(window.localStorage.getItem("__wodniw"));
    console.log(isWindow);
    if (isWindow) {
      showToastMessage("window is open");
    } else {
      getData();
    }
  },[]);

  console.log("svsprec",data)

  return (
    <>
      <ToastContainer />
      <Box component="main" sx={{ height: "100vh" }}>
        <MenuDrawer />

        <Box
          sx={{
            p: 2,
            position: "absolute",
            left: "65px",
            width: "calc(100% - 70px)",
            height: "100%",
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
              <div className="d-flex justify-content-between align-items-center">
                <div className="flex-item flex-fill p-2 ps-0 ">
                  <div>
                    <Typography
                      sx={{
                        ...typographyStyles.mainHeading,
                        lineHeight: 1,
                      }}
                    >
                      Score vs Percentile
                    </Typography>
                  </div>

                  <div className="d-flex gap-3 mt-3">
                    {/* <MultipleSelect options={filter2} setType={setSection} />
                    <MultipleSelect options={topicList} setType={setTopic} /> */}
                  </div>
                </div>
                <div className="flex-item flex-fill p-2 pe-0">
                  <a href="https://www.iquanta.in/" target="_blank">
                    <img
                      src="/scorePrcentile.png"
                      alt="click to go mbr"
                      className="img-fluid"
                      role="button"
                      width={950}
                    />
                  </a>
                </div>
              </div>

              <Box
                component="main"
                sx={{ display: "flex", width: "100%", height: "60Vh", py: 2 }}
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
                    flexBasis: "50%",

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
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.0 }}
                      style={{ width: "100vw", height: "25em" }}
                    >
                      <LineGraph
                        Data={LineGraphData}
                        xkey={"name"}
                        ykey={"uv"}
                      />
                    </motion.div>
                  </Box>
                </Box>
                {/* Graph side div end */}

                {/*table side box start*/}
                <Box
                  sx={{
                    flexBasis: "50%",
                    px: 3,
                    overflow: "scroll",
                    height: "100%",
                    boxShadow: 3,
                  }}
                  component={Paper}
                >
                  <Table data={{ headings: tableHeading, body: bodyData }} />
                </Box>
                {/*Question side box end*/}
              </Box>
            </>
          )}
        </Box>
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

export default ScoreVsPrecentile;
