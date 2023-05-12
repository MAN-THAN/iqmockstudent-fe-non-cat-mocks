import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import LeaderTable from "../Components/LeaderTable";
import { fetchLeaderBoard as getLeaderBoardData } from "../services/Analysis_api";
import MenuDrawer from "../Components/MenuDrawer";
import HeaderNew from "../Components/HeaderNew";
import MultipleSelect from "../Common-comp/SelectField";

import { useAuth } from "../services/Context";

function LeaderBoard() {
  const { menuBarOpen, setMenuBarOpen, Backdrop } = useAuth();
  const { attemptId, mockId } = useParams();
  const [loading, setLoading] = useState(false);
  const [Data, setData] = useState([]);
  const [mock, setMock] = useState([]);
  const [filter, setFilter] = useState(mockId); //Select particaular mock value

  const userData = JSON.parse(localStorage.getItem("userData"));
  const { _id, name, photoURL } = userData;

  function extractMockData(data) {
    const arr = [];
    if (data.length > 0) {
      data[0].mocks.forEach((item) => {
        if (!arr.includes(item)) {
          arr.push({ name: item.title, value: item.mockId });
        }
      });
    }
    return arr;
  }

  useEffect(() => {
    async function fetchLeaderBoard(attemptId) {
      try {
        setLoading(true);
        const response = await getLeaderBoardData(filter, attemptId, _id);
        console.log(response);
        if (response?.status === 200) {
          const data = response;
          const mockData = extractMockData(data.data);
          setMock(mockData);
          setData(data.data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }

    fetchLeaderBoard(attemptId);
  }, [filter]);

  console.log(filter, "fiilll");

  return (
    <div style={{ width: "100vw" }}>
      <MenuDrawer open={menuBarOpen} />

      <Box
        sx={{
          height: "auto",
          display: "flex",
          flexDirection: "column",
          p: 2,
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {" "}
            <Box sx={{ display: "flex", flexDirection: "row", width: "15em" }}>
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
          {mock.length > 0 && (
            <MultipleSelect options={mock} setType={setFilter} />
          )}
        </Box>

        {/* Table start */}
        <div>
          <LeaderTable data={Data} isLoading={loading} />
        </div>
        {/* Table end */}
      </Box>
    </div>
  );
}

export default LeaderBoard;
