import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import { styled } from "@mui/material/styles";
import { tooltipClasses } from "@mui/material/Tooltip";
import { Typography } from "@mui/material";
import { SubHeading } from "../styleSheets/Style";
import {Card, CardContent} from "@mui/material";


import { useState } from "react";
export const TooltipCard = ({ tooltip, cardTitle, icon }) => {
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

  return (
    <BootstrapTooltip
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 300 }}
      title={tooltip}
      followCursor
    >
      <div
        className="card shadow flex-item"
        style={{
          width: "12.5em",
          height: "4.979375em",
          border: "1px solid white",
        }}
      >
        <div className="card-body d-flex flex-row justify-content-between align-items-center">
          <div className="flex-item ">
            <SubHeading className="card-title" sx={{ fontSize: 15 }}>
              {cardTitle}
            </SubHeading>

            <Typography variant="paragraph" sx={{ fontSize: "10px", mt: 0 }}>
              Potential Mark
            </Typography>
          </div>

          <div className="flex-item">
            <img src={icon} alt="" className="img-fluid" width={32} />
          </div>
        </div>
      </div>
    </BootstrapTooltip>
  );
};

export const LogoCard = ({ cardTitle, icon, style, infoIcon, select }) => {
  return (
    <div
      className="card shadow "
      style={{
        ...style,
        border: "1px solid white",
      }}
    >
      <div className="card-body d-flex flex-row-reverse flex-row justify-content-between align-items-center">
        {infoIcon && (
          <div className="flex-item">
            <img src={infoIcon} alt="" className="img-fluid" width={15} />
          </div>
        )}
        <div className="flex-item ">
          <SubHeading
            className="card-title"
            sx={{ fontSize: style.fontSize, mt: 1.5 }}
          >
            {cardTitle}
          </SubHeading>
        </div>

        <div className="flex-item">
          <img src={icon} alt="" className="img-fluid" width={style.iconSize? style.iconSize : 22 } />
        </div>
      </div>
       {select && select}
    </div>
  );
};


export const DetailCards = ({ heading, cardContent,logoPath }) => {
  const [isEnlarged, setIsEnlarged] = useState(false);
  return (
    <Card
      className={isEnlarged ? "enlarged" : ""}
      sx={{
        overflow: "scroll",
        width: "100%",
        height: "100%",
        borderRadius: "25px",
        boxShadow: "none",
      }}
      // onClick={() => setIsEnlarged(!isEnlarged)}
    >
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
          fontFamily: "var(--font-inter)",
        }}
      >
        <div className="d-flex">
          <img
            src={logoPath}
            className="img-fluid me-2"
            alt=""
            width={22}
          />
          <Typography variant="h4" color="black" fontSize={18}>
            {heading}
          </Typography>
        </div>

        <div>
          <img
            src="/CardsIcons/zoom.png"
            className="img-fluid cursor-pointer"
            width={22}
          />
        </div>
      </CardContent>

      <CardContent sx={{ pt: 0 }}>{cardContent}</CardContent>
    </Card>
  );
};

