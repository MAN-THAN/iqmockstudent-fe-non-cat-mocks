import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Typography from "antd/es/typography/Typography";

function HeaderNew({ style, logoPath }) {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const { _id, name, photoURL } = userData;

  return (
    <header className="w-100">
      <div className="d-flex flex-row align-items-center justify-content-between">
        <div className="flex-item ">
          <img src={logoPath || "/iQuanta.png"} alt="iquanta_logo" className="img-fluid iquanta_logo" />
        </div>

        <div className="d-flex gap-3 ">
          <div className="text-end">
            <Typography
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "19px",
                fontWeight: 600,
                ...style,
              }}
            >
              {name}
            </Typography>
            <Typography
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "13px",
                fontWeight: 400,
                ...style,
              }}
            >
              User id :{_id}
            </Typography>
          </div>

          <div className="d-flex">
            <img src={photoURL} alt="mdo" width="50" height="50" className="rounded" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderNew;
