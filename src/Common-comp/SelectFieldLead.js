import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect } from "react";

const ITEM_HEIGHT = "48";
const ITEM_PADDING_TOP = 3;
const MenuProps = {
  disableScrollLock: true,
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};


export default function MultipleSelectLead({ options,currentIndex, setType ,setFilterAttempt}) {

  const [value, setValue] = useState(options[currentIndex]?.value || "");
  const [attempt,setAttempt] = useState(options[currentIndex]?.attempt||"");
  

  useEffect(() => {
    setType(value);
    setFilterAttempt(options.filter(it=>it.value==value)[0]?.attempt);
    
    return (() => {
      setType((prev)=> prev)
    })
  }, [value]);

  //console.log("Selectfield",value)
 
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
          defaultValue={value}
          value={value}
          onChange={(e) =>setValue(e.target.value) }
          input={
            <OutlinedInput
              sx={{
                width: 127,
                borderRadius: 2,
                height: 32,
                fontSize: "12px",
                fontWeight: 700,
                fontFamily: "var(--font-inter)",

                ".MuiOutlinedInput-notchedOutline": {
                  border: 1,
                  borderColor: "#809EB9",
                },
                "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    border: 1,
                    borderColor: "#809EB9",
                  },
                "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    border: 2,
                    borderColor: "#809EB9",
                  },
              }}
            />
          }
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Select value" }}
        >
          <MenuItem value={""} disabled>
            <em>Select</em>
          </MenuItem>
          {options &&
            options.map((item, _) => (
              <MenuItem
                key={item.name}
                value={item.value}
                sx={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "11px",
                  fontWeight: "600",
                }}
              >
                {item.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}
