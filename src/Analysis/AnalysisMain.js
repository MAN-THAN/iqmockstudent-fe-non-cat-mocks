import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  InputAdornment,
  Box,
  Paper,
  Card,
  CardMedia,
} from "@mui/material";
import { ModifyButton, SubHeading } from "../styleSheets/Style";
import { useNavigate, Outlet, NavLink, useLoaderData } from "react-router-dom";
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
import { TooltipCard } from "../Common-comp/Card";

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
  } = useAuth();
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
      tooltip:
        "Simple percentage formula it  is :p (your score/Total score)*100 ",
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
          <h5
            className="loader_title"
            style={{ textAlign: "center", marginTop: "1em" }}
          >
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
              <div className="container-fluid">
                <HeaderNew />
              </div>

              {/* Header end */}
              <div
                className={
                  pdfStyle
                    ? " d-flex  flex-wrap  justify-content-center align-items-center"
                    : " d-flex  flex-sm-wrap flex-md-nowrap flex-lg-nowrap justify-content-center align-items-center py-3 px-2 gap-4"
                }
              >
                <div className="flex-item flex-fill">
                  <div style={{ minWidth: "15em" }}>
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

                <Box
                  component="div"
                  sx={{
                    borderRadius: "15px",
                  }}
                >
                  <Card
                    sx={{
                      width: 292,
                      height: 177,
                      borderRadius: 5,
                      boxShadow: "none",
                      cursor: "pointer",
                      transition: "transform 0.5s ease-out",
                      ":hover": {
                        boxShadow: 5,
                        transform: "scale(1.1)",
                        transition: "transform 0.5s ease-out", // set a longer duration for the hover transformation
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      // height="177"
                      // width="292"
                      image="/scorevsPrecentile.png"
                      alt="Paella dish"
                    />
                  </Card>
                </Box>

                <div className="flex-item flex-fill ">
                  <div
                    className="mx-auto"
                    style={{
                      borderRadius: "15px",
                      background: "#FFC412",
                      width: "18.875em",
                      height: "11em",
                    }}
                  >
                    <div className=" d-flex justify-content-between align-items-center align-content-center p-3 ">
                      <div className="flex-item">
                        <Typography
                          sx={{
                            fontSize: "26px",
                            fontFamily: "var( --font-inter)",
                            fontWeight: "bolder",
                          }}
                        >
                          Your score
                          <Typography
                            sx={{
                              fontSize: "15px",
                              fontFamily: "var( --font-inter)",
                              fontWeight: "600",
                            }}
                          >
                            {" "}
                            out of 198
                          </Typography>
                        </Typography>
                      </div>
                      <div className="flex-item">
                        <Typography
                          sx={{
                            fontSize: "46px",
                            fontFamily: "var( --font-inter)",
                            fontWeight: "900",
                          }}
                        >
                          {overallScore}
                        </Typography>
                      </div>
                    </div>
                    <div className="pt-1">
                      <Card
                        sx={{
                          height: 49,
                          width: 262,
                          borderRadius: "8.25px",
                          mx: "auto",
                        }}
                      >
                        <CardContent
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            gap: 6,
                            fontWeight: 600,
                            alignItem: "center",
                          }}
                        >
                          <item>
                            <Typography
                              sx={{
                                fontSize: "15px",
                                color: "black",
                                fontWeight: 600,
                                fontFamily: "var(--font-inter)",
                              }}
                              gutterBottom
                            >
                              Percentile
                            </Typography>
                          </item>
                          <item>
                            <Typography
                              sx={{
                                fontSize: "15px",
                                color: "black",
                                fontWeight: 600,

                                fontFamily: "var(--font-inter)",
                              }}
                              gutterBottom
                            >
                              {percentile}
                            </Typography>
                          </item>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>

                {/* Cards sections */}

                <div className="flex-item flex-fill ">
                  <div className=" d-flex flex-row  justify-content-center  flex-wrap gap-3 row-gap-2 ">
                    {CardsData.map((item, index) => (
                      <TooltipCard
                        key={index}
                        tooltip={item.tooltip}
                        values={item.cardTitle}
                        icon={item.icon}
                        title={item.title}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Buttons for changing sections */}
              <div className=" d-flex mt-3">
                <div
                  style={{ flexBasis: "70%" }}
                  className=" d-flex gap-3 ps-2"
                >
                  <NavLink
                    to="overall"
                    activeClassName="active "
                    className="link flex-item"
                  >
                    <ModifyButton variant="filled" className="nav-button">
                      Score Card
                    </ModifyButton>
                  </NavLink>
                  <NavLink activeClassName="active" className="link flex-item">
                    <ModifyButton
                      variant="filled"
                      style={{
                        background:
                          location.pathname ===
                          `/analysis/${attemptId}/sectionwise/${subject}`
                            ? "#0057CB"
                            : "",
                        color:
                          location.pathname ===
                            `/analysis/${attemptId}/sectionwise/${subject}` &&
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
                    activeClassName="active "
                    className="link flex-item"
                  >
                    <ModifyButton variant="filled" className="nav-button">
                      Topic-wise
                    </ModifyButton>
                  </NavLink>

                  <NavLink
                    to="difficulty"
                    activeClassName="active"
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
                      backgroundColor: "#0057CB",
                      fontFamily: "var(--font-inter)",
                    }}
                  >
                    Time spent on questions(sec):
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
          </div>
        </>
      )}
    </>
  );
}

export default AnalysisMain;
