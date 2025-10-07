import React from "react";

const Footer = () => {
  return (
    <footer style={{
      width: "100%",
      padding: "20px 40px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      position: "absolute",
      bottom: 0,
      left: 0,
      zIndex: 2,
      color: "#fff",
      fontSize: "0.9rem"
    }}>
      <div>
        © 2025 YOBHA. All rights reserved.
      </div>
      <div style={{ display: "flex", gap: "15px" }}>
        <a href="#" style={{ color: "#fff" }}>Privacy</a>
        <a href="#" style={{ color: "#fff" }}>Terms</a>
        <a href="#" style={{ color: "#fff" }}>Facebook</a>
        <a href="#" style={{ color: "#fff" }}>Twitter</a>
        <a href="#" style={{ color: "#fff" }}>Instagram</a>
      </div>
    </footer>
  );
};

export default Footer;
