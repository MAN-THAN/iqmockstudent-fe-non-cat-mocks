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

        <div className="wrapper">
          <div
            className="card shadow"
            style={{ borderRadius: "50px", height: "14em" }}
          >
            <img
              src={process.env.PUBLIC_URL + "/" + image}
              className="img-fluid"
            />
            <div className="info text-center my-auto">
              {/* {heading} */}
              <button
                class="button-85 MyButton"
                role="button"
                onClick={() => navigate(`${path}`)}
              >
                Go here <MdOutlineKeyboardDoubleArrowRight />
              </button>
             
            </div>
          </div>
        </div>
      </CardWrapper>
    </>
  );
}

export default HoverCard;
