import React from "react";
import "./footer.scss";

export const Footer = () => {
  return (
    <div className="footer text-center py-[50px] font-semibold">
      Copyright &copy; {new Date().getFullYear()} Story
      <span>Hub</span>
    </div>
  );
};
