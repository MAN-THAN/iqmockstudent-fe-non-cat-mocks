import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import LeaderTable from "../Components/LeaderTable";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { fetchLeaderBoard as getLeaderBoardData } from "../services/Analysis_api";
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;

function LeaderBoard() {
  const { attemptId, mockId } = useParams();
  const [leaderData, setLeaderData] = useState([]);
  const [loading, setLoading] = useState(false);
  const date = new Date();

  // eslint-disable-next-line arrow-body-style
  const disabledDate = (current) => {
    // Can not select days after today and today
    return current && current > dayjs().endOf("day");
  };
  const date2 = Date.now() - (86400000*10);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(date2).toISOString().split("T")[0],
    endDate: date.toISOString().split("T")[0], //Today's date
  });
  // console.log(date.toISOString().split("T")[0]);
  // console.log(dateRange)

  // console.log(new Date(date2).toISOString().split("T")[0]);

  const handleDateRangeChange = (dates) => {
    // Format the selected date range into a string
    const formattedStartDate = dates[0].format("YYYY-MM-DD");
    const formattedEndDate = dates[1].format("YYYY-MM-DD");

    // Set the start and end dates in state
    setDateRange({ startDate: formattedStartDate, endDate: formattedEndDate });
  };

  useEffect(() => {
    async function fetchLeaderBoard(startDate, endDate, mockId) {
      try {
<<<<<<< HEAD
        setLoading(true)
=======
        setLoading(true);
>>>>>>> 46569380a6c99e66e406980cebb0be2c9182ba6a
        const response = await getLeaderBoardData(startDate, endDate, mockId);
        if (response?.status === 200) {
          const data = response;
          setLeaderData(data.data.leaderList);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }

    if (dateRange.startDate && dateRange.endDate) {
      fetchLeaderBoard(dateRange.startDate, dateRange.endDate, mockId); // call the API only if both startDate and endDate are not null
    }
  }, [dateRange]);

  return (
    <div style={{ width: "100vw", background: "#EEEDF5" }}>
      <Box
        sx={{
          width: "100%",
          height: "15em",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(45deg, #6E75F6 30%, #DDDCF8 90%)",
          padding: "1.6em 3em",
          gap: "2em",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: "30px",
              fontWeight: 800,
              color: "white",
              fontFamily: "Inter",
            }}
          >
            Leader Board
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
            {" "}
            <div className="text-end">
              <Typography
                sx={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "19px",
                  fontWeight: 600,
                }}
              >
                {"Manthan"}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "13px",
                  fontWeight: 400,
                }}
              >
                User id :{"574932594574334"}
              </Typography>
            </div>
            <div className="d-flex">
              <a href="#" className="d-block link-dark text-decoration-none " aria-expanded="false">
                <img src="https://github.com/mdo.png" alt="mdo" width="50" height="50" className="rounded" />
              </a>
            </div>
          </Box>
        </Box>
        <Typography
          sx={{
            fontSize: "40px",
            fontWeight: 600,
            color: "white",
            fontFamily: "Inter",
          }}
        >
          Mr. Manthan
        </Typography>
        <Typography sx={{ fontSize: "16px", color: "white", fontFamily: "Inter" }}>Mock Result :</Typography>
        <Box sx={{ position: "absolute", right: 15, top: "50%" }}>
          <img src="/Bigmamahere.svg" alt="mdo" width="167px" height="167px" className="rounded" />
        </Box>
        <Box sx={{ position: "absolute", right: "25%", top: "35%" }}>
          <img src="/knockknock.svg" alt="mdo" width="70px" height="70px" className="rounded" />
        </Box>
        <Box sx={{ position: "absolute", right: "40%", bottom: "20%" }}>
          <img src="/Bigmamahere.svg" alt="mdo" width="20px" height="20px" className="rounded" />
        </Box>
      </Box>
      <div className="container-fluid my-3 px-5">
        <Typography variant="h4" className="text-muted py-5">
          Ranking Overall In India
        </Typography>

        <RangePicker onChange={handleDateRangeChange} disabledDate={disabledDate} />
        <LeaderTable data={leaderData} isLoading={loading} />
      </div>
    </div>
  );
}

export default LeaderBoard;
