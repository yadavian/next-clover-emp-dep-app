import React from "react";

const Footer = () => {
  return (
    <>
      <div className="footer-section">
        <div className="footer-lower-section">
          <p>Copyright@ Clover Inoftech</p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "20%",
            }}
          >
            <a>Privacy </a>
            <a>Terms</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
