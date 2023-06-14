import React, { useEffect, useState } from "react";
import { Typography, Box, Card, Stack, Tooltip } from "@mui/material";
import { ModifyButton } from "../styleSheets/Style";
import { useNavigate, Outlet, NavLink } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import { useLocation, useParams, Link } from "react-router-dom";
import { useAuth } from "../services/Context";
import HeaderNew from "../Components/HeaderNew";
import html2pdf from "html2pdf.js";
import { StyledMenu } from "../styleSheets/Style";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { IoBookSharp } from "react-icons/io5";
import "../styleSheets/AnalysisMain.css";
import { PacmanLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MenuDrawer from "../Components/MenuDrawer";
import { typographyStyles } from "../styleSheets/StyleNew";
import { ApexChart } from "../Common-comp/CircleChart";
import { motion } from "framer-motion";

function AnalysisMain() {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const { mockId, attemptId, subject } = params;
  const {
    analysisDataApi,
    isLoading,
    basicAnalysis,
    isErr,
    handlePageClick,
    menuBarOpen,
    setMenuBarOpen,
    Backdrop,
    openDesktopView,
    fetchMockStatus
  } = useAuth();
  const [basicData, setBasicData] = useState({});
  const [pdfStyle, setPDfStyle] = useState(false);
  const [selected, setSelected] = useState("");

  const userData = JSON.parse(localStorage.getItem("userData"));
  const uid = JSON.parse(localStorage.getItem("userData"))?._id;


  // useEffect(() => {
  //   setPDfStyle(false);
  // });

  // Restricting back routes

  useEffect(() => {
    window.history.pushState(null, document.title, location.href);

    window.addEventListener("popstate", function (event) {
      window.history.pushState(null, document.title, location.href);
    });
  }, []);

  const handlePopstate = () => {
    window.history.pushState(null, document.title, window.location.href);
  };

  useEffect(() => {
    // localStorage.clear();
    window.localStorage.removeItem("my-counter-sec");
    window.localStorage.removeItem("my-counter-min");
    // window.localStorage.removeItem("questionStatus");
    analysisDataApi(attemptId, mockId, uid); //call analysis data api and send attempt id to api function also!
    // fetchMockStatus(mockId);
  }, []);

  useEffect(() => {
    if (basicAnalysis) {
      setBasicData(basicAnalysis.basicAnalysis);
    }
  }, [basicAnalysis]);

  const {
    name,
    negativeMarks,
    overallPercentage,
    potentialScore,
    accuracy,
    percentile,
    title,
    air = "TBD",
    targetPercentile,
    overallScore,
  } = basicData;

  const options = {
    margin: [0, 0, 0, 0],
    filename: "example.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: [11.69, 16.53], orientation: "portrait" },
  };
  const handleDownloadPDF = () => {
    setPDfStyle(true);
    const element = document.getElementById("my-component");
    html2pdf().set(options).from(element).save();
  };

  //Dropdown functions:

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose = (sub) => {
    console.log("working");
    setAnchorEl(null);
    setSelected(sub);

    navigate(`sectionwise/${sub}`);
  };

  const handleCloseSubTopic = (sub) => {
    console.log("subtopic working");
    setAnchorEl2(null);
    setSelected(sub);

    navigate(`subtopicwise/${sub}`);
  };
  const showToastMessage = () => {
    toast.error("Some error occurred! Please reload the page.", {
      position: toast.POSITION.TOP_CENTER,
    });
    return;
  };
  console.log(isErr);
  useEffect(() => {
    if (isErr) {
      // showToastMessage();
    }
  }, [isErr]);

  const CardsData = [
    {
      tooltip: `
      Guess what? If you have kept 100% accuracy you would have scored this much. 
      Work on your accuracy, You have good Potential.
      `,
      cardTitle: potentialScore,
      icon: "/PM.png",
      title: "Potential Marks",
    },
    {
      tooltip: `This is sad! Try to minimise your negative mark. You will see marginal improvement then.`,
      cardTitle: negativeMarks,
      icon: "/NM.png",
      title: "Negative Marks",
    },
    {
      tooltip: `This shows percentage of questions you have answered correctly out of your total attempt. Stay Focused!!`,
      cardTitle: accuracy,
      icon: "/Acc.png",
      title: "Your Accuracy",
    },
    {
      tooltip:
        "Simple percentage formula it  is :p (your score/Total score)*100 ",
      cardTitle: +overallPercentage < 0 ? 0 : +overallPercentage,
      icon: "/PS.png",
      title: "Overall Precentage",
    },
  ];

  console.log("Basic data", basicData);

  return (
    <>
      <ToastContainer />
      {isErr ? (
        <div>Error occured</div>
      ) : isLoading ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100vw",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PacmanLoader color="var(--orange)" size="100" />
          <h5
            className="loader_title"
            style={{ textAlign: "center", marginTop: "1em" }}
          >
            Preparing Analysis!
          </h5>
        </div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            id="my-component"
            style={{
              background: "var(--background)",
              position: "absolute",
              left: "65px",
              padding: "15px",
            }}
          >
            <MenuDrawer />

            <div className=" " onClick={handlePageClick}>
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
              {/* Header */}
              <div className="container-fluid p-0">
                <HeaderNew />
              </div>

              {/* Header end */}

              {/* Detailing section start */}
              <div
                className={
                  pdfStyle
                    ? " d-flex  flex-wrap  justify-content-center align-items-center"
                    : " d-flex  flex-sm-wrap flex-md-nowrap flex-lg-nowrap justify-content-bewteen my-3 gap-3"
                }
              >
                <div className="flex-item  " style={{ flexBasis: "27%" }}>
                  <div>
                    <Typography
                      variant="h4"
                      sx={{ color: "var(--dark-blue)", fontSize: "35px" }}
                    >
                      Hey {name},
                      <br />
                    </Typography>
                    <Typography
                      sx={{ fontSize: "25px", color: "black", fontWeight: 600 }}
                    >
                      This is your mock Analysis for
                      {title ? " " + title : "iCAT 1.0"}.
                    </Typography>

                    <div className="d-flex justify-content-start mt-4 gap-2 ">
                      <ModifyButton
                        variant="filled"
                        onClick={() =>
                          navigate(`/scorevsprecentile/${mockId}/${attemptId}`)
                        }
                        sx={{
                          border: "2px solid var( --blue-new)",
                          backgroundColor: "var( --blue-new)",
                          color: "white",
                          height: "24px",
                          width: "auto",
                          borderRadius: "15px",
                          p: 2,
                          fontWeight: "bold",
                          fontSize: "12px",
                        }}
                      >
                        Score vs Percentile
                      </ModifyButton>
                      {/* <ModifyButton
                        variant="outlined"
                        startIcon={
                          <img
                            src="/Vector1.png"
                            className="img-fluid"
                            width={8}
                          />
                        }
                        onClick={handleDownloadPDF}
                        sx={{
                          p: 2,
                          height: "24px",
                          // border: "2px solid var( --blue-new)",
                          width: "auto",
                          color: "var( --blue-new)",
                          fontWeight: "bold",
                          borderRadius: "15px",
                          fontSize: "12px",
                          ":hover , :focus": {
                            background: "inherit",
                            color: "var( --blue-new)",
                          },
                        }}
                      >
                        Download report
                      </ModifyButton> */}
                      {/* <Link onClick={openDesktopView}>
                        Please Open In Desktop Version
                      </Link> */}
                    </div>
                  </div>
                </div>

                <div className="flex-item   " style={{ flexBasis: "23%" }}>
                  <Card sx={{ width: "100%", height: 348, borderRadius: 4 }}>
                    <CardContent>
                      <Typography
                        sx={{
                          ...typographyStyles.subHeading,
                          fontSize: "19px",
                          color: "var(--font-grey)",
                        }}
                      >
                        Overall Score
                      </Typography>
                      {/* Graph */}

                      <div className="graph d-flex align-items-center justify-content-center">
                        <ApexChart
                          show={{ name: true, value: true }}
                          series={[percentile]}
                          title={"Percentile"}
                          style={{
                            height: 180,
                            color: "#4149FF",
                            width: 250,
                            fontSize: 18,
                            titleSize: 12,
                            offsetValue: -2,
                            // offsetTitle: -2,
                          }}
                        />
                      </div>
                      <div
                        className="text-center"
                        style={{ position: "relative", bottom: "13px" }}
                      >
                        <Typography
                          sx={{
                            ...typographyStyles.subHeading,
                            fontSize: "19.22px",
                          }}
                        >
                          {overallScore}
                        </Typography>
                        <Typography
                          sx={{
                            ...typographyStyles.subHeading,
                            fontSize: "10px",
                            color: "var(--font-grey)",
                            // lineHeight: 0,
                          }}
                        >
                          Your score
                        </Typography>
                      </div>
                      <Stack direction="column" fontSize={11} gap={1}>
                        <div className="d-flex justify-content-between">
                          <Typography
                            sx={{
                              ...typographyStyles.subHeading,
                              fontSize: "14px",
                            }}
                          >
                            Targeted Percentile
                          </Typography>
                          <Typography
                            sx={{
                              ...typographyStyles.subHeading,
                              fontSize: "14px",
                              color: "#4149FF",
                            }}
                          >
                            {targetPercentile}
                          </Typography>
                        </div>
                        <div className="d-flex justify-content-between">
                          <Typography
                            sx={{
                              ...typographyStyles.subHeading,
                              fontSize: "14px",
                            }}
                          >
                            Result Percentile
                          </Typography>
                          <Typography
                            sx={{
                              ...typographyStyles.subHeading,
                              fontSize: "14px",
                              color: "#4149FF",
                            }}
                          >
                            {percentile}
                          </Typography>
                        </div>
                        <div className="d-flex justify-content-between">
                          <Typography
                            sx={{
                              ...typographyStyles.subHeading,
                              fontSize: "14px",
                            }}
                          >
                            Left To Achieve Your Target
                          </Typography>
                          <Typography
                            sx={{
                              ...typographyStyles.subHeading,
                              fontSize: "14px",
                              color: "#4149FF",
                            }}
                          >
                            {eval(targetPercentile - percentile)}
                          </Typography>
                        </div>
                      </Stack>
                    </CardContent>
                  </Card>
                </div>

                {/* Cards sections */}

                <div
                  className="d-flex flex-column gap-3"
                  style={{ flexBasis: "50%" }}
                >
                  <div className="d-flex gap-3">
                    <Card
                      sx={{
                        width: "30%",
                        height: "10.125em",
                        borderRadius: 4,
                        textAlign: "center",
                      }}
                    >
                      <CardContent>
                        <Typography
                          sx={{
                            ...typographyStyles.subHeading,
                            fontSize: "14px",
                            color: "var(--font-grey)",
                          }}
                        >
                          All India Rank
                        </Typography>
                        <div className="d-flex justify-content-between align-items-center mt-2">
                          <img
                            src="/india1.png"
                            alt="india rank icon"
                            className="image-fluid"
                            width={94}
                          />

                          <Typography
                            sx={{
                              ...typographyStyles.subHeading,
                              fontSize: "37px",
                              color: "#FF8B41",
                            }}
                          >
                            {air}
                          </Typography>
                        </div>
                      </CardContent>
                    </Card>
                    {/*Marks detail */}
                    <Card
                      sx={{
                        width: "70%",
                        height: "10.125em",
                        borderRadius: 4,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <CardContent>
                        <Typography
                          sx={{
                            ...typographyStyles.subHeading,
                            fontSize: "20px",
                            color: "var(--font-grey)",
                            lineHeight: 3,
                          }}
                        >
                          Marks
                        </Typography>
                        <div className="d-flex justify-content-around align-items-center">
                          {CardsData &&
                            CardsData.map((item, ind) => {
                              return (
                                <Tooltip title={item.tooltip} arrow>
                                  <div
                                    className="Details flex-item text-center"
                                    key={ind}
                                  >
                                    <img
                                      src={item.icon}
                                      alt="icon"
                                      width={35}
                                      className={
                                        item.icon === "/PS.png"
                                          ? "image-fluid mb-2 pb-2 align-self-center"
                                          : "image-fluid mb-2 align-self-center"
                                      }
                                    />
                                    <Typography
                                      sx={{
                                        ...typographyStyles.subHeading,
                                        fontSize: "14px",
                                      }}
                                    >
                                      {item.cardTitle}
                                    </Typography>
                                    <Typography
                                      sx={{
                                        ...typographyStyles.subHeading,
                                        fontSize: "10px",
                                      }}
                                    >
                                      {item.title}
                                    </Typography>
                                  </div>
                                </Tooltip>
                              );
                            })}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Graph Card main */}
                  <div className="GraphCards">
                    <Card
                      sx={{
                        width: "100%",
                        height: "10.39em",
                        borderRadius: 4,
                        display: "flex",
                        justifyContent: "space-between",
                        p: 2,
                        alignItems: "center",
                      }}
                    >
                      {Object.keys(basicData).length > 0 &&
                        [
                          {
                            name: "varc",
                            color: "#FF9C41",
                            title: "VARC",
                          },
                          {
                            name: "lrdi",
                            color: "#7748FF",
                            title: "LRDI",
                          },
                          {
                            name: "quants",
                            color: "#606060",
                            title: "QA",
                          },
                        ].map((item) => {
                          console.log("itemssmm", item);
                          const sectionData = basicData[item.name]; // Retrieve the data for the current section

                          return (
                            <div className="" style={{ flexBasis: "32%" }}>
                              <div className="d-flex flex-row justify-content-start gap-2 align-items-center pt-1 ">
                                <div className="graph">
                                  <ApexChart
                                    show={{ name: true, value: true }}
                                    series={[sectionData.percentile]}
                                    title={"Percentile"}
                                    style={{
                                      height: 150,
                                      width: 100,
                                      color: item.color,
                                      fontSize: 15,
                                      titleSize: 10,
                                      offsetValue: -2,
                                      offsetTitle: -2,
                                    }}
                                  />
                                </div>

                                <div className="info mb-2">
                                  <Typography
                                    sx={{
                                      ...typographyStyles.subHeading,
                                      fontSize: "13.82px",
                                      height: "30px",
                                      color: "var(--font-grey)",
                                      fontWeight: 700,
                                      pt: 1,
                                    }}
                                  >
                                    {item.title}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      ...typographyStyles.subHeading,
                                      fontSize: "16.96px",
                                    }}
                                  >
                                    {sectionData.score}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      ...typographyStyles.subHeading,
                                      fontSize: "10px",
                                      color: "#5F5F5F",
                                    }}
                                  >
                                    Your Score
                                  </Typography>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </Card>
                  </div>
                </div>
              </div>

              {/* Detailing section End */}

              {/* Buttons for changing sections */}
              <div className=" d-flex mt-3">
                <div
                  style={{ flexBasis: "70%" }}
                  className=" d-flex gap-3 ps-2"
                >
                  <NavLink
                    to="overall"
                    activeclassname="active"
                    className="link flex-item"
                  >
                    <ModifyButton variant="filled" className="nav-button">
                      Score Card
                    </ModifyButton>
                  </NavLink>
                  <NavLink activeclassname="active" className="link flex-item">
                    <ModifyButton
                      variant="filled"
                      style={{
                        background:
                          location.pathname ===
                          `/analysis/${mockId}/${attemptId}/sectionwise/${subject}`
                            ? "var( --blue-new)"
                            : "",
                        color:
                          location.pathname ===
                            `/analysis/${mockId}/${attemptId}/sectionwise/${subject}` &&
                          "white",
                      }}
                      id="demo-customized-button"
                      aria-controls={open ? "demo-customized-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      disableElevation
                      onClick={handleClick}
                      endIcon={<KeyboardArrowDownIcon />}
                    >
                      Section-wise
                    </ModifyButton>
                  </NavLink>

                  <StyledMenu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem
                      sx={{
                        backgroundColor: selected === "varc" ? "#f5f5f5" : "",
                      }}
                      onClick={() => handleClose("varc")}
                      disableRipple
                    >
                      <IoBookSharp className="me-2" />
                      VARC
                    </MenuItem>
                    <Divider sx={{ my: 0.5 }} />
                    <MenuItem
                      sx={{
                        backgroundColor: selected === "lrdi" ? "#f5f5f5" : "",
                      }}
                      onClick={() => handleClose("lrdi")}
                      disableRipple
                    >
                      <IoBookSharp className="me-2" />
                      LRDI
                    </MenuItem>
                    <Divider sx={{ my: 0.5 }} />
                    <MenuItem
                      sx={{
                        backgroundColor: selected === "quants" ? "#f5f5f5" : "",
                      }}
                      onClick={() => handleClose("quants")}
                      disableRipple
                    >
                      <IoBookSharp className="me-2" />
                      QUANTS
                    </MenuItem>
                  </StyledMenu>

                  <NavLink
                    to="topicwise"
                    activeclassname="active "
                    className="link flex-item"
                  >
                    <ModifyButton variant="filled" className="nav-button">
                      Topic-wise
                    </ModifyButton>
                  </NavLink>

                  <NavLink activeclassname="active" className="link flex-item">
                    <ModifyButton
                      variant="filled"
                      style={{
                        background:
                          location.pathname ===
                          `/analysis/${mockId}/${attemptId}/subtopicwise/${subject}`
                            ? "var( --blue-new)"
                            : "",
                        color:
                          location.pathname ===
                            `/analysis/${mockId}/${attemptId}/subtopicwise/${subject}` &&
                          "white",
                      }}
                      id="demo-customized-button"
                      aria-controls={open2 ? "demo-customized-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open2 ? "true" : undefined}
                      disableElevation
                      onClick={handleClick2}
                      endIcon={<KeyboardArrowDownIcon />}
                    >
                      Subtopic-wise
                    </ModifyButton>
                  </NavLink>

                  <StyledMenu
                    id="basic-menu"
                    anchorEl={anchorEl2}
                    open={open2}
                    onClose={handleCloseSubTopic}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem
                      sx={{
                        backgroundColor: selected === "varc" ? "#f5f5f5" : "",
                      }}
                      onClick={() => handleCloseSubTopic("varc")}
                      disableRipple
                    >
                      <IoBookSharp className="me-2" />
                      VARC
                    </MenuItem>
                    <Divider sx={{ my: 0.5 }} />
                    <MenuItem
                      sx={{
                        backgroundColor: selected === "lrdi" ? "#f5f5f5" : "",
                      }}
                      onClick={() => handleCloseSubTopic("lrdi")}
                      disableRipple
                    >
                      <IoBookSharp className="me-2" />
                      LRDI
                    </MenuItem>
                    <Divider sx={{ my: 0.5 }} />
                    <MenuItem
                      sx={{
                        backgroundColor: selected === "quants" ? "#f5f5f5" : "",
                      }}
                      onClick={() => handleCloseSubTopic("quants")}
                      disableRipple
                    >
                      <IoBookSharp className="me-2" />
                      QUANTS
                    </MenuItem>
                  </StyledMenu>

                  <NavLink
                    to="difficulty"
                    activeclassname="active"
                    className="link flex-item"
                  >
                    <ModifyButton variant="filled" className="nav-button">
                      Difficulty-wise
                    </ModifyButton>
                  </NavLink>
                </div>

                <div
                  style={{ flexBasis: "30%" }}
                  className={
                    location.pathname ===
                    `/analysis/${mockId}/${attemptId}/overall`
                      ? "flex-item "
                      : "d-none"
                  }
                >
                  <Box
                    component="span"
                    sx={{
                      boxShadow: "none",
                      textTransform: "none",
                      fontSize: "13px",
                      fontWeight: 500,
                      width: "auto",
                      height: "auto",
                      color: "white",
                      padding: "8px 16px",
                      borderRadius: "20px",
                      lineHeight: 1.5,
                      backgroundColor: "var( --blue-new)",
                      fontFamily: "var(--font-inter)",
                    }}
                  >
                    Time spent on questions:
                  </Box>
                  <span>
                    <img
                      src="/Group17.svg"
                      className="ms-2"
                      width={20}
                      alt=""
                    />
                  </span>
                </div>
              </div>
              <Outlet />
            </div>
          </motion.div>
        </>
      )}
    </>
  );
}

export default AnalysisMain;
