import MenuDrawer from "../Components/MenuDrawer";
import { Box, Typography } from "@mui/material";
import HeaderNew from "../Components/HeaderNew";
import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import SliderSwiper from "../Components/Swiper";
import MultipleSelect from "../Components/DropdownComp";
import {typographyStyles} from "../styleSheets/StyleNew"
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
  const [selectedValue, setSelectedValue] = React.useState("coursesWithMocks");

  return (
    <>
      <Box component="main" sx={{ display: "flex" }}>
        <MenuDrawer />
        <Box
          component="div"
          sx={{ flexGrow: 1, p: 2, width: "calc(100% - 240px)" }}
        >
          {/* Header start */}
          <Box component="header">
            <HeaderNew />
          </Box>
          {/* Header end */}

          <Box component="div" >
            <Typography
              sx={{
               ...typographyStyles.mainHeading,
                mt:2
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
                    value={selectedValue}
                    onChange={(e) => setSelectedValue(e.target.value)}
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
                <MultipleSelect options={options} />
              </div>
            </div>
          </Box>

          <Box component="div" sx={{ py: 4, overflow: "hidden" }}>
            <SliderSwiper />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default MarketPlace;
