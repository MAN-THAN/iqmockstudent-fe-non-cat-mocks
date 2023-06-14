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

const Sections = [
  { name: "Overall", value: "overall" },
  { name: "VARC", value: "varc" },
  { name: "LRDI", value: "lrdi" },
  { name: "Quants", value: "quants" },
];

const tableHeading = [
  { value: "tablePrecentile", name: "%ile" },
  { value: "overall", name: "Overall" },
  { value: "quants", name: "QA" },
  { value: "varc", name: "VA" },
  { value: "lrdi", name: "lrdi" },
];

const tableRow = [
  100, 99.9, 99.8, 99.7, 99.6, 99.5, 99, 98, 97, 96, 95, 90, 85, 80, 70, 60, 50,
];

const tablePrecentile = tableRow.map((value) => ({ percentile: value }));

console.log(tablePrecentile);

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

  const [mocks, setMock] = useState([]); // state for set the particular mock from title in select box
  const [data, setData] = useState([]); // set the main data from api
  const [section, setSections] = useState([]); //set the sections varc ,lrdi , quants and overall
  const [titleList, setTitleList] = useState(null); //state for setting the all title list from data
  const [tableData, setTableData] = useState({

    head: null,
    body: null,
  });
  const [graphData, setGraphData] = useState([]);

  //  calling api
  useEffect(() => {
    const getData = async () => {
      try {
        const uid = JSON.parse(localStorage.getItem("userData"))?._id;
        const res = await fetchScoreVsPrecentile(mockId, attemptId, uid);
        console.log(res);
        setLoading(true);
        if (res?.status === 200) {
          const updatedData = { ...res.data, tableHeading };
          setData(updatedData);
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
  }, []);

  // set the title list from api to set titleList state
  useEffect(() => {
    const setTitle = () => {
      if (Object.keys(data).length > 0) {
        const updatedMockList = data.allMocklist.map((e) => ({
          name: e.title,
          value: e.mockId,
        }));

        console.log("updated list", updatedMockList);
        setTitleList(updatedMockList);
      }
    };

    setTitle();
    //call table data function
    const bodyData = { ...data.table, tablePrecentile };
    updateTableData(data.tableHeading, bodyData);
  }, [data]);

  const updateTableData = (newHeadData, newBodyData) => {
    const bodyArray = [];

    Object.entries(newBodyData).forEach(([key,value]) => {
      bodyArray.push({[key]:value})
    })

    setTableData({
      head: newHeadData,
      body: bodyArray,
    });
  };

  //Set graph data
  useEffect(() => {
    const updatedData = data.graph?.[section];
    setGraphData({ ...updatedData, tablePrecentile });
  }, [section, data]);

  console.log("graphData", graphData);
  console.log("titleList", titleList);
  console.log("svsprec", data);
  console.log("TableData", tableData);

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
                    {titleList && (
                      <MultipleSelect options={titleList} setType={setMock} />
                    )}
                    <MultipleSelect options={Sections} setType={setSections} />
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
                        xkey={"score"}
                        ykey={"percentile"}
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
                 { tableData && <Table
                    data={{ headings: tableData.head, body: tableData.body }}
                  />}
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

export default ScoreVsPrecentile;
