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
import ApexLineChart from "../Common-comp/ApexLineChart";
import { fetchScoreVsPrecentileByMockId } from "../services/Analysis_api";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";

const Sections = [
  { name: "Overall", value: "overall" },
  { name: "VARC", value: "varc" },
  { name: "LRDI", value: "lrdi" },
  { name: "QA", value: "quants" },
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
  { score: 10, percentile: 20 },
  { score: 15, percentile: 30 },
  { score: 20, percentile: 40 },
  { yourscore: 20, yourpercentile: 40 },
  { score: 25, percentile: 50 },

  // Add more data points as needed
];
function getStyles(name, MockName, theme) {
  return {
    fontWeight:
      MockName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ITEM_HEIGHT = 28;
const ITEM_PADDING_TOP = 3;
const MenuProps = {
  disableScrollLock: true,
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 100,
    },
  },
};

function ScoreVsPrecentile() {
  const {
    menuBarOpen,
    setMenuBarOpen,
    Backdrop,
    setLoading,
    isLoading,
    showToastMessage,
    sectionName
  } = useAuth();
  const { attemptId, mockId } = useParams();
  const [mock, setMock] = useState([]); // state for set the particular mock from title in select box
  const [data, setData] = useState([]); // set the main data from api
  const [section, setSections] = useState(); //set the sections varc ,lrdi , quants and overall
  const [titleList, setTitleList] = useState(null); //state for setting the all title list from data
  const [tableHeading, setTableHeading] = useState([
    { name: "% ile" },
    { name: "Overall" },
    { name: "VARC" },
    { name: "LRDI" },
    { name: "QA" },
  ]);
  const [tableData, setTableData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [showGraph, setShowGraph] = useState([]);
  const [studentGraph, setStudentGraph] = useState([]);
  const [MockName, setMockName] = useState([]);
  const isWindow = JSON.parse(window.localStorage.getItem("__wodniw"));
  const [section_Name, setSection_Name] = useState();
  console.log(graphData);
  console.log(mock);
  console.log(titleList);
  console.log(sectionName)

  //  calling api
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const uid = JSON.parse(localStorage.getItem("userData"))?._id;
        const res = await fetchScoreVsPrecentile(mockId, attemptId, uid);
        console.log(res);

        if (res?.status === 200) {
          const updatedData = { ...res.data, tableHeading };
          setData(updatedData);
          setGraphData(res.data.graph?.[res.data.sectionName]);
          setStudentGraph(res.data.studentGraph?.[res.data.sectionName]);
          setTableData(res.data.table.reverse());
          setSection_Name(res.data.sectionName);
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
    getData();
    console.log(isWindow);
  }, []);

  // set the title list from api to set titleList state
  useEffect(() => {
    const setTitle = () => {
      if (Object.keys(data).length > 0) {
        const updatedMockList = data?.allMocklist?.map((e) => ({
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
    // updateTableData(data.tableHeading, bodyData);
  }, [data]);

  // Set graph data
  useEffect(() => {
    const updatedData = data?.graph?.[section];
    const studentupdatedData = data?.studentGraph?.[section];
    setGraphData(updatedData);
    setStudentGraph(studentupdatedData);
  }, [section]);

  // getting score vs percentile data on the basis of mockId
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setMockName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    console.log(value);
    const getDataById = async () => {
      // setLoading(true);
      try {
        const uid = JSON.parse(localStorage.getItem("userData"))?._id;
        const res = await fetchScoreVsPrecentileByMockId(value, attemptId, uid);
        console.log(res);

        if (res?.status === 200) {
          const updatedData = { ...res.data, tableHeading };
          // setData(updatedData);
          setGraphData(res.data.graph?.[res.data.sectionName]);
          setStudentGraph(res.data.studentGraph?.[res.data.sectionName]);
          // setLoading(false);
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
    getDataById();
  };

  console.log("graphData", graphData);
  console.log(section);
  // console.log("titleList", titleList);
  console.log("svsprec", data);
  // console.log("TableData", tableData);

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
                      <SelectBox
                        onSelect={handleChange}
                        mockName={MockName}
                        options={titleList}
                      />
                    )}
                    {/* <MultipleSelect options={Sections} setType={setSections} /> */}
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
                      height: "100%",
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.0 }}
                      style={{ width: "100vw", height: "100%" }}
                    >
                      {/* <LineGraph Data={graphData} xkey={"x"} ykey={"y"} /> */}
                      <ApexLineChart
                        graphData={graphData}
                        studentGraphData={studentGraph}
                      />
                      <Box sx={{ marginLeft: 7 }}>
                        <img
                          src="/Group 316 (1).svg"
                          alt="img"
                          height={15}
                        ></img>
                      </Box>
                    </motion.div>
                  </Box>
                </Box>
                {/* Graph side div end */}

                {/*table side box start*/}
                <Box
                  component={Paper}
                  sx={{
                    flexBasis: "50%",
                    p: 1,
                    height: "90%",
                    boxShadow: 10,
                    borderRadius: 5,
                  }}
                >
                  {tableData && (
                    <Table data={{ headings: tableHeading, body: tableData, sectionName:section_Name }} />
                  )}
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
const SelectBox = ({ onSelect, mockName, options, getPrevMockData }) => {
  const theme = useTheme();
  return (
    <div>
      <FormControl sx={{ m: 1, mt: 0, width: "100%" }}>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={mockName}
          onChange={onSelect}
          sx={{ height: "32px", borderRadius: 2 }}
          MenuProps={MenuProps}
          displayEmpty={true}
          input={
            <OutlinedInput
              sx={{
                width: 127,
                borderRadius: 2,
                height: 32,
                fontSize: "12px",
                fontWeight: 800,
                fontFamily: "var(--font-inter)",
                ".MuiOutlinedInput-notchedOutline": {
                  border: 1,
                  borderColor: "#809EB9",
                },
                "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    border: 1,
                    borderColor: "#809EB9",
                  },
                "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    border: 2,
                    borderColor: "#809EB9",
                  },
              }}
            />
          }
        >
          <MenuItem value="" disabled>
            Select Mock
          </MenuItem>
          {options?.map((item, index) => (
            <MenuItem
              key={index}
              value={item.value}
              style={getStyles(item.value, mockName, theme)}
            >
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default ScoreVsPrecentile;
