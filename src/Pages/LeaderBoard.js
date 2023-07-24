import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import LeaderTable from "../Components/LeaderTable";
import { fetchLeaderBoard as getLeaderBoardData } from "../services/Analysis_api";
import MenuDrawer from "../Components/MenuDrawer";
import HeaderNew from "../Components/HeaderNew";
import MultipleSelectLead from "../Common-comp/SelectFieldLead";
import { ToastContainer, toast } from "react-toastify";
import ErrorPage from "./ErrorPage";
import { useAuth } from "../services/Context";

function LeaderBoard() {
  const { menuBarOpen, setMenuBarOpen, Backdrop } = useAuth();
  const { attemptId, mockId } = useParams();
  const [loading, setLoading] = useState(true);
  const [Data, setData] = useState([]);
  const [mock, setMock] = useState([]);
  const [filter, setFilter] = useState(mockId); //Select particaular mock value
  const ref = useRef(null);
  const [isErr,setIsErr]= useState(false);
  const [errorMsg,setErrorMsg] = useState('');
  const userData = JSON.parse(localStorage.getItem("userData"));
  const { _id, name, photoURL } = userData;
  const [currentIndex,setCurrentIndex]=useState(0);
  const [filterAttempt,setFilterAttempt]=useState(attemptId);
  function extractMockData(data) {
    const arr = [];
    if (data.length > 0) {
      data[0].mocks.forEach((item) => {
        if (!arr.includes(item)) {
          arr.push({ name: item.title, value: item.mockId ,attempt:item.attemptList[0]});
        }
      });
    }
    return arr;
  }
//sort mockArray using attemptID 
//sendAttemptId on change of mockList
  useEffect(() => {
    async function fetchLeaderBoard(attemptId) {
      try {
        // setLoading(true);

        const res = await getLeaderBoardData(filter, attemptId, _id);
        //console.log(res);
        if (res?.status == 200) {
          const data = res;
          const mockData = extractMockData(data.data);
          console.log(mockData,"##");
          let currentIndex = mockData.findIndex(it=>it.value==mockId);
          setCurrentIndex(currentIndex);
          setMock(mockData);
          setData(data.data);
          setLoading(false);
        }
      } catch (err) {
        //console.log(err);
        setLoading(false);
        showToastMessage(err?.response?.data?.msg);
      }
    }
      fetchLeaderBoard(filterAttempt);
     //fetchLeaderBoard();
  }, [filter]);

  //console.log(filter, "fiilll");
  const showToastMessage = (msg) => {
    // toast.error(msg == undefined ? "Some error occurred! Please reload the page." : msg.toUpperCase(), {
    //   position: toast.POSITION.TOP_CENTER,
    // });
    // return (ref.current.style.display = "none");
    setIsErr(true);
    if(msg==undefined){
    setErrorMsg("Some error occurred! Please reload the page.")}
    else{
      setErrorMsg(msg)
    }
  };

  return (
    <>
      <ToastContainer />
      <div style={{ width: "100vw" }}>
        <MenuDrawer open={menuBarOpen} />

        {isErr==true?<ErrorPage errorMessage={errorMsg}/>:<Box
          sx={{
            height: "auto",
            display: "flex",
            flexDirection: "column",
            p: 2,
            gap: "2em",
            position: "relative",
            ml: "65px",
          }}
          ref={ref}
        >
          <Box component="div" sx={{ height: "10%" }}>
            <HeaderNew />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Backdrop
              sx={{
                zIndex: (theme) => theme.zIndex.drawer - 1,
                color: "#fff",
              }}
              open={menuBarOpen}
              onClick={() => setMenuBarOpen(false)}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 1,
              }}
            >
              {" "}
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Typography
                  sx={{
                    fontSize: "30px",
                    fontWeight: 800,
                    color: "black",
                    fontFamily: "Inter",
                  }}
                >
                  Leader Board :
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: "24px",
                  fontWeight: 600,
                  color: "#0057C8",
                  fontFamily: "Inter",
                  marginTop: "6px",
                }}
              >
                {name}
              </Typography>
            </Box>
            {mock.length > 0 && <MultipleSelectLead options={mock} currentIndex={currentIndex} setType={setFilter} setFilterAttempt={setFilterAttempt}/>}
          </Box>

          {/* Table start */}
          <div>
            <LeaderTable data={Data} isLoading={loading} />
          </div>
          {/* Table end */}
        </Box>} 
      </div>
    </>
  );
}

export default LeaderBoard;
