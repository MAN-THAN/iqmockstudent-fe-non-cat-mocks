import React from "react";
import { RxOpenInNewWindow } from "react-icons/rx";

function ErrorPage({ errorMessage }) {
  
  const regex = /\bauth\b/i;
  return (
    <div className="container-fluid vh-100 vw-100 d-flex flex-column justify-content-center align-items-center align-content-center bg-black text-white text-center gap-4">
      <div className="logo mb-3 justify-self-start">
        <img
          src="https://iquantamedia.s3.ap-south-1.amazonaws.com/ui_images/new-home/iQuanta_Logo.webp"
          alt="Logo"
          className="img-fluid"
          width="150"
        />
      </div>
      <div>
        <div>
          <h4 className="m-0 p-0">{errorMessage && errorMessage.toUpperCase()}</h4>
          <p className="pt-2">Please try again...</p>
        </div>

        <h6 className="my-4">Contact us: +91 76830 43155</h6>
        <section className="my-5">
          {errorMessage.toLowerCase().includes("auth") ? (
            <a
              className="btn bg-primary text-white mt-2"
              href="https://www.iquanta.in/cat-mock-test"
              role="button"
            >
              Start Again <RxOpenInNewWindow />
            </a>
          ) : (
            <button
              className="btn bg-primary text-white mt-2"
              onClick={()=>window.location.reload()}
              role="button"
            >
              Reload
            </button>
          )}
        </section>

        <h5>Connect with us at</h5>
        <div className="my-4">
          <ul className="list-unstyled d-flex gap-3 justify-content-center">
            <li>
              <a href="https://www.facebook.com/groups/iquantacat">
                <img
                  style={{ width: "28px" }}
                  src="https://iquantamedia.s3.ap-south-1.amazonaws.com/ui_images/Facebook.png"
                  alt=""
                />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/iquanta.in/">
                <img
                  style={{ width: "28px" }}
                  src="https://iquantamedia.s3.ap-south-1.amazonaws.com/ui_images/Instagram.png"
                  alt=""
                />
              </a>
            </li>
            <li>
              <a href="https://t.me/+ytBggbOqxYgxM2Y9">
                <img
                  style={{ width: "28px" }}
                  src="https://iquantamedia.s3.ap-south-1.amazonaws.com/ui_images/Telegram.png"
                  alt=""
                />
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/@CatpreparationiQuanta">
                <img
                  style={{ width: "28px" }}
                  src="https://iquantamedia.s3.ap-south-1.amazonaws.com/ui_images/Youtube.png"
                  alt=""
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;