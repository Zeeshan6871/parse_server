import React from "react";

function Footer() {
  return (
    <div className="bg-footer mt-5">
      <div className="footer py-5">
        <img
          src="https://test.mintix.no/static/media/logo.ae7f1a1fda88fa9b502e6ae0ca936313.svg"
          alt="logo"
        />
        <br />
        <p className="py-3">
          <a href="" className="px-2">
            <img
              src="https://test.mintix.no/static/media/facebook.8409ff12c8119e615c2a10f45fc1ec61.svg"
              width="3%"
              alt="facebook"
            />
          </a>
          <a href="">
            <img
              src="https://test.mintix.no/static/media/instagram.949f6367778dbb6995ffef62cc78176b.svg"
              width="3%"
              alt="instagram"
            />
          </a>
        </p>
        <a href="" className="text-reset small">
          Vilkår for bruk
        </a>
        <br />
        <br />
        <p className="small">
          ©2024 Mintix Norge. Alle rettigheter forbeholdt.
        </p>
      </div>
    </div>
  );
}

export default Footer;
