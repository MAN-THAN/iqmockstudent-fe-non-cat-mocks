import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { MyButton } from "../styleSheets/Style";
import {style} from "../styleSheets/StyleNew"
export default function ImgMediaCard({ cardData }) {
 
console.log(cardData)
  return (
    <Card sx={{ maxWidth: 259, boxShadow: "none" }}>
      <CardMedia component="img" alt="Market card" height="350" sx={{ borderRadius: 10 }} image={cardData.image} />
      <CardContent>
        <div className="d-flex justify-content-between">
          <span>
            <Typography style={style.HeadingStyle}>{cardData.title}</Typography>
            <Typography style={style.subHeading}>{cardData.subtitle}</Typography>
          </span>
          <span>
            <Typography
              style={{
                ...style.subHeading,
                textDecoration: "line-through",
                fontSize: "13px",
              }}
            >
              {cardData.crossPrice}
            </Typography>
            <Typography style={style.HeadingStyle}>{cardData.price}</Typography>
          </span>
        </div>
      </CardContent>
      <CardActions sx={{ pt: 0 }}>
        <MyButton sx={{ width: "46px", borderRadius: "10px" }}>
          {" "}
          <img src="/marketLink.png" />
        </MyButton>
        <MyButton sx={{ width: "164px", borderRadius: "10px", ...style.subHeading }}>
          <a style={{textDecoration : "none", color : "white"}} href={cardData.buyNowLink} target='_blank' >Buy Now</a>
        </MyButton>
      </CardActions>
    </Card>
  );
}
