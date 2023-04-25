import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { IoBookSharp } from "react-icons/io5";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { BootstrapButton, BootstrapTooltip } from "../styleSheets/Style";
import { NavLink, useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { StyledMenu } from "../styleSheets/Style";
import Zoom from "@mui/material/Zoom";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Paper } from "@mui/material";
import TempCompo from "../Components/tempCompo";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Latex from "react-latex-next";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { MyButton } from "../styleSheets/Style";
import MenuDrawer from "../Components/MenuDrawer";
import { useAuth } from "../services/Context";
import HeaderNew from "../Components/HeaderNew";
import { fetchViewSolution } from "../services/Analysis_api";


function ViewSolution() {
  const { handlePageClick } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState("Verbal Ability");
  const { attemptId } = useParams();
  const [data, setData] = useState();
  const [show, setShow] = useState([]);
  const [index, setIndex] = useState(0);
  console.log(show);

  // function getting data on mounting
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => { 
  }, [])

  // function for fetching data

  const getData = async () => {
    const res = await fetchViewSolution(attemptId);
    if (res?.status == 200) {
      setData(res.data);
      setShow(res.data.varc);
    } else {
      console.log("error", res);
    }
  };

  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (sub) => {
    setAnchorEl(null);
    setSelected(sub);
    console.log(sub);
    if (sub === "Verbal Ability") {
      setShow(data.varc);
    }
    else if (sub === "Logical Reasoning") {
      setShow(data.lrdi);
    }
    else { 
       setShow(data.quants);
    }
    return setIndex(0);
  };

  return (
    <Box sx={{ display: "flex", width: "100vw", height: "100Vh" }}>
      <MenuDrawer />
      <Box component="main" sx={{ flexGrow: 1, p: 2, width: "calc(100% - 240px)", height: "100%" }}>
        <Box component="div" sx={{ height: "10%" }}>
          <HeaderNew />
        </Box>
        {/* Navigation bar  */}
        <Box
          component="div"
          sx={{
            display: "flex",
            gap: 2,
            height: "10%",
            paddingTop: "1em",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flexBasis: "10%" }}>
            <BootstrapButton
              id="demo-customized-button"
              aria-controls={openMenu ? "demo-customized-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? "true" : undefined}
              variant="contained"
              disableElevation
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon />}
              height={47}
              sx={{
                background: "#F1F4F9",
                "&:hover ,&:focus": { background: "#F1F4F9", color: "black" },
              }}
            >
              {selected}
            </BootstrapButton>

            <StyledMenu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              sx={{ ml: 4 }}
            >
              <MenuItem
                sx={{
                  backgroundColor: selected === "Verbal Ability" ? "#f5f5f5" : "",
                }}
                onClick={() => handleClose("Verbal Ability")}
                disableRipple
              >
                <IoBookSharp className="me-2" />
                Verbal Ability
              </MenuItem>
              <Divider sx={{ my: 0.5 }} />
              <MenuItem
                sx={{
                  backgroundColor: selected === "Logical Reasoning" ? "#f5f5f5" : "",
                }}
                onClick={() => handleClose("Logical Reasoning")}
                disableRipple
              >
                <IoBookSharp className="me-2" />
                Logical Reasoning
              </MenuItem>
              <Divider sx={{ my: 0.5 }} />
              <MenuItem sx={{ backgroundColor: selected === "Quants" ? "#f5f5f5" : "" }} onClick={() => handleClose("Quants")} disableRipple>
                <IoBookSharp className="me-2" />
                Quants
              </MenuItem>
            </StyledMenu>
          </div>

          <div
            style={{
              flexBasis: "80%",
              display: "flex",
              flexWrap: "wrap",
              columnGap: 6,
              rowGap: 3,
            }}
          >
            {show?.map((item, index) => (
              <BootstrapTooltip
                title={
                  <div className="py-2">
                    <div
                      style={{
                        color: "black",
                        fontSize: "13px",
                        fontFamily: "var(--inter)",
                        fontWeight: 600,
                        lineHeight: "1",
                      }}
                    >
                      Difficulty
                    </div>
                    <span
                      style={{
                        color: "var(--orange)",
                        fontSize: "18px",
                        fontFamily: "var(--inter)",
                        fontWeight: 800,
                      }}
                    >
                      Moderate
                    </span>
                  </div>
                }
                placement="top"
                TransitionComponent={Zoom}
                arrow
                // open={index == 3 && true}
              >
                <Avatar
                  sx={{
                    bgcolor: "#2196F3",
                    cursor: "pointer",
                    width: "33.95px",
                    height: "33.95px",
                    fontSize: "15px",
                    p: 2,
                  }}
                  alt="Remy Sharp"
                  src="/broken-image.jpg"
                  onClick={() => setIndex(index)}
                >
                  <Typography variant="paragraph" sx={{ color: "white" }}>
                    {" "}
                    {index + 1}
                  </Typography>
                </Avatar>
              </BootstrapTooltip>
            ))}
          </div>
        </Box>
        {/* Navigation bar end */}

        {/* Main center start */}
        <Box component="div" sx={{ display: "flex", gap: 3, height: "61%", mt: "1em" }}>
          {/* LEFT Main start */}
          <Box
            sx={{
              width: "80%",

              display: "flex",
              boxShadow: 3,
              boder: "none",
              borderRadius: 5,
            }}
            component={Paper}
          >
            <Box
              component="div"
              sx={{
                flexBasis: "60% ",
                textAlign: "justify",
                height: "100%",
                overflow: "scroll",
                p: 3,
              }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit do
            </Box>
            <Box
              component="div"
              sx={{
                flexBasis: "40%",
                textAlign: "justify",
                height: "100%",
                overflow: "scroll",
                p: 3,
              }}
            >
              <Typography fontWeight={600} variant="h6">
                QUESTION . {index + 1}
              </Typography>
              <div>
                <Typography variant="paragraph">
                  <Latex>{show[index]?.question || ""}</Latex>
                </Typography>
              </div>
              <div>
                <Typography variant="paragraph fw-bold">
                  <Latex>{show[index]?.correctAnswer || ""}</Latex>
                </Typography>
              </div>
              <Box component="div" sx={{ display: "flex" }}>
                <MyButton
                  sx={{
                    background: "var(--blue-new)",
                    width: "auto",
                    "&:hover": { background: "var(--blue-new)" },
                  }}
                  height={54}
                  startIcon={<img src="/solutionButton.png" alt="" className="img-fluid" />}
                >
                  Solutions
                </MyButton>
                <MyButton
                  sx={{
                    background: "var(--blue-new)",
                    width: "auto",
                    "&:hover": { background: "var(--blue-new)" },
                  }}
                  height={54}
                  startIcon={<img src="/viewSol-icon.png" alt="" className="img-fluid" />}
                >
                  View Solution
                </MyButton>
                <MyButton
                  sx={{
                    background: "#CFCFCF",
                    color: "black",
                    width: "auto",
                    "&:hover": { background: "#CFCFCF" },
                  }}
                  height={54}
                  startIcon={<img src="/playButton.png" alt="" className="img-fluid" />}
                >
                  Video Solution
                </MyButton>
              </Box>
            </Box>
          </Box>
          {/* left Main end */}

          {/* Right main start */}
          <Box
            sx={{
              width: "25%",
              background: "#F1F4F9",
              boxShadow: 3,
              textAlign: "justify",
              height: "100%",
              overflow: "scroll",
              p: 6,
              borderRadius: 5,
              position: "relative",
            }}
            component={Paper}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography sx={{ textAlign: "left", fontSize: "19.8px", fontWeight: 750 }}>Why did you get it wrong?</Typography>
              <FormControl sx={{ paddingTop: 1 }}>
                <FormLabel id="demo-radio-buttons-group-label">{""}</FormLabel>
                <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="female" name="radio-buttons-group">
                  <FormControlLabel value="Did not understand the concept" control={<Radio size="small" />} label="Did not understand the concept" />
                  <FormControlLabel
                    value="I understood the concept but failed to apply it correctly"
                    control={<Radio size="small" />}
                    label="I understood the concept but failed to apply it correctly"
                  />
                  <FormControlLabel value="I misread the question" control={<Radio size="small" />} label="I misread the question" />
                  <FormControlLabel value="I ran out of time" control={<Radio size="small" />} label="I ran out of time" />
                  <FormControlLabel value="Made a silly mistake" control={<Radio size="small" />} label="Made a silly mistake" />
                  <FormControlLabel value="Fell for the trap answer" control={<Radio size="small" />} label="Fell for the trap answer" />
                  <FormControlLabel value="Guessed the answer" control={<Radio size="small" />} label="Guessed the answer" />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              {" "}
              <Box
                sx={{
                  height: "2.5em",
                  width: "80%",
                  background: "#3B36DB",
                  borderRadius: "1em",
                  position: "absolute",
                  top: 0,
                  zIndex: 1000,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ color: "#FFE401" }}>Error Tracker</Typography>
                <img></img>
                <Typography>iQ GPT 1.0</Typography>
              </Box>
            </Box>
          </Box>
          {/* Right main end */}
        </Box>
        {/* Main center end */}

        {/* Lower cards section start */}
        <Box component="div" sx={{ height: "15%", py: "1em" }}>
          <TempCompo
            studentAttempted={show[index]?.studentsAttempted}
            attemptedCorrect={show[index]?.attemptedCorrect}
            duration={show.length && "duration" in show[index] ? show[index].duration : "NA"}
            avgTimeSpent={show[index]?.averageDuration}
            topperDuration={show[index]?.durationByTopper}
          />
        </Box>
        {/* Lower cards section end */}
      </Box>
    </Box>
  );
}

export default ViewSolution;
