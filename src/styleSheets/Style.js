import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { createTheme } from "@mui/material/styles";
import Paper from '@mui/material/Paper';



export const theme = createTheme({
   
    typography: {
        h4: {
            fontSize: "250",
            fontFamily: "var(--font-inter)"  ,          
            color: "white",
            fontWeight: 700,
            fontSize:"28.5px"
        },
        paragraph: {
            color: "var(--font-color)",
            fontWeight: 600,
            fontFamily: "var(--font-inter)" ,
            fontSize: "15px",
        },


    },
});



export const SubmitButton = styled(Button)({
    boxShadow: "none",
    textTransform: "none",
    fontSize: "13px",
    fontWeight: 600,
    margin: "10px",
    width: "209px",
    padding: "10px ",
    height: "30px",
    color: "black",
    borderRadius: "20px",
    backgroundColor: " #CECECE;",
    fontFamily: "var(--font-inder)",
    borderRadius: "15px",
    color: "black",
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
    color: "black",
    borderRadius: "20px",
    backgroundColor: " #1B4A82;",
    fontFamily: "var(--font-inter)",
    borderRadius: "15px",
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
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
        color: "white",
    },
});

// Orange color Buttons
export const BootstrapButton = styled(Button)({
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

export const SubHeading = styled("div")(({ theme }) => ({
    fontFamily: "var(--font-inter)",
    fontSize:"22px",
    fontWeight: "600",
    lineHeight: "28px",
    letterSpacing: "0em",
    textAlign: "left",
    color:"black",  
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
}



export const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));