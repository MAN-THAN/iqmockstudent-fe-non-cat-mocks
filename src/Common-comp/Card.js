import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import { styled } from "@mui/material/styles";
import { tooltipClasses } from "@mui/material/Tooltip";
import { Box, Typography } from "@mui/material";
import { SubHeading } from "../styleSheets/Style";
import { Card, CardContent } from "@mui/material";

import { useState } from "react";
export const TooltipCard = ({ tooltip, title, values, icon }) => {
  // Tooltip Customisation
  const BootstrapTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
    },
  }));

  return (
    <BootstrapTooltip TransitionComponent={Fade} TransitionProps={{ timeout: 300 }} title={tooltip} followCursor>
      <div
        className="card shadow flex-item flex-fill "
        style={{
          // minWidth: "45%",
          maxWidth: "12em",
          minWidth: "10em",
          height: "4.979375em",
          border: "1px solid white",
        }}
      >
        <div className="card-body d-flex flex-row justify-content-between align-items-center ">
          <div className="flex-item pt-3">
            <SubHeading className="card-title" sx={{ fontSize: 15, lineHeight: 0, my: "auto" }}>
              {values}
            </SubHeading>

            <Typography variant="paragraph" sx={{ fontSize: "10px" }}>
              {title}
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
          <SubHeading className="card-title" sx={{ fontSize: style.fontSize, mt: 1.5 }}>
            {cardTitle}
          </SubHeading>
        </div>

        <div className="flex-item">
          <img src={icon} alt="" className="img-fluid" width={style.iconSize ? style.iconSize : 22} />
        </div>
      </div>
      {select && select}
    </div>
  );
};

export const DetailCards = ({ heading, cardContent, logoPath, dataLength }) => {
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
        <div style={{ display: "flex", flexDirection: "row", gap: "10px" }} className="d-flex">
          <img src={logoPath} className="img-fluid me-2" alt="" width={22} />
          <Typography fontFamily={"Poppins"} variant="h4" color="black" fontSize={18}>
            {heading}
          </Typography>
        </div>
        {dataLength ? (
          <Box sx={{ display: "flex", flexDirection: "row", gap: "10px"}}>
            <Typography sx={{ fontSize: "14px", fontWeight: 700 }}>Results :</Typography>
            <Typography sx={{ fontSize: "14px", fontWeight: 700, color: "#6D6D6D" }}>{dataLength}</Typography>
          </Box>
        ) : (
          <></>
        )}
      </CardContent>
      <div style={{ border: "1px solid #E1E1E1", width: "100%", height: "1px" }}></div>
      <CardContent sx={{ pt: 0 }}>{cardContent}</CardContent>
    </Card>
  );
};
