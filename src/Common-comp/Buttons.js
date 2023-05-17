import { Button } from "@mui/material";
export const LogoButton = ({ name, icon, style, isDisabled }) => {
   
  return (
    <Button
      sx={{
        ...style,
      }}
      startIcon={<img src={icon} alt="" className="img-fluid" width={style.iconSize} />}
      disabled={ isDisabled }
    >
      {name}
    </Button>
  );
};
