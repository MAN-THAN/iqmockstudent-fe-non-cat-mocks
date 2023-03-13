import React from "react";
import { Button, Typography, InputAdornment } from "@mui/material";
import { ModifyButton, SubHeading, } from "../styleSheets/Style";
import { useNavigate, Outlet, Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { RxDotsVertical } from 'react-icons/rx';


function AnalysisMain() {
  const navigate = useNavigate();

  return (
    <div
      className="container-fluid p-0 "
      style={{ background: "var(--background)" }}
    >
      {/* Header */}
      <header className="p-0
      ujn  ">
        <div className="container-fluid px-4 py-4 ">
          <div className="d-flex flex-wrap align-items-center justify-content-between justify-content-lg-between">
            <div>
              <Link to="/">
                <img
                  src="/iQuanta.png"
                  alt="iquanta_logo"
                  className="img-fluid iquanta_logo"
                />
              </Link>
            </div>

            <div className="d-flex gap-3 align-items-center ">
              <div className="text-end">
                <Button
                  variant="contained"
                  sx={{
                    background: "#DFDDDE",
                    textTransform: "none",
                    height: "24px",
                    width: "123px",
                    color:"black",
                    fontFamily: "var(--font-inter)",
                    borderRadius: "20px",
                    fontSize:"12px",
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
                  startIcon={
                    <img src="/Help.png" className="img-fluid" width={25} />
                  }
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
                  Charlie Puth
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "13px",
                    fontWeight: 400,
                  }}
                >
                  User id :1222047
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
                <h2 role="button"> <RxDotsVertical/></h2>
               
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Header end */}

      <div className="container-fluid mx-5">
        <div className=" d-flex flex-row  justify-content-center align-items-center ">
          <div className="flex-item p-2 ">
            <Typography
              variant="h4"
              sx={{ color: "var(--dark-blue)", fontSize: "40px" }}
            >
              Hey Charlie,
            </Typography>
            <Typography variant="h4" sx={{ fontSize: "35px", color: "black" }}>
              This is your mock analysis for iCAT 1.0.
            </Typography>
            <br />
            <div className="d-flex gap-3 m-3 ms-0 ">
              <ModifyButton
                variant="filled"
                sx={{
                  border: "2px solid #00359A",
                  backgroundColor: "#00359A",
                  color: "white",
                  height: "50px",
                  p: 2,
                  fontWeight: "bold",
                }}
              >
                View solutions
              </ModifyButton>
              <ModifyButton
                variant="outlined"
                sx={{
                  p: 2,
                  height: "50px",
                  border: "2px solid #00359A",
                  color: "#00359A",
                  fontWeight: "bold",
                }}
              >
                Download report
              </ModifyButton>
            </div>
          </div>

          <div className="flex-item  ">
            <div
              className="container bg-warning   "
              style={{ height: "300px", borderRadius: "15px", width: "365px" }}
            >
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
                    53
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "32px",
                      fontFamily: "var( --font-inter)",
                      fontWeight: "700",
                    }}
                  >
                    {" "}
                    out of 300
                  </Typography>
                </div>
                <div className="pt-1">
                  <Card
                    sx={{
                      height: 70,
                      width: 340,
                      borderRadius: "13px",
                    }}
                  >
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        px: 3,
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
                          6.5
                        </Typography>
                      </item>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>

          <div className="  flex-item ps-4  ">
            <div className=" d-flex flex-wrap gap-3  ">
              <div
                className="card shadow-sm  flex-item "
                style={{
                  width: " 18rem",
                  height: "7em",
                  border: "1px solid white",
                }}
              >
                <div className="card-body d-flex flex-row justify-content-between align-items-center">
                  <div className="flex-item">
                    <SubHeading className="card-title">75</SubHeading>

                    <Typography variant="paragraph">Potential Mark</Typography>
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
              <div
                className="card shadow-sm  flex-item "
                style={{
                  width: " 18rem",
                  height: "7em",
                  border: "1px solid white",
                }}
              >
                <div className="card-body d-flex flex-row justify-content-between align-items-center">
                  <div className="flex-item">
                    <SubHeading className="card-title">75</SubHeading>
                    <Typography variant="paragraph">Negative Mark</Typography>
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
              <div
                className="card shadow-sm  flex-item "
                style={{
                  width: " 18rem",
                  height: "7em",
                  border: "1px solid white",
                }}
              >
                <div className="card-body d-flex flex-row justify-content-between align-items-center">
                  <div className="flex-item">
                    <SubHeading className="card-title">75.3</SubHeading>
                    <Typography variant="paragraph">% Accuracy</Typography>
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
              <div
                className="card shadow-sm  flex-item "
                style={{
                  width: " 18rem",
                  height: "7em",
                  border: "1px solid white",
                }}
              >
                <div className="card-body d-flex flex-row justify-content-between align-items-center">
                  <div className="flex-item">
                    <SubHeading className="card-title">17.5</SubHeading>
                    <Typography variant="paragraph">% Score</Typography>
                  </div>

                  <div className="flex-item">
                    <img
                      src="/PS.png"
                      alt=""
                      className="img-fluid"
                      width={50}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons for changing sections */}
      <div className=" d-flex gap-3 m-5">
        <ModifyButton variant="filled" onClick={() => navigate("overall")}>
          Overall Analysis{" "}
        </ModifyButton>
        <ModifyButton variant="filled" onClick={() => navigate("sectionwise")}>
          Section wise analysis{" "}
        </ModifyButton>
        <ModifyButton variant="filled" onClick={() => navigate("topicwise")}>
          Topic wise Analysis
        </ModifyButton>
        <ModifyButton variant="filled" onClick={() => navigate("difficulty")}>
          Difficulty wise analysis
        </ModifyButton>
        <ModifyButton variant="filled" onClick={() => navigate("leaderboard")}>
          Leader board
        </ModifyButton>
      </div>
      <Outlet />
    </div>
  );
}

export default AnalysisMain;
