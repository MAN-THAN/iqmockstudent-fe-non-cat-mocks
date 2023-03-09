import React from "react";
import { Typography } from "@mui/material";
import { ModifyButton } from "../styleSheets/Style";
import { useNavigate, Outlet, Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";


function AnalysisMain() {
  const navigate = useNavigate();

  return (
    <div
      className="container-fluid p-0 "
      style={{ background: "var(--background)" }}
    >
      {/* Header */}
      <header className="p-0 ">
        <div className="container-fluid px-5 py-2 ">
          <div className="d-flex flex-wrap align-items-center justify-content-between justify-content-lg-between py-2 ">
            <div>
              <Link to="/">
                <img
                  src="/iQuanta.png"
                  alt="iquanta_logo"
                  className="img-fluid iquanta_logo"
                />
              </Link>
            </div>

            <div className="d-flex gap-3 ">
              <div className="text-end">
                <Typography
                  sx={{
                    fontFamily: "var(--font-inder)",
                    fontSize: "21px",
                    fontWeight: 400,
                  }}
                >
                  Charlie Puth
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "var(--font-inder)",
                    fontSize: "13px",
                    fontWeight: 400,
                  }}
                >
                  User id :1222047
                </Typography>
              </div>
              <div className="">
                <a
                  href="#"
                  className="d-block link-dark text-decoration-none dropdown-toggle"
                  data-bs-toggle="dropdown"
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
          className="container bg-warning  "
          style={{ height: "300px", borderRadius: "15px", width: "365px" }}
        >
          <div className="text-center pt-3 ">
            <h3 className="fw-bold">
              Your score <br /> 53 <br /> out of 300
            </h3>

            <Card
              sx={{
                height: 60,
                borderRadius: "13px",
                position: "relative",
                top: "50px",
              }}
            >
              <CardContent>
                <Typography
                  sx={{
                    fontSize: 20,
                    color: "black",
                    display: "flex",
                  }}
                  variant="h4"
                  gutterBottom
                >
                  Precentile
                  <span className="text-end"> 6.5</span>
                </Typography>
              </CardContent>
            </Card>
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
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
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
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
            </div>
          </div>

          <div
            className="card shadow-sm  flex-item  "
            style={{
              width: " 18rem",
              height: "7em",
              border: "1px solid white",
            }}
          >
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
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
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
            </div>
          </div>
        </div>
         </div>

      

      </div>
     </div>

      {/* Buttons for changing sections */}
      <div className=" d-flex gap-3 my-5">
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
