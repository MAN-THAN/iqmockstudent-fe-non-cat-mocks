import MenuDrawer from "../Components/MenuDrawer";
import { Box, Typography } from "@mui/material";
import HeaderNew from "../Components/HeaderNew";
import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import SliderSwiper from "../Components/Swiper";
import MultipleSelect from "../Common-comp/SelectField";
import { typographyStyles } from "../styleSheets/StyleNew";
import { useAuth } from "../services/Context";
import { getMarketPlace } from "../services/Analysis_api";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

// Inspired by blueprintjs
const options = [
  {
    name: "MBA",
    year: 2021,
  },
  {
    name: "MCA",
    year: 2022,
  },
  {
    name: "MBA",
    year: 2024,
  },
  {
    name: "MBA",
    year: 2025,
  },
  {
    name: "MIA",
    year: 2022,
  },
];

function MarketPlace() {
  const { menuBarOpen, setMenuBarOpen, Backdrop, setLoading, isLoading } =
    useAuth();
  const [radioValue, setRadioValue] = React.useState("coursesWithMocks");
  const [selectedValue, setSelectedValue] = React.useState({});
  const [data, setData] = React.useState([]);
  const { attemptId } = useParams();


  function handleSelectChange(selectedValues) {
    setSelectedValue(selectedValues);
  }

  console.log(selectedValue);

  // function getting data on mounting
  useEffect(() => {
    getData();
  }, []);

  // function for fetching data

  const getData = async () => {
    setLoading(true);
    const uid = JSON.parse(localStorage.getItem("userData"))?._id;
    const res = await getMarketPlace(attemptId, uid);
    if (res?.status == 200) {
      console.log(res);
      setData(res.data.item);
      setLoading(false);
    } else {
      console.log("error", res);
      setLoading(false);
    }
  };

  return (
    <>
      <Box component="main">
        <MenuDrawer />
        <Box
          component="div"
          sx={{
            position: "absolute",
            left: "65px",
            height: "100vh",
            width: "calc(100% - 65px)",
            p: 2,
          }}
        >
          {/* Header start */}
          <Box component="header">
            <HeaderNew />
          </Box>
          {/* Header end */}
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
              <Box component="div">
                <Backdrop
                  sx={{
                    zIndex: (theme) => theme.zIndex.drawer - 1,
                    color: "#fff",
                  }}
                  open={menuBarOpen}
                  onClick={() => setMenuBarOpen(false)}
                />

                <Typography
                  sx={{
                    ...typographyStyles.mainHeading,
                    mt: 2,
                  }}
                >
                  {" "}
                  Market place{" "}
                </Typography>

                <div
                  className="d-flex justify-content-between align-items-center align-content-center"
                  style={{ width: "calc(100% - 50px)" }}
                >
                  <div className="flex-item">
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="demo-error-radios"
                        name="quiz"
                        sx={{ fontWeight: "bold", fontSize: "16.56px" }}
                        value={radioValue}
                        onChange={(e) => setRadioValue(e.target.value)}
                      >
                        <FormControlLabel
                          value="coursesWithMocks"
                          control={<Radio />}
                          label={
                            <Typography
                              style={{ fontWeight: 800, fontSize: "17px" }}
                            >
                              Courses (Includes Mocks)
                            </Typography>
                          }
                        />
                        <FormControlLabel
                          value="mocks"
                          control={<Radio />}
                          label={
                            <Typography
                              style={{ fontWeight: 800, fontSize: "17px" }}
                            >
                              Mocks
                            </Typography>
                          }
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>

                  <div className="flex-item">
                    <MultipleSelect
                      options={options}
                      onSelectChange={handleSelectChange}
                      setType={() => {}}
                    />
                  </div>
                </div>
              </Box>

              <Box component="div" sx={{ py: 4, overflow: "hidden" }}>
                <SliderSwiper data={data} />
              </Box>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}

export default MarketPlace;
