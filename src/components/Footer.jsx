import React from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

function Footer() {
  return (
    <footer
      className="text-center text-lg-start "
      style={{ backgroundColor: "#dbdfe3", padding: "70px" }}
    >
      <div className="container d-flex justify-content-center">
        <h1>Mintix</h1>
      </div>
      {/* Section: Social media */}
      <div className="container d-flex justify-content-center py-4 gap-3">
        <FaFacebookSquare style={{ height: "30px", width: "30px" }} />
        {/* <button
            type="button"
            className="btn btn-primary btn-lg btn-floating mx-2"
            style={{ backgroundColor: "#54456b" }}
          >
          </button>
          <button
            type="button"
            className="btn btn-primary btn-lg btn-floating mx-2"
            style={{ backgroundColor: "#54456b" }}
          >
          </button> */}
        <RiInstagramFill style={{ height: "30px", width: "30px" }} />
      </div>

      {/* Copyright */}
      <div
        className="text-center"
        //   style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        ©2024 Mintix Norge. Alle rettigheter forbeholdt.
      </div>
      {/* End of Copyright */}
    </footer>
  );
}

export default Footer;
