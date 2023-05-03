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

const options = [
  { value: "option-1", label: "Option 1" },
  { value: "option-2", label: "Option 2" },
  { value: "option-3", label: "Option 3" },
];

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
    color:" linear-gradient(180deg, #48E5DD 0%, #484EE5 100%)",
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
  { name: "Incorrect", value: "incorrect" },
  { name: "Correct", value: "correct" },
];

const filter3 = [
  { name: "VARC", value: "varc" },
  { name: "LRDI", value: "lrdi" },
  { name: "Quants", value: "quants" },
];
const filter4 = [
  { name: "Reading Comprehension", value: "Reading comprehension" },
  { name: "qde" },
  { name: "dewd" },
];
function ErrorTracker() {
  const { menuBarOpen, setMenuBarOpen, Backdrop, setLoading, isLoading } =
    useAuth();
  const { attemptId } = useParams();
  const [graphData, setGraphData] = useState([]);
  const [colorDetail, setColorDetail] = useState(null);

  const [data, setData] = useState([]);

  const [type1, setType1] = useState();
  const [type3, setType3] = useState();
  const [type4, setType4] = useState();

  const [arr, setArr] = useState([]);
  const [show, setShow] = useState([]);

  // console.log(type1, type3, type4);
  console.log("dataa", arr);
  console.warn("showDtatata", show);

  const handleColorDetail = (val) => {
    setColorDetail(val);
   if(val == "all"){
     setShow(arr)
   }else{
     const FilterData = arr.filter((item) => item.error == val);
     console.log("newData", FilterData);
     setShow(FilterData);

   }
  };

  useEffect(() => {
    getData();
    filterData(type1, type3, type4);
  }, [type1, type3, type4]);

  const getData = async () => {
    const res = await fetchErrorTracker(attemptId, type3);
    setLoading(true);
    if (res?.status == 200) {
      console.log(res);
      setData(res.data);
      setGraphData(res.data.graph);
      setArr(res.data[type3]);
      setShow(res.data.varc);
      setLoading(false);
    } else {
      console.log("error", res);
      setLoading(false);
    }
  };
  function filterData(type1, type3, type4) {
    let result = [];
    arr.map(function (e, i) {
      if (type3 == "quants") {
        if (e.isCorrect == type1 && e.topic == type4) {
          result.push(e);
        }
      }
      if (type3 == "varc") {
        if (e.isCorrect == type1 && e.topic == type4) {
          result.push(e);
        }
      }
      if (type3 == "lrdi") {
        if (e.isCorrect == type1 && e.topic == type4) {
          result.push(e);
        }
      }
    });
    // console.log(result);
    return setShow(result);
  }

  // high low

  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

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
              <MultipleSelect options={filter1} setType={setType1} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexBasis: "100%",
                  justifyContent: "space-between",
                }}
              >
                <div className="d-flex gap-3">
                  <MultipleSelect options={filter3} setType={setType3} />
                  <MultipleSelect options={filter4} setType={setType4} />
                </div>
                <div>
                  <MySelectField
                    label="Select an option"
                    value={selectedOption}
                    onChange={handleOptionChange}
                    options={options}
                  />
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
                <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
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
                              setArr(data[type3]);
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
