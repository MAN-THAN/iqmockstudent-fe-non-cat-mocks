import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styleSheets/header.css";
import { useSelector } from "react-redux";

function Header() {
  
  const {mockname} = useSelector((state) => state.mockData);
  const {name, mbrId, photoURL } = useSelector((state) => state.userData);
  
  return (
    <header className="p-0 m-0 text-bg-dark">
      <div className="container-fluid  ">
        <div className="d-flex flex-wrap align-items-center justify-content-between justify-content-lg-between py-2 px-3">
          <div className="flex-item mt-1 ">
            <img src="/iquanta_Logo.png" width={120} alt="iquanta_logo" className="img-fluid  " />
          </div>
          <div className="flex-item pt-1 ms-1 ps-5">
            <Typography variant="h4" sx={{ fontSize: "25px" }}>
              {mockname ? mockname : "iCAT 2023"}
            </Typography>
          </div>

          <div className="d-flex gap-3  justify-self-end">
            <div className="text-end">
              <Typography sx={{ fontFamily: "var(--font-inder)", fontSize: "20px", fontWeight: 400 }}>{name}</Typography>
              <Typography sx={{ fontFamily: "var(--font-inder)", fontSize: "13px", fontWeight: 400 }}>UID : {mbrId}</Typography>
            </div>
            <div className="">
              <img src={photoURL} alt="mdo" width="50" height="50" className="rounded" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
