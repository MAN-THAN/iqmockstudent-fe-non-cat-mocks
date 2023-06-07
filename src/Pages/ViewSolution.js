import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { BootstrapTooltip, ModifyButton } from "../styleSheets/Style";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Zoom from "@mui/material/Zoom";
import MenuItem from "@mui/material/MenuItem";
import { motion } from "framer-motion";
import { Paper, Popover, Card } from "@mui/material";
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
import { BsChevronDoubleRight } from "react-icons/bs";
import OutlinedInput from "@mui/material/OutlinedInput";

import Select from "@mui/material/Select";
import {
  IncorrectDetailing,
  CorrectDetailing,
  SkippedDetailing,
} from "../services/DataFiles";
import { useMemo } from "react";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";

export default function ViewSolution() {
  const navigate = useNavigate();
  const { menuBarOpen, setMenuBarOpen, Backdrop, isLoading, setLoading } =
    useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState("varc");
  const { attemptId, mockId } = useParams();
  const [data, setData] = useState();
  const [show, setShow] = useState([]);
  const [index, setIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const [viewSol, setViewSoln] = useState(false);
  const [errTrackerVA, setTrackerVA] = useState([]);
  const [errTrackerLR, setTrackerLR] = useState([]);
  const [errTrackerQU, setTrackerQU] = useState([]);
  const [errValue, setErrValue] = useState("");
  const { state } = useLocation();
  const [defVal, setDefVal] = useState("varc");
  const [isVideo, setVideo] = useState();
  const ref = useRef(null);

  const [popoverAnchorEl, setPopoverAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setPopoverAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopoverAnchorEl(null);
  };

  const popOpen = Boolean(popoverAnchorEl);

  const options = [
    { name: "VARC", value: "varc" },
    { name: "LRDI", value: "lrdi" },
    { name: "Quants", value: "quants" },
  ];
  const ITEM_HEIGHT = "48";
  const ITEM_PADDING_TOP = 3;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
  };

  const showToastMessage = (msg) => {
    toast.error(
      msg == undefined
        ? "Some error occurred! Please reload the page."
        : msg.toUpperCase(),
      {
        position: toast.POSITION.TOP_CENTER,
      }
    );
    return (ref.current.style.display = "none");
  };
  console.log(data);
  console.log(open);
  console.log(index);

  // console.log(data);
  // console.log(open);
  console.log("show", show[index], index);

  // getting a specific question om mounting

  useEffect(() => {
    const func = async () => {
      if (state !== null) {
        console.log("flow2");
        const questionId = state.question_id;
        setLoading(true);
        const res = await fetchViewSolution(attemptId, mockId);
        if (res?.status == 200) {
          setData(res.data);
          res.data?.varc.map((item, index) => {
            if (item.question_id === questionId) {
              console.log(item, index);
              setIndex(index);
              setDefVal("varc");
              setShow(res.data.varc);
              setLoading(false);
            }
          });
          res.data?.lrdi.map((item, index) => {
            if (item.question_id === questionId) {
              console.log(item, index);
              setIndex(index);
              setDefVal("lrdi");
              setShow(res.data.lrdi);
              setLoading(false);
            }
          });
          res.data?.quants.map((item, index) => {
            if (item.question_id === questionId) {
              console.log(item, index);
              setIndex(index);
              setDefVal("quants");
              setShow(res.data.quants);
              setLoading(false);
            }
          });
          // setShow(res.data[selected])
          setTrackerVA(res.data.errorData?.varc);
          setTrackerLR(res.data.errorData?.lrdi);
          setTrackerQU(res.data.errorData?.quants);
        }
      }
    };
    func();
  }, []);
  console.log(data);

  // function getting data on mounting
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const res = await fetchViewSolution(attemptId, mockId);
        if (res?.status == 200) {
          setData(res.data);
          setShow(res.data.varc);
          setTrackerVA(res.data.errorData?.varc);
          setTrackerLR(res.data.errorData?.lrdi);
          setTrackerQU(res.data.errorData?.quants);
          setLoading(false);
        } else {
          setLoading(false);
          showToastMessage();
          console.log("error", res);
        }
      } catch (err) {
        setLoading(false);
        console.log(err?.response?.data?.msg);
        showToastMessage(err?.response?.data?.msg);
      }
    };
    if (state === null) {
      getData();
    }
  }, []);

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

    return setIndex(0);
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
    if (selected === "varc") {
      type = "varc";
    } else if (selected === "lrdi") {
      type = "lrdi";
    } else if (selected === "quants") {
      type = "quants";
    }
    const selectedObj = show[index];
    console.log("slwlwlwlwl", selectedObj);

    const payload = {
      question_id: selectedObj.question_id,
      question: selectedObj.question,
      difficulty: selectedObj.difficulty,
      topic: selectedObj.topic,
      error: e.target.value,
      duration: selectedObj.duration,
      averageDuration: selectedObj.averageDuration,
      explanations: selectedObj.explanations,
      isCorrect:
        selectedObj.correctAnswer === selectedObj.studentAnswer
          ? "correct"
          : selectedObj.stage === 0 ||
            selectedObj.stage === 2 ||
            selectedObj.stage === 3
          ? "skipped"
          : "incorrect",
    };

    const res = await postToErrorTracker(attemptId, type, payload);
    console.log(res);
    if (res?.status == 200) {
      console.log(index);
      if (type == "varc") {
        const tempObj = {
          question_id: selectedObj.question_id,
          question: selectedObj.question,
          error: e.target.value,
        };
        let arr = [...errTrackerVA];
        if (index < arr.length) {
          arr.splice(index, 1, tempObj);
        } else {
          arr[index] = tempObj;
        }
        setTrackerVA(arr);
        // sessionStorage.setItem("errTrackerVA", JSON.stringify(arr));
      }
      if (type == "lrdi") {
        const tempObj = {
          question_id: selectedObj.question_id,
          question: selectedObj.question,
          error: e.target.value,
        };
        let arr = [...errTrackerLR];
        if (index < arr.length) {
          arr.splice(index, 1, tempObj);
        } else {
          arr[index] = tempObj;
        }
        setTrackerLR(arr);
        // sessionStorage.setItem("errTrackerLR", JSON.stringify(errTrackerLR));
      }
      if (type == "quants") {
        const tempObj = {
          question_id: selectedObj.question_id,
          question: selectedObj.question,
          error: e.target.value,
        };
        let arr = [...errTrackerQU];
        if (index < arr.length) {
          arr.splice(index, 1, tempObj);
        } else {
          arr[index] = tempObj;
        }
        setTrackerQU(arr);
        // sessionStorage.setItem("errTrackerQU", JSON.stringify(errTrackerQU));
      }
    }
  };

  // making state empty after question change
  useEffect(() => {
    if (selected === "varc") {
      const tempObj = errTrackerVA?.[index];
      console.log(tempObj);
      if (tempObj?.error !== undefined) {
        setErrValue(tempObj.error);
      } else {
        setErrValue("");
      }
    } else if (selected === "lrdi") {
      const tempObj = errTrackerLR?.[index];
      console.log(tempObj);
      if (tempObj?.error !== undefined) {
        setErrValue(tempObj.error);
      } else {
        setErrValue("");
      }
    } else if (selected === "quants") {
      const tempObj = errTrackerQU?.[index];
      console.log(tempObj);
      if (tempObj?.error !== undefined) {
        setErrValue(tempObj.error);
      } else {
        setErrValue("");
      }
    }
  }, [index, errTrackerVA, errTrackerLR, errTrackerQU, selected]);

  // setting into local

  // useEffect(() => {
  //   if (JSON.parse(localStorage.getItem("errTrackerVA")).length > 0) {
  //     localStorage.setItem("errTrackerVA", JSON.stringify(errTrackerVA));
  //     console.log("fewfewfw");
  //   }
  //   localStorage.setItem("errTrackerLR", JSON.stringify(errTrackerLR));
  //   localStorage.setItem("errTrackerQU", JSON.stringify(errTrackerQU));
  // }, [index]);
  console.log(errTrackerVA, errTrackerLR, errTrackerQU);

  // console.log(errValue);
  // console.log(show);
  // console.log(selected);
  const [errorOptions, setErrorOptions] = useState([]);

  //For changing  the options error card
  useMemo(() => {
    if (show && show[index]) {
      const options =
        show[index].stage === 0 ||
        show[index].stage === 2 ||
        show[index].stage === 3 // 0 ,2 or 3 stage for skipped
          ? SkippedDetailing
          : show[index].stage === (1 || 4) &&
            show[index].studentAnswer === show[index].correctAnswer // 1 or 4 for attempted
          ? CorrectDetailing
          : IncorrectDetailing;
      setErrorOptions(options.slice(1));
    }
    console.log("datatattaftaf", errorOptions);
  }, [index, show]);
  console.log(selected);
  console.log(defVal);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [viewSol]);

  return (
    <>
      <ToastContainer />
      <Box sx={{ width: "100vw", height: "100Vh", p: 2 }}>
        <MenuDrawer />
        <Box component="main" sx={{ ml: "65px", height: "100%" }} ref={ref}>
          <Backdrop
            sx={{
              zIndex: (theme) => theme.zIndex.drawer - 1,
              color: "#fff",
            }}
            open={menuBarOpen}
            onClick={() => setMenuBarOpen(false)}
          />
          <Box component="div" sx={{ height: "10%" }}>
            <HeaderNew />
          </Box>
          {isLoading ? (
            <div
              className="d-flex align-items-center flex-column gap-2 justify-content-center"
              style={{ width: "100%", height: "80%" }}
            >
              <div class="loading-container">
                <div class="loading"></div>
                <div id="loading-text">Loading...</div>
              </div>
            </div>
          ) : (
            <>
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
                <div>
                  {/* <MultipleSelect options={Subjects} setType={setSelected} /> */}
                  <FormControl
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      columnGap: 3,
                    }}
                  >
                    <Select
                      defaultValue={defVal}
                      // value={selected}
                      onChange={(e) => setSelected(e.target.value)}
                      input={
                        <OutlinedInput
                          sx={{
                            width: 127,
                            borderRadius: 2,
                            height: 32,
                            fontSize: "12px",
                            fontWeight: 700,
                            fontFamily: "var(--font-inter)",

                            ".MuiOutlinedInput-notchedOutline": {
                              border: 1,
                              borderColor: "#809EB9",
                            },
                            "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                              {
                                border: 1,
                                borderColor: "#809EB9",
                              },
                            "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                              {
                                border: 2,
                                borderColor: "#809EB9",
                              },
                          }}
                        />
                      }
                      // renderValue={(selected) => {
                      //   if (selected.length === 0) {
                      //     return <em>Select{ " " + type }</em>;
                      //   }

                      //   return selected;
                      // }}
                      MenuProps={MenuProps}
                      inputProps={{ "aria-label": "Select value" }}
                    >
                      <MenuItem value={""} disabled>
                        <em>Select</em>
                      </MenuItem>
                      {options &&
                        options.map((item, _) => (
                          <MenuItem
                            key={item.name}
                            value={item.value}
                            sx={{
                              fontFamily: "var(--font-inter)",
                              fontSize: "11px",
                              fontWeight: "600",
                            }}
                          >
                            {item.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </div>

                <NavigationAvatar
                  Data={show}
                  setInd={setIndex}
                  selectedQuestionIndex={index}
                  difficulty={show && show[index]?.difficulty}
                  setViewSoln={setViewSoln}
                />
              </Box>
              {/* Navigation bar end */}

              {/* Main center start */}
              <Box
                component="div"
                sx={{
                  display: "flex",
                  gap: 1,
                  height: "75vh",
                  mt: "1em",
                  pb: 1,
                }}
              >
                {/* LEFT Main start */}
                <div
                  className="flex-column gap-3 "
                  style={{
                    width: "75%",
                    display: "flex",
                    boxShadow: 3,
                    border: "none",
                    borderRadius: 5,
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      boxShadow: 3,
                      border: "none",
                      borderRadius: 5,
                      height: "78%",
                    }}
                    component={Paper}
                  >
                    <Box
                      component="div"
                      display={
                        show && show[index]?.isPara === "Yes" ? "block" : "none"
                      }
                      sx={{
                        flexBasis: "60%",
                        textAlign: "justify",
                        height: "100%",
                        overflow: "scroll",
                        p: 3,
                      }}
                    >
                      <Latex>{(show && show[index]?.paragraph) || ""}</Latex>
                    </Box>
                    <Box
                      component="div"
                      sx={{
                        flexBasis:
                          show && show[index]?.isPara === "Yes"
                            ? "40%"
                            : "100%",
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
                          <Latex>{(show && show[index]?.question) || ""}</Latex>
                        </Typography>
                      </div>
                      <div>
                        {/* <Typography variant="paragraph fw-bold">
                  <Latex>{show[index]?.correctAnswer || ""}</Latex>
                </Typography> */}
                        {show[index]?.type === 1 ? (
                          <Box
                            sx={{ display: "flex", flexDirection: "column" }}
                          >
                            {" "}
                            <FormControlLabel
                              checked={
                                show &&
                                show[index]?.options[0] ===
                                  show[index]?.correctAnswer
                                  ? true
                                  : show[index]?.options[0] ===
                                    show[index]?.studentAnswer
                                  ? true
                                  : false
                              }
                              value={0}
                              control={
                                <Radio
                                  color={
                                    show &&
                                    show[index]?.options[0] ===
                                      show[index]?.correctAnswer
                                      ? "success"
                                      : show[index]?.options[0] ===
                                        show[index]?.studentAnswer
                                      ? "error"
                                      : "default"
                                  }
                                  disableRipple
                                />
                              }
                              label={
                                <Typography
                                  color={
                                    show &&
                                    show[index]?.options[0] ===
                                      show[index]?.correctAnswer
                                      ? "#63B31E"
                                      : show[index]?.options[0] ===
                                        show[index]?.studentAnswer
                                      ? "#E94504"
                                      : "black"
                                  }
                                  marginTop={2}
                                >
                                  <Latex>
                                    {(show && show[index]?.options[0]) || ""}
                                  </Latex>
                                </Typography>
                              }
                            />
                            <FormControlLabel
                              checked={
                                show &&
                                show[index]?.options[1] ===
                                  show[index]?.correctAnswer
                                  ? true
                                  : show[index]?.options[1] ===
                                    show[index]?.studentAnswer
                                  ? true
                                  : false
                              }
                              value={1}
                              control={
                                <Radio
                                  color={
                                    show &&
                                    show[index]?.options[1] ===
                                      show[index]?.correctAnswer
                                      ? "success"
                                      : show[index]?.options[1] ===
                                        show[index]?.studentAnswer
                                      ? "error"
                                      : "default"
                                  }
                                  disableRipple
                                />
                              }
                              label={
                                <Typography
                                  color={
                                    show &&
                                    show[index]?.options[1] ===
                                      show[index]?.correctAnswer
                                      ? "#63B31E"
                                      : show[index]?.options[1] ===
                                        show[index]?.studentAnswer
                                      ? "#E94504"
                                      : "black"
                                  }
                                  marginTop={2}
                                >
                                  <Latex>
                                    {(show && show[index]?.options[1]) || ""}
                                  </Latex>
                                </Typography>
                              }
                            />
                            <FormControlLabel
                              checked={
                                show &&
                                show[index]?.options[2] ===
                                  show[index]?.correctAnswer
                                  ? true
                                  : show[index]?.options[2] ===
                                    show[index]?.studentAnswer
                                  ? true
                                  : false
                              }
                              value={0}
                              control={
                                <Radio
                                  color={
                                    show &&
                                    show[index]?.options[2] ===
                                      show[index]?.correctAnswer
                                      ? "success"
                                      : show[index]?.options[2] ===
                                        show[index]?.studentAnswer
                                      ? "error"
                                      : "default"
                                  }
                                  disableRipple
                                />
                              }
                              label={
                                <Typography
                                  color={
                                    show &&
                                    show[index]?.options[2] ===
                                      show[index]?.correctAnswer
                                      ? "#63B31E"
                                      : show[index]?.options[2] ===
                                        show[index]?.studentAnswer
                                      ? "#E94504"
                                      : "black"
                                  }
                                  marginTop={2}
                                >
                                  <Latex>
                                    {(show && show[index]?.options[2]) || ""}
                                  </Latex>
                                </Typography>
                              }
                            />
                            <FormControlLabel
                              checked={
                                show &&
                                show[index]?.options[3] ===
                                  show[index]?.correctAnswer
                                  ? true
                                  : show[index]?.options[3] ===
                                    show[index]?.studentAnswer
                                  ? true
                                  : false
                              }
                              value={0}
                              control={
                                <Radio
                                  color={
                                    show &&
                                    show[index]?.options[3] ===
                                      show[index]?.correctAnswer
                                      ? "success"
                                      : show[index]?.options[3] ===
                                        show[index]?.studentAnswer
                                      ? "error"
                                      : "default"
                                  }
                                  disableRipple
                                />
                              }
                              label={
                                <Typography
                                  color={
                                    show &&
                                    show[index]?.options[3] ===
                                      show[index]?.correctAnswer
                                      ? "#63B31E"
                                      : show[index]?.options[3] ===
                                        show[index]?.studentAnswer
                                      ? "#E94504"
                                      : "black"
                                  }
                                  marginTop={2}
                                >
                                  <Latex>
                                    {(show && show[index]?.options[3]) || ""}
                                  </Latex>
                                </Typography>
                              }
                            />
                          </Box>
                        ) : (
                          <>
                            {" "}
                            <Typography color="black" fontWeight={600}>
                              Your Answer :{" "}
                              {show &&
                              show[index]?.studentAnswer ==
                                (null || undefined || "") ? (
                                "NA"
                              ) : (
                                <Latex>
                                  {show[index]?.studentAnswer || ""}
                                </Latex>
                              )}
                            </Typography>
                            <Typography
                              marginTop={2}
                              color="green"
                              fontWeight={600}
                            >
                              Correct Answer :{" "}
                              {
                                <Latex>
                                  {(show && show[index]?.correctAnswer) || ""}
                                </Latex>
                              }
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
                          rowGap: 2,
                          marginTop: 2,
                        }}
                      >
                        {/* <LogoButton
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
                        <Box>
                          {" "}
                          <Button
                            onClick={handleOpenModal}
                            style={{
                              ...buttonStyle,
                              padding: 12,
                            }}
                            sx={{
                              background:
                                show && show[index]?.isVideo === "No"
                                  ? "lightgrey !important"
                                  : "var(--blue-new)",
                            }}
                            disabled={
                              show && show[index]?.isVideo === "No"
                                ? true
                                : false
                            }
                            startIcon={
                              <img
                                src="/playButton.png"
                                alt=""
                                className="img-fluid"
                                width="15px"
                              />
                            }
                          >
                            Video Solution
                          </Button>
                        </Box>
                      </Box>
                      {viewSol && (
                        <Box ref={bottomRef} marginTop="2em">
                          <Typography fontWeight={700}>
                            <Latex>
                              {(show && show[index]?.explanations) || ""}
                            </Latex>
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                  {/* Lower cards section start */}
                  <Box
                    component="div"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      // height: "auto",
                    }}
                  >
                    <TempCompo
                      studentAttempted={show && show[index]?.studentsAttempted}
                      attemptedCorrect={show && show[index]?.attemptedCorrect}
                      duration={
                        show && show.length && "duration" in show[index]
                          ? show[index].duration
                          : "NA"
                      }
                      avgTimeSpent={show && show[index]?.averageDuration}
                      topperDuration={show && show[index]?.durationByTopper}
                    />
                  </Box>
                  {/* Lower cards section end */}
                </div>
                {/* MOdal for video link */}
                <div>
                  {" "}
                  <Modal
                    open={open}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <iframe
                        width="100%"
                        height="100%"
                        src={show && show[index]?.videoLink}
                      ></iframe>
                    </Box>
                  </Modal>
                </div>
                {/* left Main end */}

                {/* Right main start */}

                <Box
                  component="div"
                  sx={{
                    width: "25%",
                    background: "#F1F4F9",
                    boxShadow: 3,
                    textAlign: "justify",
                    height: "100%",
                    // overflow: "scroll",
                    p: 2,
                    paddingBottom: 0,
                    borderRadius: 5,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#3B36DB",
                        fontSize: 16,
                        fontFamily: "var(--font-inter)",
                        fontWeight: "900",
                      }}
                    >
                      Error Tracker
                    </Typography>
                    <Typography
                      sx={{
                        color: "#3B36DB",
                        fontSize: 16,
                        fontFamily: "var(--font-inter)",
                        fontWeight: "900",
                      }}
                    >
                      iQ GPT 1.0{" "}
                      <span>
                        <img
                          src="/viewTracker.png"
                          className="img-fluid mb-1"
                          alt=""
                        />
                      </span>
                    </Typography>
                  </Box>
                  <hr />
                  <div
                    className="d-flex flex-column justify-content-between"
                    style={{ height: "85%" }}
                  >
                    <div className="flex-item">
                      <Typography
                        sx={{
                          textAlign: "center",
                          fontSize: "17px",
                          fontWeight: 750,
                          "& > span": {
                            fontSize: 19,
                          },
                        }}
                      >
                        Why did you get it wrong?
                      </Typography>
                      <FormControl
                        sx={{
                          paddingTop: 1,
                          fontFamily: "var(--font-inter)",
                          fontWeight: 800,
                          textAlign: "start",
                        }}
                      >
                        <FormLabel id="demo-radio-buttons-group-label">
                          {""}
                        </FormLabel>
                        <RadioGroup
                          onChange={handleErrorForm}
                          value={errValue}
                          aria-labelledby="demo-radio-buttons-group-label"
                          name="radio-buttons-group"
                        >
                          {errorOptions &&
                            errorOptions.map((item, _) => {
                              return (
                                <FormControlLabel
                                  key={item.id}
                                  value={item.value}
                                  control={<Radio size="small" />}
                                  label={item.value}
                                />
                              );
                            })}
                        </RadioGroup>
                      </FormControl>
                    </div>

                    {/* button for redirect to error page */}
                    <div>
                      <ModifyButton
                        variant="outlined"
                        onClick={() => setIndex((prevIndex) => prevIndex + 1)}
                        endIcon={<BsChevronDoubleRight />}
                        sx={{
                          background: "#2a2b2b",
                          p: 1,
                          mb: 1,
                          width: "100%",
                          color: "white",
                          fontWeight: "bold",
                          borderRadius: "15px",
                          fontSize: "15px",
                          ":hover , :focus": {
                            background: "#2a2b2b",
                          },
                        }}
                      >
                        Go to Next Question
                      </ModifyButton>

                      <ModifyButton
                        className="flex-item"
                        aria-describedby="mouse-over-popover"
                        onMouseEnter={handlePopoverOpen}
                        onMouseLeave={handlePopoverClose}
                        variant="outlined"
                        onClick={() =>
                          navigate(`/errortracker/${mockId}/${attemptId}`)
                        }
                        startIcon={
                          <img
                            src="/errorTracker.png"
                            className="img-fluid"
                            width={18}
                          />
                        }
                        sx={{
                          background: "#2a2b2b",
                          p: 1,
                          width: "100%",
                          color: "white",
                          fontWeight: "bold",
                          borderRadius: "15px",
                          fontSize: "15px",
                          ":hover , :focus": {
                            background: "#2a2b2b",
                          },
                        }}
                      >
                        Error Tracker Report
                      </ModifyButton>
                      <Popover
                        id="mouse-over-popover"
                        sx={{
                          pointerEvents: "none",
                        }}
                        open={popOpen}
                        anchorEl={popoverAnchorEl}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "center",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                        onClose={handlePopoverClose}
                        disableRestoreFocus
                      >
                        <Typography sx={{ p: 1 }}>
                          Complete Mock Analysis to get the Exact Mock Analysis
                          Report
                        </Typography>
                      </Popover>
                    </div>
                  </div>
                </Box>
                {/* Right main end */}
              </Box>
              {/* Main center end */}
            </>
          )}
        </Box>
      </Box>
    </>
  );
}

const NavigationAvatar = ({
  Data,
  setInd,
  selectedQuestionIndex,
  difficulty,
  setViewSoln,
}) => {
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
      {Data?.map((item, ind) => (
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
              bgcolor:
                item.stage === 0 || item.stage === 2 || item.stage === 3
                  ? "#2196F3"
                  : (item.stage === 1 || item.stage === 4) &&
                    item.studentAnswer === item.correctAnswer
                  ? "#43D200"
                  : "#F32121",
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
