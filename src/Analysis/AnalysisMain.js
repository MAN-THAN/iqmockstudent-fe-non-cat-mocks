import React, { useEffect, useState } from "react";
import { Button, Typography, InputAdornment } from "@mui/material";
import { ModifyButton, SubHeading } from "../styleSheets/Style";
import { useNavigate, Outlet, Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { RxDotsVertical } from "react-icons/rx";
import { useLocation, useParams } from "react-router-dom";
import { useAuth } from "../services/Context";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import html2pdf from 'html2pdf.js';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { RxCross1 } from "react-icons/rx";
import Latex from "react-latex-next";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  width: 750,
  textAlign: "",
  height: 650,

  bgcolor: "white",
  borderRadius: "10px ",
  boxShadow: 24,
  p: 2,
  overflowY: "scroll",
};



function AnalysisMain() {
  const navigate = useNavigate();
  const params = useParams();
  const { attemptId } = params;
  const { analysisDataApi, isLoading, basicAnalysis, sectionWiseAnalysis } = useAuth();
  const [basicData, setBasicData] = useState({});
   const [open, setOpen] = React.useState(false);
   const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [pdfStyle, setPDfStyle] = useState(false);
  console.log(sectionWiseAnalysis?.sectionWiseAnalysis);

  useEffect(() => {setPDfStyle(false)})

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
  } = basicData;

  const handleDownloadPDF = () => {
    setPDfStyle(true);
    const element = document.getElementById("my-component");
    html2pdf().from(element).save();
    
  };

  return (
    <>
      {isLoading ? (
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <div id="my-component" className=" p-0 " style={{ background: "var(--background)" }}>
          {/* Header */}
          <header
            className=" mx-4
     "
          >
            <div className="container-fluid py-4 ">
              <div className="d-flex  align-items-center justify-content-between justify-content-lg-between">
                <div>
                  <Link to="/">
                    <img src="/iQuanta.png" alt="iquanta_logo" className="img-fluid iquanta_logo" />
                  </Link>
                </div>

                <div className="d-flex gap-3  align-items-center ">
                  <div className="text-end ps-5">
                    <Button
                      variant="contained"
                      sx={{
                        background: "#DFDDDE",
                        textTransform: "none",
                        height: "24px",
                        width: "123px",
                        color: "black",
                        fontFamily: "var(--font-inter)",
                        borderRadius: "20px",
                        fontSize: "12px",
                        "&:hover": {
                          backgroundColor: "#DFDDDE",
                        },
                      }}
                    >
                      Leader Board
                    </Button>
                  </div>

                  <div className="text-end">
                    <Button
                      variant="contained"
                      onClick={() => navigate("leaderboard")}
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
                    <Button
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
                    </Button>
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
                    <a href="#" className="d-block link-dark text-decoration-none " aria-expanded="false">
                      <img src="https://github.com/mdo.png" alt="mdo" width="50" height="50" className="rounded" />
                    </a>
                    <h2 role="button">
                      {" "}
                      <RxDotsVertical />
                    </h2>
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
                : " d-flex  flex-sm-wrap flex-md-wrap flex-lg-nowrap flex-row  justify-content-center align-items-center mx-4"
            }
          >
            <div className="flex-item p-3 flex-fill">
              <Typography variant="h4" sx={{ color: "var(--dark-blue)", fontSize: "40px" }}>
                Hey {name},
              </Typography>
              <Typography variant="h4" sx={{ fontSize: "35px", color: "black" }}>
                This is your mock analysis for iCAT 1.0.
              </Typography>
              <br />
              {/* Modal for viewing solutions */}
              <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                  <div className="d-flex justify-content-between">
                    <SubHeading className="m-0 ps-1">Solutions</SubHeading>
                    <RxCross1 role="button" onClick={handleClose} />
                  </div>
                  <SubHeading style={{ fontSize: "16px", textAlign: "center" }} className="m-2 ps-1">
                    VARC
                  </SubHeading>
                  {sectionWiseAnalysis?.sectionWiseAnalysis?.varc.map((e, index) => {
                    return (
                      <div className="container p-2">
                        <Typography variant="paragraph fw-bold" mt="10px">
                          Question : {index + 1}
                          <br />
                          {Boolean(e.question) === true && <Latex>{e.question}</Latex>}{" "}
                        </Typography>
                        <br />
                        <Typography mt="10px"> {Boolean(e.correctAnswer) === true && <Latex>{"Solution --> " + e.correctAnswer}</Latex>}</Typography>
                      </div>
                    );
                  })}
                  <SubHeading style={{ fontSize: "16px", textAlign: "center" }} className="m-2 ps-1">
                    LRDI
                  </SubHeading>
                  {sectionWiseAnalysis?.sectionWiseAnalysis?.lrdi.map((e, index) => {
                    return (
                      <div className="container p-2">
                        <Typography variant="paragraph fw-bold" mt="10px">
                          Question : {index + 1}
                          <br />
                          {Boolean(e.question) === true && <Latex>{e.question}</Latex>}{" "}
                        </Typography>
                        <br />
                        <Typography mt="10px"> {Boolean(e.correctAnswer) === true && <Latex>{"Solution --> " + e.correctAnswer}</Latex>}</Typography>
                      </div>
                    );
                  })}
                  <SubHeading style={{ fontSize: "16px", textAlign: "center" }} className="m-2 ps-1">
                    Quants
                  </SubHeading>
                  {sectionWiseAnalysis?.sectionWiseAnalysis?.quants.map((e, index) => {
                    return (
                      <div className="container p-2">
                        <Typography variant="paragraph fw-bold" mt="10px">
                          Question : {index + 1}
                          <br />
                          {Boolean(e.question) === true && <Latex>{e.question}</Latex>}{" "}
                        </Typography>
                        <br />
                        <Typography mt="10px"> {Boolean(e.correctAnswer) === true && <Latex>{"Solution --> " + e.correctAnswer}</Latex>}</Typography>
                      </div>
                    );
                  })}
                </Box>
              </Modal>
              <div className="d-flex gap-3 m-3 ms-0 ">
                <ModifyButton
                  variant="filled"
                  sx={{
                    border: "2px solid #00359A",
                    backgroundColor: "#00359A",
                    color: "white",
                    height: "50px",
                    width: "200px",
                    p: 2,
                    fontWeight: "bold",
                  }}
                  onClick={handleOpen}
                >
                  View solutions
                </ModifyButton>
                <ModifyButton
                  variant="outlined"
                  onClick={handleDownloadPDF}
                  sx={{
                    p: 2,
                    height: "50px",
                    border: "2px solid #00359A",
                    width: "200px",
                    color: "#00359A",
                    fontWeight: "bold",
                  }}
                >
                  Download report
                </ModifyButton>
              </div>
            </div>

            <div className="flex-item p-3  flex-fill">
              <div className="container bg-warning   " style={{ height: "auto", borderRadius: "15px", width: "auto" }}>
                <div className=" d-flex gap-4 flex-column justify-content-center align-items-center py-3">
                  <div className="text-center">
                    <Typography
                      sx={{
                        fontSize: "32px",
                        fontFamily: "var( --font-inter)",
                        fontWeight: "700",
                      }}
                    >
                      Your score
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "55px",
                        fontFamily: "var( --font-inter)",
                        fontWeight: "900",
                      }}
                    >
                      {" "}
                      {overallScore}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "32px",
                        fontFamily: "var( --font-inter)",
                        fontWeight: "700",
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
                          alignContent: "center",
                        }}
                      >
                        <item>
                          <Typography
                            sx={{
                              fontSize: "28px",
                              color: "black",
                              fontFamily: "var(--font-inter)",
                            }}
                            variant="h4"
                            gutterBottom
                          >
                            Precentile
                          </Typography>
                        </item>
                        <item>
                          <Typography
                            sx={{
                              fontSize: "28px",
                              color: "black",

                              fontFamily: "var(--font-inter)",
                            }}
                            variant="h4"
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
              <div className=" d-flex  justify-content-center flex-wrap gap-3 ">
                <div
                  className="card shadow-sm  flex-item  flex-fill "
                  style={{
                    width: "40%",
                    height: "7em",
                    border: "1px solid white",
                  }}
                >
                  <div className="card-body d-flex flex-row justify-content-between align-items-center">
                    <div className="flex-item ">
                      <SubHeading className="card-title">{potentialScore}</SubHeading>

                      <Typography variant="paragraph">Potential Mark</Typography>
                    </div>

                    <div className="flex-item">
                      <img src="/PM.png" alt="" className="img-fluid" width={50} />
                    </div>
                  </div>
                </div>
                <div
                  className="card shadow-sm  flex-item flex-fill "
                  style={{
                    width: "40%",
                    height: "7em",
                    border: "1px solid white",
                  }}
                >
                  <div className="card-body d-flex flex-row justify-content-between align-items-center">
                    <div className="flex-item">
                      <SubHeading className="card-title">{negativeMarks}</SubHeading>
                      <Typography variant="paragraph">Negative Mark</Typography>
                    </div>

                    <div className="flex-item">
                      <img src="/NM.png" alt="" className="img-fluid" width={50} />
                    </div>
                  </div>
                </div>
                <div
                  className="card shadow-sm  flex-item flex-fill"
                  style={{
                    width: "40%",
                    height: "7em",
                    border: "1px solid white",
                  }}
                >
                  <div className="card-body d-flex flex-row justify-content-between align-items-center ">
                    <div className="flex-item ">
                      <SubHeading className="card-title">{accuracy}</SubHeading>
                      <Typography variant="paragraph">% Accuracy</Typography>
                    </div>

                    <div className="flex-item">
                      <img src="/Acc.png" alt="" className="img-fluid" width={50} />
                    </div>
                  </div>
                </div>
                <div
                  className="card shadow-sm  flex-item  flex-fill"
                  style={{
                    width: "40%",
                    height: "7em",
                    border: "1px solid white",
                  }}
                >
                  <div className="card-body d-flex flex-row justify-content-between align-items-center flex-fill">
                    <div className="flex-item ">
                      <SubHeading className="card-title">{Math.round(overallPercentage)}</SubHeading>
                      <Typography variant="paragraph">% Score</Typography>
                    </div>

                    <div className="flex-item">
                      <img src="/PS.png" alt="ps.png" className="img-fluid" width={50} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons for changing sections */}
          <div className=" d-flex gap-3 m-5">
            <ModifyButton variant="filled" style={{ fontSize: "1em", height: "2.5em", padding: "1em" }} onClick={() => navigate("overall")}>
              Overall Analysis{" "}
            </ModifyButton>
            <ModifyButton variant="filled" style={{ fontSize: "1em", height: "2.5em", padding: "1em" }} onClick={() => navigate("sectionwise")}>
              Section wise analysis{" "}
            </ModifyButton>
            <ModifyButton variant="filled" style={{ fontSize: "1em", height: "2.5em", padding: "1em" }} onClick={() => navigate("topicwise")}>
              Topic wise Analysis
            </ModifyButton>
            <ModifyButton variant="filled" style={{ fontSize: "1em", height: "2.5em", padding: "1em" }} onClick={() => navigate("difficulty")}>
              Difficulty wise analysis
            </ModifyButton>
          </div>
          <Outlet />
        </div>
      )}
    </>
  );
}

export default AnalysisMain;
