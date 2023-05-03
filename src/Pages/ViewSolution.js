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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Latex from "react-latex-next";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import MenuDrawer from "../Components/MenuDrawer";
import { useAuth } from "../services/Context";
import HeaderNew from "../Components/HeaderNew";
import { fetchViewSolution } from "../services/Analysis_api";
import { LogoButton } from "../Common-comp/Buttons";
import { TempCompo } from "../Components/tempCompo";
import Modal from "@mui/material/Modal";
import { postToErrorTracker } from "../services/Analysis_api";
import MultipleSelect from "../Common-comp/SelectField";

export default function ViewSolution() {
  const { handlePageClick } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState("varc");
  const { attemptId } = useParams();
  const [data, setData] = useState();
  const [show, setShow] = useState([]);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const [viewSol, setViewSoln] = useState(false);
  const [errTrackerVA, setTrackerVA] = useState([]);
  const [errTrackerLR, setTrackerLR] = useState([]);
  const [errTrackerQU, setTrackerQU] = useState([]);
  const [errValue, setErrValue] = useState("");
  const Subjects = [{ name: "VARC", value : "varc" }, { name: "LRDI", value : "lrdi" }, { name: "Quants", value : "quants" }, ];
  console.log(data);
  console.log(open);
  console.log(index);

  console.log(show);
  // function getting data on mounting
  useEffect(() => {
    getData();
  }, []);

  // function for fetching data

  const getData = async () => {
    const res = await fetchViewSolution(attemptId);
    if (res?.status == 200) {
      setData(res.data);
      setShow(res.data[selected]);
      setTrackerVA(res.data.varc);
      setTrackerLR(res.data.lrdi);
      setTrackerQU(res.data.quants);
    } else {
      console.log("error", res);
    }
  };

  // const openMenu = Boolean(anchorEl);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleFilter = (sub) => {
  //   setAnchorEl(null);
  //   setSelected(sub);
  //   console.log(sub);
  //   if (sub === "Verbal Ability") {
  //     setShow(data?.varc);
  //   } else if (sub === "Logical Reasoning") {
  //     setShow(data?.lrdi);
  //   } else if (sub === "Quants") {
  //     setShow(data?.quants);
  //   }
  //   return setIndex(0);
  // };

  // Changing sectionwise data
  
  useEffect(() => {
    console.log(data);
    if (data !== undefined) { 
      if (selected === "varc") {
        setShow(data?.varc);
      }
      if (selected === "lrdi") {
        setShow(data?.lrdi);
      }
      if (selected === "quants") {
        setShow(data?.quants);
      }
    }
    console.log(selected);
    // console.log(data[selected]);
  }, [selected]);

  const buttonStyle = {
    background: "var(--blue-new)",
    color: "white",
    width: "auto",
    height: 37,
    borderRadius: "10.44px",
    fontSize: "9px",
    fontWeight: "500",
    fontFamily: "var(--font-inter)",
    iconSize: 13,
    p: 2,
  };
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 750,
    textAlign: "",
    height: 500,
    bgcolor: "white",
    borderRadius: "10px ",
    boxShadow: 24,
    backroundSize: "cover",
    backgroundRepeat: "no-repeat",
    objectfit: "cover",
  };

  const handleErrorForm = async (e) => {
    console.log(e.target.value);
    setErrValue(e.target.value);
    let type;
    if (selected === "Verbal Ability") {
      type = "varc";
    } else if (selected === "Logical Reasoning") {
      type = "lrdi";
    } else if (selected === "Quants") {
      type = "quants";
    }
    const selectedObj = show[index];
    console.log(selectedObj);
    const payload = {
      question_id: selectedObj.question_id,
      question: selectedObj.question,
      difficulty: selectedObj.difficulty,
      topic: selectedObj.topic,
      error: e.target.value,
      duration: selectedObj.duration,
      averageDuration: selectedObj.averageDuration,
      explanations: selectedObj.explanations,
      isCorrect: selectedObj.correctAnswer === selectedObj.studentAnswer ? "correct" : "incorrect",
    };
    console.log(show[index]);
    const res = await postToErrorTracker(attemptId, type, payload);
    console.log(res);
    if (res?.status == 200) {
      if (type == "varc") {
        const tempObj = { question_id: selectedObj.question_id, question: selectedObj.question, error: e.target.value };
        let arr = [...errTrackerVA];
        arr.splice(index, 1, tempObj);
        setTrackerVA(arr);
      }
      if (type == "lrdi") {
        const tempObj = { question_id: selectedObj.question_id, question: selectedObj.question, error: e.target.value };
        let arr = [...errTrackerLR];
        arr.splice(index, 1, tempObj);
        setTrackerLR(arr);
      }
      if (type == "quants") {
        const tempObj = { question_id: selectedObj.question_id, question: selectedObj.question, error: e.target.value };
        let arr = [...errTrackerQU];
        arr.splice(index, 1, tempObj);
        setTrackerQU(arr);
      }
    }
  };

  // making state empty after question change
  useEffect(() => {
    if (selected === "Verbal Ability") {
      const tempObj = errTrackerVA[index];
      console.log(tempObj);
      if (tempObj?.error !== undefined) {
        setErrValue(tempObj.error);
      } else {
        setErrValue("");
      }
    } else if (selected === "Logical Reasoning") {
      const tempObj = errTrackerLR[index];
      console.log(tempObj);
      if (tempObj?.error !== undefined) {
        setErrValue(tempObj.error);
      } else {
        setErrValue("");
      }
    } else if (selected === "Quants") {
      const tempObj = errTrackerQU[index];
      console.log(tempObj);
      if (tempObj?.error !== undefined) {
        setErrValue(tempObj.error);
      } else {
        setErrValue("");
      }
    }
  }, [index]);
  console.log(errTrackerVA, errTrackerLR, errTrackerQU);
  console.log(errValue);
  console.log(show);
  console.log(selected);

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
            {/* <BootstrapButton
              id="demo-customized-button"
              aria-controls={openMenu ? "demo-customized-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? "true" : undefined}
              variant="contained"
              // disableElevation
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
              onClose={handleFilter}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              sx={{ ml: 4 }}
            >
              <MenuItem
                sx={{
                  backgroundColor: selected === "Verbal Ability" ? "#f5f5f5" : "",
                }}
                onClick={() => handleFilter("Verbal Ability")}
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
                onClick={() => handleFilter("Logical Reasoning")}
                disableRipple
              >
                <IoBookSharp className="me-2" />
                Logical Reasoning
              </MenuItem>
              <Divider sx={{ my: 0.5 }} />
              <MenuItem sx={{ backgroundColor: selected === "Quants" ? "#f5f5f5" : "" }} onClick={() => handleFilter("Quants")} disableRipple>
                <IoBookSharp className="me-2" />
                Quants
              </MenuItem>
            </StyledMenu> */}
            <MultipleSelect options={Subjects} setType={setSelected} />
          </div>
          <NavigationAvatar
            Data={show}
            setInd={setIndex}
            selectedQuestionIndex={index}
            difficulty={show.length && show[index]?.difficulty}
            setViewSoln={setViewSoln}
          />
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
              display={show[index]?.isPara === "Yes" ? "block" : "none"}
              sx={{
                flexBasis: "60%",
                textAlign: "justify",
                height: "100%",
                overflow: "scroll",
                p: 3,
              }}
            >
              <Latex>{show[index]?.paragraph || ""}</Latex>
            </Box>
            <Box
              component="div"
              sx={{
                flexBasis: show[index]?.isPara === "Yes" ? "40%" : "100%",
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
                {/* <Typography variant="paragraph fw-bold">
                  <Latex>{show[index]?.correctAnswer || ""}</Latex>
                </Typography> */}
                {show[index]?.type === 1 ? (
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    {" "}
                    <FormControlLabel
                      checked={
                        show[index]?.options[0] === show[index]?.correctAnswer
                          ? true
                          : show[index]?.options[0] === show[index]?.studentAnswer
                          ? true
                          : false
                      }
                      value={0}
                      control={
                        <Radio
                          color={
                            show[index]?.options[0] === show[index]?.correctAnswer
                              ? "success"
                              : show[index]?.options[0] === show[index]?.studentAnswer
                              ? "error"
                              : "default"
                          }
                        />
                      }
                      label={
                        <Typography
                          color={
                            show[index]?.options[0] === show[index]?.correctAnswer
                              ? "green"
                              : show[index]?.options[0] === show[index]?.studentAnswer
                              ? "red"
                              : "black"
                          }
                          marginTop={2}
                        >
                          <Latex>{show[index]?.options[0] || ""}</Latex>
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      checked={
                        show[index]?.options[1] === show[index]?.correctAnswer
                          ? true
                          : show[index]?.options[1] === show[index]?.studentAnswer
                          ? true
                          : false
                      }
                      value={1}
                      control={
                        <Radio
                          color={
                            show[index]?.options[1] === show[index]?.correctAnswer
                              ? "success"
                              : show[index]?.options[1] === show[index]?.studentAnswer
                              ? "error"
                              : "default"
                          }
                        />
                      }
                      label={
                        <Typography
                          color={
                            show[index]?.options[1] === show[index]?.correctAnswer
                              ? "green"
                              : show[index]?.options[1] === show[index]?.studentAnswer
                              ? "red"
                              : "black"
                          }
                          marginTop={2}
                        >
                          <Latex>{show[index]?.options[1] || ""}</Latex>
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      checked={
                        show[index]?.options[2] === show[index]?.correctAnswer
                          ? true
                          : show[index]?.options[2] === show[index]?.studentAnswer
                          ? true
                          : false
                      }
                      value={0}
                      control={
                        <Radio
                          color={
                            show[index]?.options[2] === show[index]?.correctAnswer
                              ? "success"
                              : show[index]?.options[2] === show[index]?.studentAnswer
                              ? "error"
                              : "default"
                          }
                        />
                      }
                      label={
                        <Typography
                          color={
                            show[index]?.options[2] === show[index]?.correctAnswer
                              ? "green"
                              : show[index]?.options[2] === show[index]?.studentAnswer
                              ? "red"
                              : "black"
                          }
                          marginTop={2}
                        >
                          <Latex>{show[index]?.options[2] || ""}</Latex>
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      checked={
                        show[index]?.options[3] === show[index]?.correctAnswer
                          ? true
                          : show[index]?.options[3] === show[index]?.studentAnswer
                          ? true
                          : false
                      }
                      value={0}
                      control={
                        <Radio
                          color={
                            show[index]?.options[3] === show[index]?.correctAnswer
                              ? "success"
                              : show[index]?.options[3] === show[index]?.studentAnswer
                              ? "error"
                              : "default"
                          }
                        />
                      }
                      label={
                        <Typography
                          color={
                            show[index]?.options[3] === show[index]?.correctAnswer
                              ? "green"
                              : show[index]?.options[3] === show[index]?.studentAnswer
                              ? "red"
                              : "black"
                          }
                          marginTop={2}
                        >
                          <Latex>{show[index]?.options[3] || ""}</Latex>
                        </Typography>
                      }
                    />
                  </Box>
                ) : (
                  <>
                    {" "}
                    <Typography color="black" fontWeight={600}>
                      Your Answer :{" "}
                      {show[index]?.studentAnswer == (null || undefined || "") ? "NA" : <Latex>{show[index]?.studentAnswer || ""}</Latex>}
                    </Typography>
                    <Typography marginTop={2} color="green" fontWeight={600}>
                      Correct Answer : {<Latex>{show[index]?.correctAnswer || ""}</Latex>}
                    </Typography>
                  </>
                )}
              </div>
              <Box
                component="div"
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  flexWrap: "wrap",
                  width: "25em",
                  rowGap: 2,
                  marginTop: 2,
                }}
              >
                {/* <LogoButton
                  name={"Solutions"}
                  icon={"/solutionButton.png"}
                  style={{
                    ...buttonStyle,
                    "&:hover": { background: "var(--blue-new)" },
                    "& $icon": { fontSize: 2 },
                  }}
                /> */}
                <Box onClick={() => setViewSoln(true)}>
                  {" "}
                  <LogoButton
                    name={"  View Solution"}
                    icon={"/viewSol-icon.png"}
                    style={{
                      ...buttonStyle,
                      "&:hover": { background: "var(--blue-new)" },
                    }}
                  />
                </Box>
                <Box onClick={handleOpenModal}>
                  {" "}
                  <LogoButton
                    name={" Video Solution"}
                    icon={"/playButton.png"}
                    style={{
                      ...buttonStyle,
                      color: "black",
                      background: "#CFCFCF",

                      "&:hover": { background: "#CFCFCF" },
                    }}
                  />
                </Box>
              </Box>
              {viewSol ? (
                <Box marginTop="2em">
                  <Typography fontWeight={700}>
                    <Latex>{show[index]?.explanations || ""}</Latex>
                  </Typography>
                </Box>
              ) : (
                <></>
              )}
            </Box>
          </Box>
          {/* MOdal for video link */}
          <div>
            {" "}
            <Modal open={open} onClose={handleCloseModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
              <Box sx={style}>
                <iframe width="100%" height="100%" src={show[index]?.videoLink}></iframe>
              </Box>
            </Modal>
          </div>
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
              p: 3,
              borderRadius: 5,
            }}
            component={Paper}
          >
            <Box
              sx={{
                width: "100%",

                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between ",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  color: "#3B36DB",
                  fontSize: 19,
                  fontFamily: "var(--font-inter)",
                  fontWeight: "900",
                }}
              >
                Error Tracker
              </Typography>
              <Typography
                sx={{
                  color: "#3B36DB",
                  fontSize: 19,
                  fontFamily: "var(--font-inter)",
                  fontWeight: "900",
                }}
              >
                iQ GPT 1.0{" "}
                <span>
                  <img src="/viewTracker.png" className="img-fluid mb-1" alt="" />
                </span>
              </Typography>
            </Box>
            <hr />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ textAlign: "left", fontSize: "19.8px", fontWeight: 750 }}>Why did you get it wrong?</Typography>
              <FormControl sx={{ paddingTop: 1, fontFamily: "var(--font-inter)", fontWeight: 800, textAlign: "start" }}>
                <FormLabel id="demo-radio-buttons-group-label">{""}</FormLabel>
                <RadioGroup onChange={handleErrorForm} value={errValue} aria-labelledby="demo-radio-buttons-group-label" name="radio-buttons-group">
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

const NavigationAvatar = ({ Data, setInd, selectedQuestionIndex, difficulty, setViewSoln }) => {
  return (
    <div
      style={{
        flexBasis: "80%",
        display: "flex",
        flexWrap: "wrap",
        columnGap: 6,
        rowGap: 3,
      }}
    >
      {Data?.map((_, ind) => (
        <BootstrapTooltip
          title={
            <div className="py-2" key={ind}>
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
                {difficulty}
              </span>
            </div>
          }
          placement="top"
          TransitionComponent={Zoom}
          arrow
          open={ind == selectedQuestionIndex && true}
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
            onClick={() => {
              setInd(ind);
              setViewSoln(false);
            }}
          >
            <Typography variant="paragraph" sx={{ color: "white" }}>
              {" "}
              {ind + 1}
            </Typography>
          </Avatar>
        </BootstrapTooltip>
      ))}
    </div>
  );
};
