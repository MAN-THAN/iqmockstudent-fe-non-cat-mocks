import React from "react";
import MenuDrawer from "../Components/MenuDrawer";
import HeaderNew from "../Components/HeaderNew";
import { useAuth } from "../services/Context";
import { typographyStyles } from "../styleSheets/StyleNew";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box, Typography, Card, CardContent, CardHeader } from "@mui/material";
import { LogoCard } from "../Common-comp/Card";

const ITEM_HEIGHT = 28;
const ITEM_PADDING_TOP = 3;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

function getStyles(name, MockName, theme) {
  return {
    fontWeight:
      MockName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function MockComparison() {
  const Subjects = [
    { name: "Varc" },
    { name: "Quants" },
    { name: "LRdi" },
    { name: "MBA" },
    { name: "MIA" },
  ];

  const OuterCardStyle = {
    width: 246,
    height: "100%",
    ...typographyStyles.subHeading,
    fontSize: "15px",
    background: "#F5F9FF",
    boxShadow: "",
    borderRadius: "10px",
    boxShadow: "0px 4px 4px rgba(63, 105, 255, 0.25)",
    p: 1,
  };

  const innerCardStyle = {
    height: "auto",
    justifyContent: "center",
    iconSize: 25,
 
  };

  const [MockName, setMockName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setMockName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const { menuBarOpen, setMenuBarOpen, Backdrop } = useAuth();
  return (
    <>
      <Box component="main" >
        <MenuDrawer />

        <Box
          sx={{
            position: "absolute",
            left: "65px",
            height: "100vh",
            width: "calc(100% - 65px)",
            p: 2,
          }}
        >
          <Box component="header">
            <HeaderNew />
          </Box>

          <Box
            component="section"
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-around",
              mt: 3,
            }}
          >
            {menuBarOpen && (
              <Backdrop
                sx={{
                  zIndex: (theme) => theme.zIndex.drawer - 1,
                  color: "#fff",
                }}
                open={menuBarOpen}
                onClick={() => setMenuBarOpen(false)}
              />
            )}

            <Box className="comparison-Section p-2">
              <Typography
                sx={{
                  ...typographyStyles.mainHeading,
                  pt: 2,
                }}
              >
                {" "}
                Mock <br /> Comparison
              </Typography>

              <ul
                className="list-unstyled "
                style={{
                  lineHeight: "4.3em",
                  ...typographyStyles.subHeading,
                  fontSize: "15px",
                 
                }}
              >
                <li>Score</li>
                <li>Number of Questions Attempted</li>
                <li>Number of Correct Questions Attempted</li>
                <li>Number of Incorrect Questions Attempted</li>
                <li>Number of Skipped Questions Attempted</li>
                <li>Average time spent per question</li>
              </ul>
            </Box>

            <Box className="Cards d-flex gap-5 align-items-center mt-4 ">
              <OuterCard
                               data={{ list: [...Array(6)] }}
                miniCard={
                  <LogoCard
                    icon={"/click 1.svg"}
                    infoIcon={"/info1.svg"}
                    cardTitle={
                      <>
                        <Typography
                          variant="h4"
                          sx={{ fontSize: 17 }}
                          color={"black"}
                        >
                          82.8 <span style={{ fontSize: "15px" }}>%ile</span>
                        </Typography>
                        <Typography sx={{ color: "#809FB8", fontSize: 15 }}>
                          My iCAT 1.0 Analysis
                        </Typography>
                      </>
                    }
                    style={innerCardStyle}
                  />
                }
                style={OuterCardStyle}
              />
              <OuterCard
                data={{ list: [...Array(6)] }}
                icon={"/click 1.svg"}
                miniCard={
                  <LogoCard
                    cardTitle={
                      <>
                        <Typography
                          variant="h4"
                          sx={{ fontSize: 17 }}
                          color={"black"}
                        >
                          82.8 <span style={{ fontSize: "15px" }}>%ile</span>
                        </Typography>
                        <Typography sx={{ color: "#809FB8", fontSize: 15 }}>
                          My iCAT 1.0 Analysis
                        </Typography>
                      </>
                    }
                    style={innerCardStyle}
                    icon={"/click 1.svg"}
                    infoIcon={"/info1.svg"}
                    select={
                      <SelectBox
                        onSelect={handleChange}
                        mockName={MockName}
                        options={["hnm", "gvhbjn", "ghj"]}
                      />
                    }
                  />
                }
                style={OuterCardStyle}
              />
              <OuterCard
                data={{ list: [...Array(6)] }}
                miniCard={
                  <LogoCard
                    cardTitle={
                      <>
                        <Typography
                          variant="h4"
                          sx={{ fontSize: 17 }}
                          color={"black"}

                        >
                          82.8 <span style={{ fontSize: "15px" }}>%ile</span>
                        </Typography>
                        <Typography sx={{ color: "", fontSize: 15 }}>
                          My iCAT 1.0 Analysis
                        </Typography>
                      </>
                    }
                    style={{ ...innerCardStyle, background: "#FFECB9" }}
                    icon={"/top-rated.png"}
                    infoIcon={"/info1.svg"}
                  
                  />
                }
                style={{ ...OuterCardStyle, background: "#FFC107" }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

const OuterCard = ({ style, miniCard, data }) => {
  return (
    <Card sx={{ ...style ,}}>

     <Box component="div" sx={{height:"20%"}}>
     {miniCard}
     </Box>
   
      <CardContent>
        {data &&
          data.list.map((item, index) => {
            return (
              <ul className="list-unstyled pt-4 text-center">
                <li>{index}</li>
              </ul>
            );
          })}
      </CardContent>
    </Card>
  );
};

const SelectBox = ({ onSelect, mockName, options }) => {
  const theme = useTheme();
  return (
    <div>
      <FormControl sx={{ m: 1,mt:0, width: "94%" }}>
        {/* <InputLabel id="demo-multiple-name-label" sx={{ fontSize: "15px" }}>
         Mock
        </InputLabel> */}
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
            value={mockName}
          onChange={onSelect}
          sx={{ height: "30px" }}
          // input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
          displayEmpty={true}
        >
          <MenuItem value="" disabled>
            MOCK
          </MenuItem>
          {options.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, mockName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MockComparison;
