import React from "react";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

const InfoCard = ({
  iconPath,
  label,
  value,
  infoIconPath,
  background,
  isTime,
  title,
}) => {
  return (
    <Card
      sx={{
        width: "12.146em",
        boxShadow: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5em 0",
        borderRadius: "0.9em",
        background,
        color: background && "white",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "90%",
          padding: 0,
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <img src={iconPath} className="img-fluid" width={27.48} />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5em" }}>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            {" "}
            <Typography
              sx={{
                fontSize: "23.52px",
                fontWeight: 700,
                fontFamily: "Inter",
                lineHeight: "0.9em",
              }}
            >
              {value}
            </Typography>
            {isTime ? (
              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: 500,
                  fontFamily: "serif",
                  lineHeight: "0.9em",
                }}
              >
                {" (sec)"}
              </Typography>
            ) : (
              <></>
            )}
          </Box>
          <Typography
            sx={{ fontSize: "10.66px", fontWeight: 600, fontFamily: "Inter" }}
          >
            {label}
          </Typography>
        </Box>
        {infoIconPath && (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Tooltip title={title} arrow>
              <img src={infoIconPath} className="img-fluid" />
            </Tooltip>
          </Box>
        )}
      </Box>
    </Card>
  );
};

export const TempCompo = ({
  studentAttempted,
  attemptedCorrect,
  duration,
  avgTimeSpent,
  topperDuration,
}) => {
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "1em",
          alignItems: "center",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <InfoCard
          iconPath="/click 1.svg"
          label="Student Attempted"
          value={`${studentAttempted}%`}
          infoIconPath="/info1.svg"
          title={
            "This shows number of students who have marked this question out of number of students attempted this mock."
          }
        />
        <InfoCard
          iconPath="/checked 1.svg"
          label="Attempted Correct"
          value={`${attemptedCorrect}%`}
          infoIconPath="/info1.svg"
          title={"This shows number of students who got this answer correct out of number of students who have attempted this question"}

        />
        <InfoCard
          iconPath={
            duration < avgTimeSpent
              ? "/CardsIcons/thumbUp.png"
              : "/CardsIcons/thumbDown.png"
          }
          label="Time spent by you"
          value={duration}
          infoIconPath="/info1.svg"
          title={"This shows time spent by you on this question."}

        />
        <InfoCard
          iconPath="/chronometer 1.svg"
          label="Average Time Spent"
          value={avgTimeSpent}
          infoIconPath="/info1.svg"
          isTime={true}
          title={"This shows average time spent by students who got this answer correct"}

        />
        <InfoCard
          iconPath="/chronometer 1.svg"
          label="Time Spent by Topper"
          value={topperDuration}
          infoIconPath="/info1.svg"
          background={"var(--dark-blue)"}
          isTime={true}
          title={"This shows time spent by topper on this question"}

        />
      </Box>
    </React.Fragment>
  );
};
