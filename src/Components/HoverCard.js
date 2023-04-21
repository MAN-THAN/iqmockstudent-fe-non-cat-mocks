import React from "react";
import { CardWrapper } from "../styleSheets/CardHover";
import { useNavigate } from "react-router-dom";
import { style } from "../styleSheets/StyleNew";
import { MyButton } from "../styleSheets/Style";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { Button, Typography } from "@mui/material";

function HoverCard({ image, heading, path }) {
  const navigate = useNavigate();
  return (
    <>
      <CardWrapper>
        <p className="titles">{heading}</p>
        <div className="wrapper">
          <div className="card shadow">
            <img
              src={process.env.PUBLIC_URL + "/" + image}
              className="img-fluid"
            />
            <div className="info text-center my-auto">
              {/* {heading} */}

              <MyButton
                disabled={false}
                className="MyButton"
                endIcon={<MdOutlineKeyboardDoubleArrowRight />}
                onClick={() => navigate(`${path}`)}
                sx={{
                  width: "164px",
                  borderRadius: "10px",
                  ...style.subHeading,
                  cursor: "pointer",
                  ml: 0,
                }}
              >
                Go here
              </MyButton>
            </div>
          </div>
        </div>
      </CardWrapper>
    </>
  );
}

export default HoverCard;
