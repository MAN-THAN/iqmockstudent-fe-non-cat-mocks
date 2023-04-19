import React from "react";
import MenuDrawer from "../Components/MenuDrawer";
import HeaderNew from "../Components/HeaderNew";
import { Box, Typography } from "@mui/material";
import { typographyStyles } from "../styleSheets/StyleNew";
import MultipleSelect from "../Components/DropdownComp";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { IoIosArrowForward } from "react-icons/io";
import Button from "@mui/material/Button";
import BarGrapgh from "../Components/BarGrapgh";
import Avatar from "@mui/material/Avatar";

const disableStyle = {
  ":disabled": {
    backgroundColor: "#E5E5E9",
    color: "black",
    fontWeight: 600,
    fontSize: 13,
    borderRadius: "5px",
    fontFamily: "var( --font-inter)",
    "& > span": {
      // apply style to child span element
      color: "green",

    },
  },
};

const GraphComp = () => {
  const instructionPoints = [
    { description: "I did not understand the concept", color: "#48E5DD" },
    {
      description: "I understood the concept but failed to apply it correctly",
      color: "#FF6CB6",
    },
    { description: "I misread the question", color: "#FFBC5E" },
    { description: "I ran out of time", color: "#4732CC" },
    { description: "I made a silly mistake", color: "#1D9274" },
    { description: "I fell for the trap answer", color: "#FF6238" },
    { description: "I guessed the answer", color: "#1D5C80" },
  ];

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
      {instructionPoints.map((item, _) => {
        return (
          <Box
            component="item"
            sx={{
              display: "flex",

              p: 1,
              flexBasis: "50%",
              textAlign: "left",
            }}
          >
            <Box
              sx={{
                bgcolor: item.color,
                borderRadius: "50%",
                marginRight: "5px",
                width: "21px",
                height: "21px",
              }}
            ></Box>
            <Typography variant="paragraph">{item.description}</Typography>
          </Box>
        );
      })}
    </Box>
  );
};

function ErrorTracker() {
  const Subjects = [
    { name: "Varc" },
    { name: "Quants" },
    {name: "LRdi",},
    {name: "MBA",},
    { name: "MIA" },
  ];

  return (
    <Box component="main" sx={{ display: "flex", height: "100vh" }}>
      <MenuDrawer />

      <Box sx={{ flexGrow: 1, p: 2, width: "calc(100% -240px)" }}>
        <Box component="header">
          <HeaderNew />
        </Box>

        <Box component="div" sx={{ mt: 4 }}>
          <MultipleSelect options={Subjects} />
          <Typography
            sx={{
              ...typographyStyles.mainHeading,
              pt: 2,
            }}
          >
            {" "}
            Error Tracker
          </Typography>
        </Box>

        <Box
          component="main"
          sx={{ display: "flex", width: "100%", height: "76Vh" }}
        >
          {/* Graph side div start */}
          <Box
            sx={{
              backgroundColor: "",
              flexBasis: "40%",
              borderRight: "2px solid #928F8F ",
              justifyContent: " ",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
              <BarGrapgh width={"97%"} legend={false} />
            </Box>
            <Box sx={{ mt: 2 }}>
              <GraphComp />
            </Box>
          </Box>
          {/* Graph side div end */}

          {/*Question side box start*/}
          <Box
            sx={{ flexBasis: "60%", px: 3, overflow: "scroll", height: "100%" }}
          >
            <Typography sx={{ ...typographyStyles.subHeading }}>
              Question Summary
            </Typography>

            {[...Array(10)].map((item, index) => (
              <Box sx={{ display: "flex", pt: 3, gap:2 }}>
              <div style={{width:"10px" ,height:"auto",borderRadius:"15px",backgroundColor:"#FFBD5E"}}></div>
                <Card
                  sx={{
                    maxWidth: " 100% ",
                    background: "#F6F7F8",
                    p: 2,
                    boxShadow: "none",
                  }}
                >
                  <CardContent sx={{ display: "flex", gap: 2 }}>
                    <Typography
                      sx={{
                        fontFamily: "var(--inter)",
                        fontSize: "19px",
                        fontWeight: 800,
                        lineHeight: "29px",
                        textAlign: "left",
                      }}
                    >
                      Q{index + 1}.
                    </Typography>
                    <Typography variant="paragraph" color="text.secondary">
                      Sohan started a business with a capital of RS. 80000.
                      After 6 months Mohan joined as a partner by investing Rs
                      65000. After one year they earned total profit RS. 20000.
                      What is share of shahin in the profit?
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "space-between", px: 3 }}>
                    <Box sx={{ display: "flex", columnGap:2, flexWrap:"wrap" , rowGap:2}}>
                      <Button
                        size="medium"
                        disabled={true}
                        variant="contained"
                        sx={{
                          ...disableStyle,
                          ":disabled": {
                            color: "#000000",
                          },
                          "& > span": {
                            color: "#00C838 !important",
                          },
                        }}
                      >
                        Difficulty:<span>Easy</span>
                      </Button>
                      <Button
                        size="medium"
                        disabled={true}
                        variant="contained"
                        sx={{
                          ...disableStyle,
                          ":disabled": {
                            color: "#636363",
                          },
                          "& > span": {
                            color: "#000000 !important",
                          },
                        }}
                      >
                        Time :<span>00:02:23</span>
                      </Button>
                      <Button
                        disabled={true}
                        sx={{
                          ...disableStyle,
                          ":disabled": {
                            color: "#636363",
                          },
                          "& > span": {
                            color: "black !important",
                          },
                        }}
                     
                        variant="contained"
                      >
                        Avg Time : <span>00:01:39</span>
                      </Button>
                    </Box>
                    <div>
                      <Button
                        size="medium"
                        endIcon={<IoIosArrowForward />}
                        sx={{ background: "#3A36DB", float: "end" }}
                        variant="contained"
                      >
                        Solution
                      </Button>
                    </div>
                  </CardActions>
                </Card>
              </Box>
            ))}
          </Box>
          {/*Question side box end*/}
        </Box>
      </Box>
    </Box>
  );
}

export default ErrorTracker;
