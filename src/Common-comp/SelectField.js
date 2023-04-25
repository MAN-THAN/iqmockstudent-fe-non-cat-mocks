import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 0;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

function getStyles(theme, value, selected) {
  return {
    fontWeight: selected
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export default function MultipleSelect({ options, onSelectChange }) {
  const theme = useTheme();
  const [selectedValues, setSelectedValues] = useState({});

  const handleOptionChange = (event) => {
    const { value } = event.target;
    setSelectedValues((prevState) => ({
      ...prevState,
      firstSelectValue: value,
      secondSelectValue:
        prevState.firstSelectValue === "some value"
          ? ""
          : prevState.secondSelectValue,
    }));
    onSelectChange({
      firstSelectValue: value,
      secondSelectValue: selectedValues.secondSelectValue,
    });
  };

  const handleSecondOptionChange = (event) => {
    const { value } = event.target;
    setSelectedValues((prevState) => ({
      ...prevState,
      secondSelectValue: value,
    }));
    onSelectChange({
      firstSelectValue: selectedValues.firstSelectValue,
      secondSelectValue: value,
    });
  };



  
  return (
    <div>
      <FormControl
        sx={{
          display: "flex",
          flexDirection: "row",
          columnGap: 3,
        }}
      >
        <Select
          displayEmpty
          value={selectedValues.firstSelectValue || ""}
          onChange={handleOptionChange}
          input={
            <OutlinedInput
              sx={{
                width: 149,
                boxShadow: 2,
                borderRadius: 2,
                height: 49,

                ".MuiOutlinedInput-notchedOutline": { border: 0 },
                "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    border: 0,
                  },
                "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    border: 0,
                  },
              }}
            />
          }
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Course</em>;
            }

            return selected;
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem disabled value="">
            <em>Select Course</em>
          </MenuItem>
          {options &&
            options.map((item, _) => (
              <MenuItem
                key={item.name}
                value={item.name}
                style={getStyles(
                  theme,
                  item.name,
                  selectedValues.firstSelectValue === item.name
                )}
              >
                {item.name}
              </MenuItem>
            ))}
        </Select>

        {/* 2nd select field only show when we have two select fields  */}
        <Select
          displayEmpty
          value={selectedValues.secondSelectValue || ""}
          onChange={handleSecondOptionChange}
          input={
            <OutlinedInput
              sx={{
                width: 149,
                boxShadow: 2,
                borderRadius: 2,
                height: 49,

                ".MuiOutlinedInput-notchedOutline": { border: 0 },
                "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    border: 0,
                  },
                "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    border: 0,
                  },
              }}
            />
          }
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Course</em>;
            }

            return selected;
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem disabled value="">
            <em>Select Course</em>
          </MenuItem>
          {options &&
            options.map((item, _) => (
              <MenuItem
                key={item.name}
                value={item.name}
                style={getStyles(
                  theme,
                  item.name,
                  selectedValues.secondSelectValue === item.name
                )}
              >
                {item.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}
