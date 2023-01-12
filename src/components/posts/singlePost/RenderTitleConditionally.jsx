import React from "react";
import "./singlepost.scss";

export const RenderTitleConditionally = ({ updateMode, title, onChange }) => {
  if (updateMode) {
    return (
      <input
        type="text"
        placeholder={`Edit title: ${title}`}
        value={title}
        className="input"
        autoFocus
        onChange={onChange}
      />
    );
  } else {
    return <h1 className="font-semibold uppercase">{title}</h1>;
  }
};
