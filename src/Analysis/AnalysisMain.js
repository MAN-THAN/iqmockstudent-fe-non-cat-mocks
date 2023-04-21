import React, { useEffect, useState } from "react";
import { Button, Typography, InputAdornment, Box } from "@mui/material";
import { ModifyButton, SubHeading } from "../styleSheets/Style";
import { useNavigate, Outlet, NavLink, useLoaderData } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useLocation, useParams } from "react-router-dom";
import { useAuth } from "../services/Context";
import Badge from "react-bootstrap/Badge";
import html2pdf from "html2pdf.js";
import { StyledMenu } from "../styleSheets/Style";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import Zoom from "@mui/material/Zoom";
import { styled } from "@mui/material/styles";
import { tooltipClasses } from "@mui/material/Tooltip";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { IoBookSharp } from "react-icons/io5";
import "../styleSheets/AnalysisMain.css";
import { PacmanLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MenuDrawer from "../Components/MenuDrawer";

function AnalysisMain() {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const { mockId, attemptId, subject } = params;
  const { analysisDataApi, isLoading, basicAnalysis, isErr, handlePageClick } =
    useAuth();
  const [basicData, setBasicData] = useState({});
  const [pdfStyle, setPDfStyle] = useState(false);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    setPDfStyle(false);
  });

  useEffect(() => {
    localStorage.clear();
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

  // Tooltip Customisation

  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
    },
  }));

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
            className="p-2 "
            style={{
              background: "var(--background)",
              position: "absolute",
              left: "70px",
            }}
          >
            <MenuDrawer />

            <div className="flex-grow-1  " onClick={handlePageClick}>
              {/* Header */}
              <header className="mx-4">
                <div className="container-fluid py-4 ">
                  <div className="d-flex  align-items-center justify-content-between justify-content-lg-between">
                    <div>
                      <NavLink to="/">
                        <img
                          src="/iQuanta.png"
                          alt="iquanta_logo"
                          className="img-fluid iquanta_logo"
                        />
                      </NavLink>
                    </div>

                    <div className="d-flex gap-3  align-items-center ">
                      <div className="text-end ps-5">
                        <img
                          src="/LeaderBoard.png"
                          className="img-fluid"
                          alt=""
                          width={100}
                        />
                      </div>

                      <div className="text-end">
                        <Button
                          variant="contained"
                          onClick={() =>
                            navigate(
                              `/leaderboard/${params.mockId}/${attemptId}`
                            )
                          }
                          sx={{
                            background: "black",
                            textTransform: "none",
                            height: "60px",
                            width: "64px",
                            fontFamily: "var(--font-inter)",
                            borderRadius: "50%",
                            "&:hover": {
                              border: "1px solid #FFC717",
                              backgroundColor: "black",
                            },
                          }}
                        >
                          <img src="/LB.png" className="img-fluid" width={20} />
                        </Button>
                      </div>

                      <div className="text-end">
                        {/* <Button
                      startIcon={<img src="/Help.png" className="img-fluid" width={25} />}
                      variant="contained"
                      sx={{
                        background: "black",
                        color: "white",
                        fontSize: "20px",
                        textTransform: "none",
                        fontFamily: "var(--font-inter)",
                        width: "119px",
                        height: "60px",
                        borderRadius: "30px",
                        "&:hover": {
                          border: "1px solid #0058FF",
                          backgroundColor: "black",
                        },
                      }}
                    >
                      Help
                    </Button> */}
                      </div>

                      <div className="text-end">
                        <Typography
                          sx={{
                            fontFamily: "var(--font-inter)",
                            fontSize: "19px",
                            fontWeight: 600,
                          }}
                        >
                          {basicData.name}
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: "var(--font-inter)",
                            fontSize: "13px",
                            fontWeight: 400,
                          }}
                        >
                          User id :{uid}
                        </Typography>
                      </div>

                      <div className="d-flex">
                        <a
                          href="#"
                          className="d-block link-dark text-decoration-none "
                          aria-expanded="false"
                        >
                          <img
                            src="https://github.com/mdo.png"
                            alt="mdo"
                            width="50"
                            height="50"
                            className="rounded"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </header>
              {/* Header end */}
              <div
                className={
                  pdfStyle
                    ? " d-flex  flex-wrap  justify-content-center align-items-center mx-4"
                    : " d-flex   flex-sm-wrap flex-md-wrap flex-lg-nowrap flex-row  justify-content-center align-items-center mx-4"
                }
              >
                <div className="flex-item p-3 flex-fill">
                  <Typography
                    variant="h4"
                    sx={{ color: "var(--dark-blue)", fontSize: "40px" }}
                  >
                    Hey {name},
                  </Typography>
                  <Typography
                    sx={{ fontSize: "30px", color: "black", fontWeight: 600 }}
                  >
                    This is your mock analysis for {title ? title : "iCAT 1.0"}.
                  </Typography>
                  <br />
                  <div className="d-flex gap-3 m-3 ms-0 ">
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
                  </div>
                </div>

                <div className="flex-item p-3  flex-fill">
                  <div
                    className="container bg-warning   "
                    style={{ borderRadius: "15px", width: "auto" }}
                  >
                    <div className=" d-flex gap-2 flex-column justify-content-center align-items-center py-3">
                      <div className="text-center">
                        <Typography
                          sx={{
                            fontSize: "30px",
                            fontFamily: "var( --font-inter)",
                            fontWeight: "bolder",
                          }}
                        >
                          Your score
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "52px",
                            fontFamily: "var( --font-inter)",
                            fontWeight: "900",
                          }}
                        >
                          {" "}
                          {overallScore}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "26px",
                            fontFamily: "var( --font-inter)",
                            fontWeight: "600",
                          }}
                        >
                          {" "}
                          out of 196
                        </Typography>
                      </div>
                      <div className="pt-1">
                        <Card
                          sx={{
                            height: 70,
                            width: "maxWidth",
                            borderRadius: "13px",
                          }}
                        >
                          <CardContent
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              px: 3,
                              gap: { md: 3, lg: 5, xl: 5 },
                              alignItem: "center",
                            }}
                          >
                            <item>
                              <Typography
                                sx={{
                                  fontSize: "23px",
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
                                  fontSize: "23px",
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
                </div>

                <div className="  flex-item p-3 flex-fill   ">
                  <div className=" d-flex  justify-content-center  flex-wrap gap-4">
                    <BootstrapTooltip
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 300 }}
                      title="Potential"
                      followCursor
                    >
                      <div
                        className="card shadow flex-item  flex-fill  my-2 "
                        style={{
                          width: "43%",
                          height: "7em",
                          border: "1px solid white",
                        }}
                      >
                        <div className="card-body d-flex flex-row justify-content-between align-items-center">
                          <div className="flex-item ">
                            <SubHeading className="card-title">
                              {potentialScore}
                            </SubHeading>

                            <Typography
                              variant="paragraph"
                              sx={{ fontSize: "13px" }}
                            >
                              Potential Mark
                            </Typography>
                          </div>

                          <div className="flex-item">
                            <img
                              src="/PM.png"
                              alt=""
                              className="img-fluid"
                              width={50}
                            />
                          </div>
                        </div>
                      </div>
                    </BootstrapTooltip>
                    <BootstrapTooltip
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 300 }}
                      title="Negative Mark"
                      followCursor
                    >
                      <div
                        className="card shadow flex-item flex-fill  my-2 "
                        style={{
                          width: "43%",
                          height: "7em",
                          border: "1px solid white",
                        }}
                      >
                        <div className="card-body d-flex flex-row justify-content-between align-items-center">
                          <div className="flex-item">
                            <SubHeading className="card-title">
                              {negativeMarks}
                            </SubHeading>
                            <Typography variant="paragraph">
                              Negative Mark
                            </Typography>
                          </div>

                          <div className="flex-item">
                            <img
                              src="/NM.png"
                              alt=""
                              className="img-fluid"
                              width={50}
                            />
                          </div>
                        </div>
                      </div>
                    </BootstrapTooltip>
                    <BootstrapTooltip
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 300 }}
                      title="Your Accuracy boy!!!"
                      followCursor
                    >
                      <div
                        className="card shadow flex-item flex-fill  my-2"
                        style={{
                          width: "43%",
                          height: "7em",
                          border: "1px solid white",
                        }}
                      >
                        <div className="card-body d-flex flex-row justify-content-between align-items-center ">
                          <div className="flex-item ">
                            <SubHeading className="card-title">
                              {accuracy}
                            </SubHeading>
                            <Typography variant="paragraph">
                              % Accuracy
                            </Typography>
                          </div>

                          <div className="flex-item">
                            <img
                              src="/Acc.png"
                              alt=""
                              className="img-fluid"
                              width={50}
                            />
                          </div>
                        </div>
                      </div>
                    </BootstrapTooltip>
                    <BootstrapTooltip
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 300 }}
                      title="Overall Percentage boy!!!"
                      followCursor
                    >
                      <div
                        className="card shadow flex-item  flex-fill  my-2"
                        style={{
                          width: "43%",
                          height: "7em",
                          border: "1px solid white",
                        }}
                      >
                        <div className="card-body d-flex flex-row justify-content-between align-items-center flex-fill">
                          <div className="flex-item ">
                            <SubHeading className="card-title">
                              {+overallPercentage < 0 ? 0 : +overallPercentage}
                            </SubHeading>
                            <Typography variant="paragraph">% Score</Typography>
                          </div>

                          <div className="flex-item">
                            <img
                              src="/PS.png"
                              alt="ps.png"
                              className="img-fluid"
                              width={50}
                            />
                          </div>
                        </div>
                      </div>
                    </BootstrapTooltip>
                  </div>
                </div>
              </div>

              {/* Buttons for changing sections */}
              <div className=" d-flex  m-5 ms-4  align-items-center">
                <div
                  style={{ flexBasis: "70%" }}
                  className=" d-flex  gap-3 ms-3"
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
                      ? "flex-item ps-4"
                      : "d-none"
                  }
                >
                  <Box
                    component="span"
                    sx={{
                      boxShadow: "none",
                      textTransform: "none",
                      fontSize: "18px",
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
                    <img src="/Group17.svg" className="ms-2 mb-1" alt="" />
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
