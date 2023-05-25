import React, { useState } from "react";
import MenuDrawer from "../Components/MenuDrawer";
import HeaderNew from "../Components/HeaderNew";
import { useAuth } from "../services/Context";
import { typographyStyles } from "../styleSheets/StyleNew";
import { useTheme } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box, Typography, Card, CardContent, CardHeader } from "@mui/material";
import { LogoCard } from "../Common-comp/Card";
import { getMockComparison } from "../services/Analysis_api";
import { useEffect } from "react";
import { useParams } from "react-router";
import { PuffLoader } from "react-spinners";

const ITEM_HEIGHT = 28;
const ITEM_PADDING_TOP = 3;
const MenuProps = {
  disableScrollLock: true,
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

function getStyles(name, MockName, theme) {
  return {
    fontWeight:
      MockName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function MockComparison() {
  const Subjects = [
    { name: "Varc" },
    { name: "Quants" },
    { name: "LRdi" },
    { name: "MBA" },
    { name: "MIA" },
  ];

  const OuterCardStyle = {
    width: 246,
    height: "100%",
    ...typographyStyles.subHeading,
    fontSize: "15px",
    background: "#F5F9FF",
    boxShadow: "",
    borderRadius: "10px",
    boxShadow: "0px 4px 4px rgba(63, 105, 255, 0.25)",
    p: 1,
  };

  const innerCardStyle = {
    height: "auto",
    justifyContent: "space-around",
    iconSize: 25,
    display: "flex",
    flexDirection: "row-reverse", 
    alignItems: "center",
    infoIcon:20
    
  };

  const [MockName, setMockName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setMockName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const { menuBarOpen, setMenuBarOpen, Backdrop, isLoading, setLoading } =
    useAuth();

  useEffect(() => {
    getData();
  }, []);
  const { mockId, attemptId } = useParams();
  const [result, setResult] = useState();
  const [prevMocks, setPrevMocks] = useState();
  const [topper, setTopper] = useState();
  const [compMock, setCompMock] = useState();

  const getData = async () => {
    setLoading(true);
    const res = await getMockComparison(mockId, attemptId);
    if (res?.status == 200) {
      console.log(res.data);
      setResult(res.data?.result);
      setTopper(res.data?.topperResult);
      setPrevMocks(res.data?.previousMocks);
      setCompMock(res.data?.previousMocks[0]);
      setLoading(false);
    } else {
      setLoading(false);
      console.log("error", res);
    }
  };
  console.log(result, topper, prevMocks);
  console.log(compMock)

  return (
    <Box component="main">
      <MenuDrawer />

      <Box
        sx={{
          position: "absolute",
          left: "65px",
          height: "100vh",
          width: "calc(100% - 65px)",
          p: 2,
        }}
      >
        <Box component="header">
          <HeaderNew />
        </Box>

        {isLoading ? (
          <div className="d-flex align-items-center flex-column gap-2 justify-content-center" style={{ width: "100%", height: "80%" }}>
            <div class="loading-container">
              <div class="loading"></div>
              <div id="loading-text">Loading...</div>
            </div>
            <Typography sx={{fontWeight : 500}}>It may take some longer, Please be patient!</Typography>
          </div>
        ) : (
          <Box
            component="section"
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-around",
              mt: 3,
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

            <Box className="comparison-Section p-2">
              <Typography
                sx={{
                  ...typographyStyles.mainHeading,
                  pt: 2,
                }}
              >
                {" "}
                Mock <br /> Comparison
              </Typography>

              <ul
                className="list-unstyled "
                style={{
                  lineHeight: "4.4em",
                  ...typographyStyles.subHeading,
                  fontSize: "15px",
                  marginTop: "5px",
                }}
              >
                <li>Score</li>
                <li>Number of Questions Attempted</li>
                <li>Number of Correct Questions Attempted</li>
                <li>Number of Incorrect Questions Attempted</li>
                <li>Number of Skipped Questions Attempted</li>
                <li>Average time spent per question</li>
              </ul>
            </Box>

            <Box className="Cards d-flex gap-5 align-items-center mt-4 ">
              <OuterCard
                data={result}
                miniCard={
                  <LogoCard
                    icon={"/click 1.svg"}
                    infoIcon={"/circle-info-solid.svg"}
                    cardTitle={
                      <>
                        <Typography variant="h4" sx={{ fontSize: 17 }} color={"black"}>
                          {result?.percentile} <span style={{ fontSize: "15px" }}>%ile</span>
                        </Typography>
                        <Typography sx={{ color: "#809FB8", fontSize: 15 }}>{result?.title}</Typography>
                      </>
                    }
                    style={{ ...innerCardStyle }}
                  />
                }
                style={OuterCardStyle}
              />
              <OuterCard
                data={compMock}
                icon={"/click 1.svg"}
                miniCard={
                  <LogoCard
                    cardTitle={
                      <>
                        <Typography variant="h4" sx={{ fontSize: 17 }} color={"black"}>
                          {compMock?.percentile}
                          <span style={{ fontSize: "15px" }}>%ile</span>
                        </Typography>
                        <Typography sx={{ color: "#809FB8", fontSize: 15 }}>{compMock?.title}</Typography>
                      </>
                    }
                    style={{ ...innerCardStyle }}
                    icon={"/click 1.svg"}
                    infoIcon={"/circle-info-solid.svg"}
                    select={<SelectBox onSelect={handleChange} mockName={MockName} options={prevMocks} setCompMock={setCompMock} />}
                  />
                }
                style={OuterCardStyle}
              />
              <OuterCard
                data={topper}
                miniCard={
                  <LogoCard
                    cardTitle={
                      <>
                        <Typography variant="h4" sx={{ fontSize: 17 }} color={"black"}>
                          {topper?.percentile} <span style={{ fontSize: "15px" }}>%ile</span>
                        </Typography>
                        <Typography sx={{ fontSize: "12px", fontWeight: 700 }}> {"Topper Analysis"}</Typography>
                      </>
                    }
                    style={{ ...innerCardStyle, background: "#FFECB9" }}
                    icon={"/top-rated.png"}
                    infoIcon={"/circle-info-solid.svg"}
                  />
                }
                style={{ ...OuterCardStyle, background: "#FFC107" }}
              />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

const OuterCard = ({ style, miniCard, data }) => {
  return (
    <Card sx={{ ...style }}>
      <Box component="div" sx={{ height: "20%" }}>
        {miniCard}
      </Box>
      <CardContent>
        <ul className="list-unstyled pt-4 text-center">
          <li>{data?.score}</li>
        </ul>
        <ul className="list-unstyled pt-4 text-center">
          <li>{data?.attempted}</li>
        </ul>
        <ul className="list-unstyled pt-4 text-center">
          <li>{data?.attemptedCorrect}</li>
        </ul>
        <ul className="list-unstyled pt-4 text-center">
          <li>{data?.attempted - data?.attemptedCorrect}</li>
        </ul>
        <ul className="list-unstyled pt-4 text-center">
          <li>{data?.skipped}</li>
        </ul>
        <ul className="list-unstyled pt-4 text-center">
          <li>{data?.avgTime}</li>
        </ul>
      </CardContent>
    </Card>
  );
};

const SelectBox = ({ onSelect, mockName, options, setCompMock }) => {
  const theme = useTheme();
  return (
    <div>
      <FormControl sx={{ m: 1, mt: 0, width: "94%" }}>
        {/* <InputLabel id="demo-multiple-name-label" sx={{ fontSize: "15px" }}>
         Mock
        </InputLabel> */}
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={mockName}
          onChange={onSelect}
          sx={{ height: "30px" }}
          // input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}

          displayEmpty={true}
        >
          <MenuItem value="" disabled>
            Select Mock
          </MenuItem>
          {options?.map((item, index) => (
            <MenuItem
              onClick={() =>
                setCompMock(options[index])
              }
              key={index}
              value={item._id}
              style={getStyles(item._id, mockName, theme)}
            >
              {item.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MockComparison;
