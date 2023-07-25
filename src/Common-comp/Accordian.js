import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
  //   border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    border: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />} {...props} />)(
  ({ theme }) => ({
    //   backgroundColor:
    //     theme.palette.mode === "dark"
    //       ? "rgba(255, 255, 255, .05)"
    //       : "rgba(0, 0, 0, .03)",
    flexDirection: "row",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      fontSize: 16,
      fontFamily: "var(--font-inter)",
      fontWeight: 600,
    },
  })
);

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
  fontFamily: "var(--font-inter)",
  fontWeight: "bold",
}));

const Title = styled(Typography)({
  fontSize: "16px",
  fontFamily: "var(--font-inter)",
  fontWeight: 600,
  color: "#333",
});

export default function CustomizedAccordions({ data }) {
  const [expandVarc, setExpandVarc] = React.useState(false);
  const [expandLrdi, setExpandLrdi] = React.useState(false);
  const [expandQuant, setExpandQuant] = React.useState(false);
  //console.log(data);

  // const handleChange = (panel) => (event, newExpanded) => {
  //   setExpanded(newExpanded ? panel : false);
  // };

  return (
    <div>
      <Accordion expanded={expandVarc} onChange={() => setExpandVarc(!expandVarc)}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Title>VARC</Title>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 1 }}>
            <Typography sx={{ fontSize: "16px", fontWeight: 700 }}>{"Topics"}</Typography>
            <Typography sx={{ fontSize: "16px", fontWeight: 700 }}>{"Accuracy"}</Typography>
          </Box>
          <Typography>
            {data &&
              data.varc.map((e, ind) => {
                return (
                  <Box key={ind} sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 1 }}>
                    <Typography>{e.topic}</Typography>
                    <Typography>{e.accuracy}</Typography>
                  </Box>
                );
              })}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expandLrdi} onChange={() => setExpandLrdi(!expandLrdi)}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Title>LRDI</Title>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 1 }}>
            <Typography sx={{ fontSize: "16px", fontWeight: 700 }}>{"Topics"}</Typography>
            <Typography sx={{ fontSize: "16px", fontWeight: 700 }}>{"Accuracy"}</Typography>
          </Box>
          <Typography>
            {data &&
              data.lrdi.map((e, ind) => {
                return (
                  <Box key={ind} sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 1 }}>
                    <Typography>{e.topic}</Typography>
                    <Typography>{e.accuracy}</Typography>
                  </Box>
                );
              })}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expandQuant} onChange={() => setExpandQuant(!expandQuant)}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Title>Quants</Title>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 1 }}>
            <Typography sx={{ fontSize: "16px", fontWeight: 700 }}>{"Topics"}</Typography>
            <Typography sx={{ fontSize: "16px", fontWeight: 700 }}>{"Accuracy"}</Typography>
          </Box>
          <Typography>
            {data &&
              data.quants.map((e, ind) => {
                return (
                  <Box key={ind}  sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 1 }}>
                    <Typography>{e.topic}</Typography>
                    <Typography>{e.accuracy}</Typography>
                  </Box>
                );
              })}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
