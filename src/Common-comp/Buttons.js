import { Button } from "@mui/material";
export const LogoButton = ({ name, icon, style }) => {
   
  return (
    <Button
      sx={{
        ...style,
      }}
      startIcon={<img src={icon} alt="" className="img-fluid" width={style.iconSize} />}
    >
      {name}
    </Button>
  );
};
