import React, { useEffect, useState } from "react";
import MenuDrawer from "../Components/MenuDrawer";
import HeaderNew from "../Components/HeaderNew";
import { Box, Typography, Stack, Item } from "@mui/material";
import { typographyStyles, style } from "../styleSheets/StyleNew";
import MultipleSelect from "../Common-comp/SelectField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useAuth } from "../services/Context";
import { LogoCard } from "../Common-comp/Card";
import { AnalysisAcrossCard } from "../services/DataFiles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";
import { fetchOverallAcross } from "../services/Analysis_api";
import { setIn } from "formik";


const FilterList = ({ mocksList, setIndex }) => {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">
        {" "}
        <Typography variant="paragrapgh" sx={{ ...style.subHeading, fontSize: "21.96px", color: "black" }}>
          Filter
        </Typography>
      </FormLabel>
      <RadioGroup aria-labelledby="demo-radio-buttons-group-label" name="radio-buttons-group">
        {mocksList?.map((item, index) => {
          return <FormControlLabel onClick={() => setIndex(index)} value={item.title} control={<Radio />} label={ item.title } />;
        })}
      </RadioGroup>
    </FormControl>
  );
};

function AnalysisAcross() {
  const params = useParams();
  const [a, setA] = useState("");
  const [mocksList, setMocksList] = useState([]);
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState([]);
  const Subjects = [{ name: "Varc" }, { name: "Quants" }, { name: "LRdi" }];
  const { menuBarOpen, setMenuBarOpen, Backdrop, setLoading, isLoading, showToastMessage  } = useAuth();

  useEffect(() => {
    setShow(mocksList[index]);
  }, [index]);

  useEffect(() => {
    const uid = JSON.parse(localStorage.getItem("userData"))?._id;
    const fetchData = async (mockId, uid) => {
      setLoading(true)
      const response = await fetchOverallAcross(mockId, uid);
      console.log(response);
      if (response?.status === 200) {
        setMocksList(response.data?.topicWise);
        setShow(response.data?.topicWise[index]);
        setLoading(false);
      } else {
        showToastMessage();
        setLoading(false);
        return;
      }
    };
    fetchData(params.mockId, uid);
  }, []);
  console.log(index);
  console.log(show);
  return (
    <>
      <Box component="main" sx={{ height: "100vh" }}>
        <MenuDrawer />

        <Box sx={{ p: 2, position: "absolute", left: "70px" }}>
          {/* Header */}
          <Box component="header">
            <HeaderNew />
          </Box>

          {/* Select box */}
          <Box component="div" sx={{ mt: 4 }}>
            <MultipleSelect options={Subjects} setType={setA} />
            <Typography
              sx={{
                ...typographyStyles.mainHeading,
                pt: 2,
              }}
            >
              {" "}
              Analysis Across All Mocks
            </Typography>
          </Box>

          {/* Main Section */}
          <Box
            component="main"
            sx={{
              display: "flex",
              width: "calc(100vw - 108px)",
              height: "76Vh",
              mt: 3,
              flexWrap: "wrap",
            }}
          >
            {menuBarOpen || isLoading && (
              <Backdrop
                sx={{
                  zIndex: (theme) => theme.zIndex.drawer - 1,
                  color: "#fff",
                }}
                open={menuBarOpen}
                onClick={() => setMenuBarOpen(false)}
              />
            )}
            {/*left side Filter div start */}
            <Box
              sx={{
                flexBasis: "15%",
                // border: "2px solid #928F8F ",
              }}
            >
              <Stack spacing={2} direction="column" useFlexGap flexWrap="wrap">
                <FilterList mocksList={mocksList} setIndex={ setIndex } />
              </Stack>
            </Box>
            {/* Filter div end */}

            {/*Question side box start*/}
            <Box
              sx={{
                flexBasis: { xs: "100%", md: "85%" },
                height: "max-content",
                background: "#F6F7F8",
                p: 3,
                borderRadius: "15px",
              }}
            >
              {/* Cards */}
              <Box
                component="div"
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "flex-end",
                }}
              >
                {AnalysisAcrossCard.map((item, _) => (
                  <LogoCard
                    cardTitle={item.title}
                    key={item.id}
                    icon={item.icon}
                    style={{
                      fontSize: 8,
                      width: "169px",
                      height: "52px",
                      flexBasis: "15%",
                      flexGrow: 0,
                      justifyContent: "center",
                    }}
                  />
                ))}
              </Box>

              {/* Table */}
              <Box component="div" mt={4}>
                <DataTable data={ show?.data } />
              </Box>
            </Box>
            {/*Question side box end*/}
          </Box>
        </Box>
      </Box>
    </>
  );
}

const DataTable = ({ data }) => {
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];
  return (
    <TableContainer sx={{ p: 2, borderRadius: 4, border: "none", boxShadow: 2 }} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {data?.slice(1).map((row) => (
            <TableRow key={row.topic} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell sx={{ fontWeight: "bold", width: "20%" }}>{row.topic}</TableCell>
              <TableCell align="center">{row.numberOfQuestions}</TableCell>
              <TableCell align="center">{row.numberOfAttemptedQuestions}</TableCell>
              <TableCell align="center">{row.numberOfCorrectAttempt}</TableCell>
              <TableCell align="center">{row.numberOfIncorrectAttempt}</TableCell>
              <TableCell align="center">{row.numberOfQuestions - row.numberOfAttemptedQuestions}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AnalysisAcross;
