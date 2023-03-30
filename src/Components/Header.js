
import { Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import "../styleSheets/header.css"


function Header() {
    const userName = JSON.parse(localStorage.getItem("userData"))?.name;
    const userID = JSON.parse(localStorage.getItem("userData"))?.uid;
    // const img_url = JSON.parse(localStorage.getItem("userData"))?.;
   
    return (
        <header className="p-0 m-0 text-bg-dark">
            <div className="container-fluid  ">
                <div className="d-flex flex-wrap align-items-center justify-content-between justify-content-lg-between py-2 px-3">
                    <div className='flex-item ' >
                        <Link to="/">
                        <img src={require("../images/iquanta_Logo.png")} width={100} alt="iquanta_logo" className='img-fluid  '/></Link>
                    </div>
                    <div className='flex-item pt-1 ms-5 ps-5' >
                        <Typography variant='h4' sx={{fontSize:"25px"}}>iCAT 1.O 2023</Typography>
                    </div>

                    <div className="d-flex gap-3  justify-self-end">
                        <div className='text-end'>
                            <Typography sx={{ fontFamily: "var(--font-inder)", fontSize: "20px", fontWeight: 400 }} >{ userName }</Typography>
                            <Typography sx={{ fontFamily: "var(--font-inder)", fontSize: "13px", fontWeight: 400 }}>User id : { userID}</Typography>
                        </div>
                        <div className=''>
                            <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="https://github.com/mdo.png" alt="mdo" width="50" height="50" className="rounded" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        </header>
    )
}

export default Header