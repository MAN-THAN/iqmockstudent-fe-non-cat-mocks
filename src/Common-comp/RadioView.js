import * as React from "react";
import { createTheme } from "@mui/material/styles";
import { Box, Radio, RadioGroup } from "@mui/material";

const theme = createTheme({
  customVars: {
    radius: {
      md: 3,
    },
  },
  // other theme properties
});

const styles = {
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 48,
    height: 40,
    p: 2,

    "&:not(:first-of-type)": {
      borderLeft: "1px solid",
      borderColor: theme.palette.divider,
    },
    "&:first-of-type": {
      borderTopLeftRadius: theme.customVars.radius.md,
      borderBottomLeftRadius: theme.customVars.radius.md,
    },
    "&:last-of-type": {
      borderTopRightRadius: theme.customVars.radius.md,
      borderBottomRightRadius: theme.customVars.radius.md,
    },
  },
  icon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    width: 20,
    height: 20,
  transition: "border-color 0.3s ease",
  },
  checkedIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    borderRadius: 3,
    backgroundColor: "white",
    padding: 5,
    transition: "background-color 0.3s ease",
  },
};

function ExampleAlignmentButtons({ setValue, value }) {
  return (
    <RadioGroup
      className="alignment-buttons"
      aria-label="Alignment"
      name="alignment"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 1,
        width: 110,
        height: 40,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        borderStyle: "solid",
        background: "#D9E1F5",
        borderRadius: theme.customVars.radius.md,
      }}
    >
      {[
        {
          label: "Table",
          image: "/tableView.png",
        },
        {
          label: "Graph",
          image: "/graphView.png",
        },
      ].map((item, index) => (
        <Box key={item.label} sx={styles.button}>
          <Radio
            value={item.label}
            disableRipple
            icon={
              <span style={styles.icon}>
                <img
                  src={item.image}
                  alt={item.label}
                  style={{ width: "100%", height: "100%" }}
                />
              </span>
            }
            checkedIcon={
              <span style={styles.checkedIcon}>
                <img
                  src={item.image}
                  alt={item.label}
                  style={{ width: "100%", height: "100%" }}
                />
              </span>
            }
          />
        </Box>
      ))}
    </RadioGroup>
  );
}

export default ExampleAlignmentButtons;
