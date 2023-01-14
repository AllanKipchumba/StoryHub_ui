import React from "react";

export const Timestamp = ({ createdAt }) => {
  const date = new Date(createdAt);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthIndex = date.getMonth();
  const fullMonthName = monthNames[monthIndex];
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  const timestamp = fullMonthName + " " + day + ", " + year;

  return <p className="timestamp">{timestamp}</p>;
};
