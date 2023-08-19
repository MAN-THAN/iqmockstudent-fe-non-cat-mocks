import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Typography from "antd/es/typography/Typography";
import { useSelector } from "react-redux";

function HeaderNew({ style, logoPath }) {
  const data = useSelector((state) => state.userData);
  return (
    <header className="w-100">
      <div className="d-flex flex-row align-items-center justify-content-between">
        <div className="flex-item ">
          <img src={logoPath || "/iQuanta.png"} alt="iquanta_logo" className="img-fluid iquanta_logo" />
        </div>

        <div className="d-flex gap-2 ">
          <div className="text-end">
            <Typography
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "19px",
                fontWeight: 700,
                ...style,
              }}
            >
              {data?.name}
            </Typography>
            <Typography
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "12.5px",
                color : "gray",
                fontWeight: 550,
                ...style,
              }}
            >
              UID : {data?.mbrId}
            </Typography>
          </div>

          <div className="d-flex">
            <img src={data?.photoURL} alt="mdo" width="50" height="50" className="rounded" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderNew;
