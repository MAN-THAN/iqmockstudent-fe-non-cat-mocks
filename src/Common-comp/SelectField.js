import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect } from "react";

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

export default function MultipleSelect({ options, setType, type }) {
  const theme = useTheme();
  const [value, setValue] = React.useState([]);
  const [year, setYear] = React.useState([]);
  const showSecondSelect = options.some((option) => option.year !== undefined);
  console.log(value);
  useEffect(() => { 
    setType(value);
  }, [value])
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
          value={value}
          onChange={(e) => setValue(e.target.value)}
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
              return <em>Select{ " " + type }</em>;
            }

            return selected;
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
        >
          {/* <MenuItem disabled value="">
            <em>Select Course</em>
          </MenuItem> */}
          {options && options.map((item, _) => (
            <MenuItem
              key={item.name}
              value={item.name}
              // style={getStyles(item.name, value, theme)}
            >
              {item.name}
            </MenuItem>
          ))}
        </Select>

        {/* 2nd select field only show when we have two select fields  */}
        {/* <Select
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
        </Select> */}
      </FormControl>
    </div>
  );
}
