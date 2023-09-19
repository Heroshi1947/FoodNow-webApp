import React from "react";
import top from "../components/icons8-top-arrow-48.png";

export default function Footer() {
  const handleLinkClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  return (
    <div>
      <footer className="d-flex  align-items-center py-3 m-auto border-top">
        <div className="col-md-10 d-flex align-items-center  justify-content-center ">
          <span className="mb-3 mb-md-0 text-muted">
            {" "}
            --------------© 2023 FoodNow----------------
          </span>
          <img src={top} onClick={handleLinkClick}></img>
        </div>
      </footer>
    </div>
  );
}
