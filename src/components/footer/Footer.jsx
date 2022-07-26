import React from "react";
import "./footer.scss";

export const Footer = () => {
  return (
    <p>
      <div className="footer text-center py-[20px] font-semibold text-[#292929]">
        Copyright &copy; {new Date().getFullYear()} Story
        <span className="text-[#ff0581]">Hub</span>
      </div>
    </p>
  );
};
