import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { BootstrapButton } from "../styleSheets/Style";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(MockId, mockid, theme) {
  return {
    fontWeight:
      MockId === mockid
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
    backgroundColor: MockId === mockid ? theme.palette.primary.main : "inherit",
    color: MockId === mockid ? theme.palette.primary.contrastText : "inherit",
  };
}

const MockID = ["6430e9e837185e086ad69368", "64310eeee99d649fb8dd43c0"];

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const theme = useTheme();
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    uid: "",
    mockid: "",
  };
  const [value, setValue] = useState(initialValues);

  const handleChange = (e) => {
    const values = e.target.value;
    const name = e.target.name;
    setValue({ ...value, [name]: values });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, uid, mockid } = value;
    navigate(`/terms/${name}/${email}/${uid}/${mockid}`);
    console.log(value);
  };

  return (
    <div>
      <BootstrapButton
        height="45"
        variant="contained mx-auto"
        sx={{ color: "white", p: 3, my: 2, borderRadius: "30px" }}
        onClick={handleOpen}
      >
        Next
      </BootstrapButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            sx={{ color: "black", ml: 1 }}
            variant="h4"
            component="h4"
          >
            User Info:
          </Typography>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "fullWidth" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="standard-basic"
              label="Name"
              type="name"
              onChange={handleChange}
              variant="standard"
              name="name"
              value={value.name}
              fullWidth
              required
            />
            <TextField
              id="standard-basic"
              label="Email"
              variant="standard"
              name="email"
              type="email"
              value={value.email}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              id="standard-basic"
              label="Phone"
              value={value.uid}
              name="uid"
              type="number"
              variant="standard"
              onChange={handleChange}
              fullWidth
              required
            />
            <FormControl variant="standard" fullWidth sx={{ mt: 2 }}>
              <InputLabel id="demo-multiple-name-label">
                Select the Mock ID
              </InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                name="mockid"
                onChange={handleChange}
                MenuProps={MenuProps}
                value={value.mockid || ""}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {MockID.map((MockID) => (
                  <MenuItem
                    key={MockID}
                    value={MockID}
                    style={getStyles(MockID, value.mockid, theme)}
                  >
                    {MockID}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* <TextField
              id="standard-basic"
              label="Your Mock ID"
              value={value.mockid}
              name="mockid"
              type="number"
              variant="standard"
              onChange={handleChange}
              fullWidth
              required
            /> */}
          </Box>{" "}
          <BootstrapButton
            style={{ color: "white", float: "right", marginTop: "20px" }}
            onClick={handleSubmit}
          >
            Submit
          </BootstrapButton>
        </Box>
      </Modal>
    </div>
  );
}
