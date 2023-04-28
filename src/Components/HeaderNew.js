import React from "react";
import { NavLink } from "react-router-dom";
import Typography from "antd/es/typography/Typography";

function HeaderNew({ style, logoPath }) {
  return (
    <header className="w-100">
      <div className="d-flex flex-row align-items-center justify-content-between">
        <div className="flex-item ">
          <NavLink to="/">
            <img
              src={logoPath || "/iQuanta.png"}
              alt="iquanta_logo"
              className="img-fluid iquanta_logo"
            />
          </NavLink>
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
              Gaurav
            </Typography>
            <Typography
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "13px",
                fontWeight: 400,
                ...style,
              }}
            >
              User id :{675788716}
            </Typography>
          </div>

          <div className="d-flex">
            <a
              href="#"
              className="d-block link-dark text-decoration-none "
              aria-expanded="false"
            >
              <img
                src="https://github.com/mdo.png"
                alt="mdo"
                width="50"
                height="50"
                className="rounded"
              />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderNew;
