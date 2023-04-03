import { Link, Typography } from "@mui/material";
import React, {useState } from "react";
import { BootstrapButton, SubHeading } from "./../styleSheets/Style";
import { useNavigate,useParams } from "react-router-dom";



function Terms() {
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();
  const params = useParams()
 
  console.log(params)
  return (
    <div className="container overflow-hidden d-flex-col justify-content-center align-content-center">
      <div className="logo container text-center my-4">
        <img src={require("../images/iQuanta.png")} className="img-fuid mx-auto" width={150} alt="" />
      </div>

      <div className="container mt-3 p-2 text-center">
        <SubHeading className="text-center"> Terms & conditions</SubHeading>
        <div
          className="container m-2 p-4 mx-auto overflow-auto text-start"
          style={{
            border: "2px solid black",
            background: "var(--background-color)",
            height: "60vh",
          }}
        >
          <div className=" d-flex justify-content-center ">
            <div className=" flex-item text-start overflow-auto p-3 ">
              <Typography variant="text">
                Every company that manufactures and sells products uses this clause to limit what customers can hold them accountable for.
              </Typography>
              <br /> <br />
              <Typography variant="text">
                Most startup will <b>restrict liability of the following</b>
              </Typography>
              <br /> <br />
              <div className="ps-3">
                <ul style={{ listStylePosition: "outside", paddingLeft: "0px" }}>
                  <li>
                    <Typography variant="text">Lack of enjoyment, since it's subjective and prone to change.</Typography>
                  </li>
                  <li>
                    <Typography variant="text">Damage caused by viruses, spyware, or software damage.</Typography>
                  </li>
                  <li>
                    <Typography variant="text">Damage caused by third parties.</Typography>
                  </li>
                  <li>
                    <Typography variant="text">
                      Modifications and interruptions - while you can include them as a separate clause as covered below, many companies choose to
                      have it as part of their limitation of liability and warranty clause
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="text">
                      Errors and inaccuracies - as with modifications and interruptions, you can choose to include errors and inaccuracies in a
                      separate "corrections" section. However, most companies choose to include it under this clause.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="text">Damage caused by third parties.</Typography>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center  align-self-center gap-5 my-3">
          <BootstrapButton
            variant="contained mx-auto"
            disabled={agree ? true : false}
            height="45"
            sx={{
              color: agree ? "black" : "white",
              p: 2.5,
              backgroundColor: agree ? "#d2d4d6" : "",
              borderRadius: "30px",
            }}
            onClick={() => setAgree(true)}
          >
            Agree
          </BootstrapButton>

          <BootstrapButton
            variant="contained mx-auto"
            disabled={agree ? false : true}
            height="45"
            sx={{
              color: "white",
              p: 2.5,
              background: agree ? "" : "#d2d4d6",
              borderRadius: "30px",
            }}
            onClick={() => navigate(`/user_authentication/${params.name}/${params.email}/${params.uid}`)}
          >
            Start Test
          </BootstrapButton>
        </div>
      </div>
    </div>
  );
}

export default Terms;
