import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import LeaderTable from "../Components/LeaderTable";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { fetchLeaderBoard as getLeaderBoardData } from "../services/Analysis_api";
import MenuDrawer from "../Components/MenuDrawer";
import HeaderNew from "../Components/HeaderNew";
import MultipleSelect from "../Common-comp/SelectField";

import { useAuth } from "../services/Context";
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;

function LeaderBoard() {
  const { menuBarOpen, setMenuBarOpen, Backdrop } = useAuth();
  const { attemptId, mockId } = useParams();
  const [leaderData, setLeaderData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState([]);
  const [studentRank, setStudentRank] = useState(null);
  const [mock, setMock] = useState([]);

  const userData = JSON.parse(localStorage.getItem("userData"));
  const { _id, name, photoURL } = userData;

  const date = new Date();

  // eslint-disable-next-line arrow-body-style
  const disabledDate = (current) => {
    // Can not select days after today and today
    return current && current > dayjs().endOf("day");
  };
  const date2 = Date.now() - 86400000 * 10;
  // Increasing date by 1
  const IncDateByOne = (actual_date) => {
    const date = new Date(actual_date);
    const newDate = date.getTime() + 86400000;
    // console.log(new Date(newDate).toISOString())
    return new Date(newDate).toISOString().split("T")[0];
  };
  const [dateRange, setDateRange] = useState({
    startDate: new Date(date2).toISOString().split("T")[0],
    endDate: IncDateByOne(date.toISOString().split("T")[0]), //Today's date
  });

  const handleDateRangeChange = (dates) => {
    // Format the selected date range into a string
    const formattedStartDate = dates[0].format("YYYY-MM-DD");
    const formattedEndDate = IncDateByOne(dates[1].format("YYYY-MM-DD"));
    console.log(formattedEndDate);

    // Set the start and end dates in state
    setDateRange({ startDate: formattedStartDate, endDate: formattedEndDate });
  };

  useEffect(() => {
    async function fetchLeaderBoard(startDate, endDate, mockId) {
      try {
        setLoading(true);
        const response = await getLeaderBoardData(startDate, endDate, mockId, attemptId);
        console.log(response);
        if (response?.status === 200) {
          const data = response;
          setLeaderData(data.data[0]?.leaderList);
          setStudentData(data.data[0]?.result);
          setStudentRank(data.data[0]?.rank);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }

    if (dateRange.startDate && dateRange.endDate) {
      fetchLeaderBoard(dateRange.startDate, dateRange.endDate, mockId, attemptId); // call the API only if both startDate and endDate are not null
    }
  }, [dateRange]);

  return (
    <div style={{ width: "100vw" }}>
      <MenuDrawer open={menuBarOpen} />

      <Box
        sx={{
          height: "auto",
          display: "flex",
          flexDirection: "column",
          padding: "1.6em 3em",
          gap: "2em",
          position: "relative",
          ml: "65px",
        }}
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
          <Box sx={{ display: "flex", flexDirection: 'row', justifyContent : "space-between"}}>
            {" "}
            <Box sx={{display : 'flex', flexDirection : "row", width : "15em"}}>
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
                marginTop : '6px'
              }}
            >
              {name}
            </Typography>
          </Box>
          <MultipleSelect options={[{name : "few"}]} setType={() => { }} />
        </Box>
        {/* <Typography sx={{ fontSize: "16px", color: "black", fontFamily: "Inter" }}>Mock Result :</Typography> */}
        {/* <Box sx={{ position: "absolute", right: 15, top: "50%" }}>
          <img
            src="/Bigmamahere.svg"
            alt="mdo"
            width="167px"
            height="167px"
            className="rounded"
          />
        </Box>
        <Box sx={{ position: "absolute", right: "25%", top: "35%" }}>
          <img
            src="/knockknock.svg"
            alt="mdo"
            width="70px"
            height="70px"
            className="rounded"
          />
        </Box>
        <Box sx={{ position: "absolute", right: "40%", bottom: "20%" }}>
          <img
            src="/Bigmamahere.svg"
            alt="mdo"
            width="20px"
            height="20px"
            className="rounded"
          />
        </Box> */}

        {/* Table start */}
        <div>
          {/* <Typography variant="h4" className="text-muted py-5">
            Ranking Overall In India
          </Typography> */}

          {/* <RangePicker
            onChange={handleDateRangeChange}
            disabledDate={disabledDate}
          /> */}
          {/* <LeaderTable data={leaderData} isLoading={loading} /> */}
          <LeaderTable data={leaderData} studentData={studentData} studentRank={studentRank} isLoading={loading} />
        </div>
        {/* Table end */}
      </Box>
    </div>
  );
}

export default LeaderBoard;
