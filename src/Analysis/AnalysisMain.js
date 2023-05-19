import React, { useEffect, useState } from "react";
import { Typography, Box, Card, Stack, Tooltip } from "@mui/material";
import { ModifyButton } from "../styleSheets/Style";
import { useNavigate, Outlet, NavLink } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import { useLocation, useParams } from "react-router-dom";
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

const series = [70];

function AnalysisMain() {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const { mockId, attemptId, subject } = params;
  const { analysisDataApi, isLoading, basicAnalysis, isErr, handlePageClick, menuBarOpen, setMenuBarOpen, Backdrop } = useAuth();
  const [basicData, setBasicData] = useState({});
  const [pdfStyle, setPDfStyle] = useState(false);
  const [selected, setSelected] = useState("");

  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    setPDfStyle(false);
  });

  useEffect(() => {
    // localStorage.clear();
    window.localStorage.removeItem("my-counter-sec");
    window.localStorage.removeItem("my-counter-min");
    analysisDataApi(attemptId); //call analysis data api and send attempt id to api function also!
  }, []);

  useEffect(() => {
    if (basicAnalysis) {
      setBasicData(basicAnalysis.basicAnalysis);
    }
  }, [basicAnalysis]);

  const {
    uid,
    name,
    negativeMarks,
    overallPercentage,
    overallScore,
    potentialScore,
    accuracy,
    percentile,
    title,
    lrdi,
    quants,
    targetPercentile,
    varc,
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
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (sub) => {
    setAnchorEl(null);
    setSelected(sub);

    navigate(`sectionwise/${sub}`);
  };
  
   const handleCloseSubTopic = (sub) => {
     setAnchorEl(null);
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
      showToastMessage();
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
      tooltip: "Simple percentage formula it  is :p (your score/Total score)*100 ",
      cardTitle: +overallPercentage < 0 ? 0 : +overallPercentage,
      icon: "/PS.png",
      title: "Overall Precentage",
    },
  ];

  return (
    <>
      <ToastContainer />
      {isErr ? (
        <div></div>
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
          <h5 className="loader_title" style={{ textAlign: "center", marginTop: "1em" }}>
            Preparing Analysis!
          </h5>
        </div>
      ) : (
        <>
          <div
            id="my-component"
            style={{
              background: "var(--background)",
              position: "absolute",
              left: "70px",
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
                    <Typography variant="h4" sx={{ color: "var(--dark-blue)", fontSize: "35px" }}>
                      Hey {name},
                      <br />
                    </Typography>
                    <Typography sx={{ fontSize: "25px", color: "black", fontWeight: 600 }}>
                      This is your mock Analysis for
                      {title ? " " + title : "iCAT 1.0"}.
                    </Typography>
                  </div>

                  {/* <div className="d-flex gap-3 m-3 ms-0 ">
                    <ModifyButton
                      variant="filled"
                      onClick={() =>
                        navigate(`/viewsolutions/${attemptId}/varc`)
                      }
                      sx={{
                        border: "2px solid #0057CB",
                        backgroundColor: "#0057CB",
                        color: "white",
                        height: "59px",
                        width: "200px",
                        borderRadius: "20px",
                        p: 2,
                        fontWeight: "bold",
                      }}
                    >
                      View solutions
                    </ModifyButton>
                    <ModifyButton
                      variant="outlined"
                      startIcon={
                        <img
                          src="/Download.png"
                          className="img-fluid"
                          width={13}
                        />
                      }
                      onClick={handleDownloadPDF}
                      sx={{
                        p: 2,
                        height: "59px",
                        border: "2px solid #0057CB",
                        width: "215px",
                        color: "#0057CB",
                        fontWeight: "bold",
                        borderRadius: "20px",
                      }}
                    >
                      Download report
                    </ModifyButton>
                  </div> */}
                </div>

                <div className="flex-item   " style={{ flexBasis: "23%" }}>
                  <Card sx={{ width: "100%", height: 348, borderRadius: 4 }}>
                    <CardContent>
                      <Typography
                        sx={{
                          ...typographyStyles.subHeading,
                          fontSize: "20px",
                          color: "var(--font-grey)",
                          lineHeight: 2,
                        }}
                      >
                        Overall Score
                      </Typography>
                      <Typography
                        sx={{
                          ...typographyStyles.subHeading,
                          fontSize: "23px",
                          color: "#4149FF",
                          textAlign: "center",
                        }}
                      >
                        Percentile
                      </Typography>

                      <div className="graph d-flex justify-content-center">
                        <ApexChart
                          show={{ name: true, value: true }}
                          series={[percentile]}
                          title={"Percentile"}
                          style={{ height: 200, color: "#4149FF", width: 250 }}
                        />
                      </div>

                      <Stack direction="row" flexWrap="wrap" fontSize={11} justifyContent={"space-between"}>
                        <p>
                          <span style={{ color: "#4149FF" }}>{targetPercentile}</span> Targeted Percentile
                        </p>
                        <p>
                          <span style={{ color: "#4149FF" }}>{percentile} </span>
                          Result Percentile
                        </p>
                        <p>
                          <span style={{ color: "#4149FF" }}>{eval(targetPercentile - percentile)}</span> Left To Achieve Your Target
                        </p>
                      </Stack>
                    </CardContent>
                  </Card>
                </div>

                {/* Cards sections */}

                <div className="d-flex flex-column gap-3" style={{ flexBasis: "50%" }}>
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
                        <img src="/Revenue.png" alt="" className="image-fluid mb-2" />
                        <Typography
                          sx={{
                            ...typographyStyles.subHeading,
                            fontSize: "14px",
                            color: "var(--font-grey)",
                            lineHeight: 1,
                          }}
                        >
                          All India Rank
                        </Typography>
                        <Typography
                          sx={{
                            ...typographyStyles.subHeading,
                            fontSize: "37px",
                          }}
                        >
                          53
                        </Typography>
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
                                  <div className="Details flex-item text-center" key={ind}>
                                    <img
                                      src={item.icon}
                                      alt="icon"
                                      width={35}
                                      className={
                                        item.icon === "/PS.png" ? "image-fluid mb-2 pb-2 align-self-center" : "image-fluid mb-2 align-self-center"
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
                  {/* Graph Cards */}
                  <div className="GraphCards">
                    <Card
                      sx={{
                        width: "100%",
                        height: "10.39em",
                        borderRadius: 4,
                        display: "flex",
                        justifyContent: "space-between",
                        py: 1,
                      }}
                    >
                      {Object.keys(basicData).length > 0 &&
                        [
                          {
                            name: "varc",
                            color: "#FF9C41",
                            title: "Verbal Ability & Reading Comprehension",
                          },
                          {
                            name: "lrdi",
                            color: "#7748FF",
                            title: "Logical Reasoning & Data Interpretation",
                          },
                          {
                            name: "quants",
                            color: "#606060",
                            title: "Quantitative Aptitude",
                          },
                        ].map((item) => {
                          console.log("itemssmm", item);
                          const sectionData = basicData[item.name]; // Retrieve the data for the current section

                          return (
                            <div className="p-2" style={{ flexBasis: "32%" }}>
                              <Typography
                                sx={{
                                  ...typographyStyles.subHeading,
                                  fontSize: "11.82px",
                                  pl: 2,
                                  height: "30px",
                                }}
                              >
                                {item.title}
                              </Typography>
                              <div className="d-flex justify-content-start gap-2 align-items-center ">
                                <div className="graph">
                                  <ApexChart
                                    show={{ name: false, value: true }}
                                    series={[sectionData.percentile]}
                                    title={"Percentile"}
                                    style={{
                                      height: 100,
                                      width: 80,
                                      color: item.color,
                                      fontSize: 15,
                                      titleSize: 8,
                                      offsetValue: 2,
                                    }}
                                  />
                                  <Typography
                                    sx={{
                                      ...typographyStyles.subHeading,
                                      fontSize: "13.02px",
                                      color: item.color,
                                      pl: 2,
                                    }}
                                  >
                                    Percentile
                                  </Typography>
                                </div>

                                <div className="info mb-2">
                                  <Typography
                                    sx={{
                                      ...typographyStyles.subHeading,
                                      fontSize: "16.96px",
                                      lineHeight: 0.5,
                                    }}
                                  >
                                    {sectionData.score}
                                  </Typography>
                                  <small
                                    style={{
                                      fontSize: "10px",
                                      color: "#5F5F5F",
                                    }}
                                  >
                                    Your Score
                                  </small>
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
                <div style={{ flexBasis: "70%" }} className=" d-flex gap-3 ps-2">
                  <NavLink to="overall" activeClassName="active " className="link flex-item">
                    <ModifyButton variant="filled" className="nav-button">
                      Score Card
                    </ModifyButton>
                  </NavLink>
                  <NavLink activeClassName="active" className="link flex-item">
                    <ModifyButton
                      variant="filled"
                      style={{
                        background: location.pathname === `/analysis/${attemptId}/sectionwise/${subject}` ? "#0057CB" : "",
                        color: location.pathname === `/analysis/${attemptId}/sectionwise/${subject}` && "white",
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

                  <NavLink to="topicwise" activeClassName="active " className="link flex-item">
                    <ModifyButton variant="filled" className="nav-button">
                      Topic-wise
                    </ModifyButton>
                  </NavLink>

                  <NavLink activeClassName="active" className="link flex-item">
                    <ModifyButton
                      variant="filled"
                      style={{
                        background: location.pathname === `/analysis/${attemptId}/sectionwise/${subject}` ? "#0057CB" : "",
                        color: location.pathname === `/analysis/${attemptId}/sectionwise/${subject}` && "white",
                      }}
                      id="demo-customized-button"
                      aria-controls={open ? "demo-customized-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      disableElevation
                      onClick={handleClick}
                      endIcon={<KeyboardArrowDownIcon />}
                    >
                      Subtopic-wise
                    </ModifyButton>
                  </NavLink>

                  <StyledMenu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
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

                  <NavLink to="difficulty" activeClassName="active" className="link flex-item">
                    <ModifyButton variant="filled" className="nav-button">
                      Difficulty-wise
                    </ModifyButton>
                  </NavLink>
                </div>

                <div
                  style={{ flexBasis: "30%" }}
                  className={location.pathname === `/analysis/${mockId}/${attemptId}/overall` ? "flex-item " : "d-none"}
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
                      backgroundColor: "#0057CB",
                      fontFamily: "var(--font-inter)",
                    }}
                  >
                    Time spent on questions:
                  </Box>
                  <span>
                    <img src="/Group17.svg" className="ms-2" width={20} alt="" />
                  </span>
                </div>
              </div>
              <Outlet />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AnalysisMain;
