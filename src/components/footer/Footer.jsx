import React from "react";

export const Footer = () => {
  return (
    <p>
      <div className="text-center py-[30px] text-[#292929]">
        Copyright &copy; {new Date().getFullYear()} Story
        <span className="text-[#ff0581]">Hub</span>
      </div>
    </p>
  );
};
