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

function ErrorTracker() {
  const filter1 = [
    { name: "Incorrect", value: "incorrect" },
    { name: "Correct", value: "correct" },
  ];
  // const filter2 = [{ name: "iCat 1.0" }, { name: "iCat 2.0" }];
  const filter3 = [
    { name: "VARC", value: "varc" },
    { name: "LRDI", value: "lrdi" },
    { name: "Quants", value: "quants" },
  ];
  const filter4 = [{ name: "Reading Comprehension", value: "Reading comprehension" }, { name: "qde" }, { name: "dewd" }];
  const { menuBarOpen, setMenuBarOpen, Backdrop } = useAuth();
  const { attemptId } = useParams();
  const [data, setData] = useState([]);
  const [type1, setType1] = useState();
  const [type2, setType2] = useState();
  const [type3, setType3] = useState();
  const [type4, setType4] = useState();
  const [graphData, setGraphData] = useState([]);
  const [arr, setArr] = useState([]);
  const [show, setShow] = useState();
  console.log(type1, type2, type3, type4);
  console.log(data);
  console.log(arr);
  useEffect(() => {
    getData();
    filterData(type1, type3, type2, type4);
    
  }, [type1, type2, type3, type4]);

  const getData = async () => {
    const res = await fetchErrorTracker(attemptId, type3);
    if (res?.status == 200) {
      console.log(res);
      setData(res.data);
      setGraphData(res.data.graph);
      setArr(res.data[type3]);
      // setShow(res.data.varc);
    } else {
      console.log("error", res);
    }
  };
  function filterData(type1, type3, type2, type4) {
  
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
  console.log(show)

  return (
    <Box component="main" sx={{ height: "100vh" }}>
      <MenuDrawer />

<<<<<<< HEAD
        <Box sx={{ p: 2, position: "absolute", left: "70px" }}>
        {/* Header */}
          <Box component="header">
            <HeaderNew />
          </Box>
=======
      <Box sx={{ p: 2, position: "absolute", left: "70px" }}>
        <Box component="header">
          <HeaderNew />
        </Box>
>>>>>>> 526d8f7d1e06f4cf62a27aba42e0758f636f85a3

        <Box component="div" sx={{ mt: 4 }}>
          <Box sx={{ display: "flex", flexDirection: "row", gap: "30%" }}>
            {" "}
            <MultipleSelect options={filter1} setType={setType1} />
            <Box sx={{ display: "flex", flexDirection: "row", flexBasis: "50%", gap: "1em" }}>
              {/* <MultipleSelect options={filter2} setType={setType2} type={"Mock"} /> */}
              <MultipleSelect options={filter3} setType={setType3} />
              <MultipleSelect options={filter4} setType={setType4} />
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
        </Box>

        <Box component="main" sx={{ display: "flex", width: "100%", height: "76Vh" }}>
          {menuBarOpen && (
            <Backdrop
              sx={{
                zIndex: (theme) => theme.zIndex.drawer - 1,
                color: "#fff",
              }}
              open={menuBarOpen}
              onClick={() => setMenuBarOpen(false)}
            />
          )}
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
            <Typography sx={{ ...typographyStyles.subHeading }}>Question Summary</Typography>

            {[...Array(10)].map((item, index) => (
              <Box sx={{ display: "flex", pt: 3, gap: 2 }}>
                <Card
                  sx={{
                    maxWidth: " 100% ",
                    background: "#F6F7F8",
                    p: 2,
                    boxShadow: "none",
                    borderLeft: "8px solid #FFBD5E",
                    borderRadius: "5px 10px 10px 5px",
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
                    <Typography variant="paragraph" color="text.secondary">
                      Sohan started a business with a capital of RS. 80000. After 6 months Mohan joined as a partner by investing Rs 65000. After one
                      year they earned total profit RS. 20000. What is share of shahin in the profit?
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "space-between", px: 3 }}>
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
                            color: "#00C838 !important",
                          },
                        }}
                      >
                        Difficulty:<span>Easy</span>
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
                        Time :<span>00:02:23</span>
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
                        Avg Time : <span>00:01:39</span>
                      </Button>
                    </Box>
                    <div>
                      <Button size="medium" endIcon={<IoIosArrowForward />} sx={{ background: "#3A36DB", float: "end" }} variant="contained">
                        Solution
                      </Button>
                    </div>
                  </CardActions>
                </Card>
              </Box>
            ))}
          </Box>
          {/*Question side box end*/}
        </Box>
      </Box>
    </Box>
  );
}

export default ErrorTracker;
