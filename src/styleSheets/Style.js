import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { createTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import LoadingButton from "@mui/lab/LoadingButton";
import { alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import Table from "@mui/material/Table";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

export const theme = createTheme({
  typography: {
    h4: {
      fontFamily: "var(--font-inter)",
      color: "white",
      fontWeight: 700,
      fontSize: "28.5px",
    },
    paragraph: {
      color: "var(--font-color)",
      fontWeight: 600,
      fontFamily: "var(--font-inter)",
      fontSize: "15px",
    },
    text: {
      color: "var(--font-color)",
      fontWeight: 500,
      fontFamily: "var(--font-inter)",
      fontSize: "15px",
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  },

  root: {
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "yellow",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "yellow",
      },
      "&.MuiDialog-root": {
        zIndex: 10000,
      },
    },
  },
});

export const SubmitButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: "13px",
  fontWeight: 600,
  width: "280px",
  padding: "10px ",
  height: "30px",
  color: "black",
  borderRadius: "20px",
  backgroundColor: " #CECECE;",
  fontFamily: "var(--font-inder)",
 
  "&:hover": {
    borderColor: "#CECECE",
    boxShadow: "none",
    backgroundColor: "#aba9a9",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#aba9a9",
  },
  "&:focus": {
    boxShadow: "none",
    backgroundColor: "#aba9a9",
  },
});

export const MyButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: "13px",
  fontWeight: 600,
  margin: "10px",
  width: "209px",
  padding: "10px ",
  height: "30px",
  borderRadius: "20px",
  backgroundColor: " #1B4A82;",
  fontFamily: "var(--font-inter)",
   color: "white",
  "&:hover": {
    borderColor: "#0062cc",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0062cc",
  },
  "&:focus": {
    color: "white",
  },
});

// Orange color Buttons
export const BootstrapButton = styled(LoadingButton)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: "15px",
  fontWeight: 600,
  width: "189px",
  height: "28px",
  color: "black",
  borderRadius: "20px",
  lineHeight: 1.5,
  backgroundColor: "#FF9000",
  fontFamily: "var(--font-inter)",
  "&:hover": {
    backgroundColor: "#ff7b0f",
    borderColor: "none",
    boxShadow: "none",
    color: "white",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0062cc",
    borderColor: "none",
  },
  "&:focus": {
    // boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    backgroundColor: "#ff7b0f",
    color: "white",
    outerLine: "none",
  },
});

export const ModifyButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: "18px",
  fontWeight: 500,
  width: "auto",
  height: "auto",
  color: "black",
  padding: "",
  borderRadius: "20px",
  lineHeight: 1.5,
  backgroundColor: "var( --light-background)",
  fontFamily: "var(--font-inter)",
  "&:hover": {
    backgroundColor: "#00359A",
    // borderColor: "none",
    // boxShadow: "none",
    color: "white",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#00359A",
    borderColor: "none",
  },
  "&:focus": {
    // boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    backgroundColor: "#00359A",
    color: "white",
    outerLine: "none",
  },
});

export const SubHeading = styled("div")(({ theme }) => ({
  fontFamily: "var(--font-inter)",
  fontSize: "22px",
  fontWeight: "600",
  lineHeight: "28px",
  letterSpacing: "0em",
  textAlign: "left",
  color: "black",
  m: 2,
}));

// Drawer customize css

export const clicked = {
  bgcolor: "#FFFFFF",
  color: "black",
  borderRadius: "10px",
  boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.25)",
  cursor: "pointer",
  margin: "6px",
};

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 250,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[400],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
        "&:hover": {
          color: "#ff7b0f",
        },
      },
    },
  },
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.gray,

    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "17.76px",
  },
}));

export const StyledTable = styled(Table)(({ theme }) => ({
  borderCollapse: "separate",
  borderSpacing: "0 13px",
  // background:"red",
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  py: 5,

  "& td": {
    paddingBottom: "10px",
    paddingTop: "10px",
  },
  "&:hover": {
    backgroundColor: " #dedede !important",
  },
}));
