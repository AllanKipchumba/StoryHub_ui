import React from "react";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { AuthorOnly } from "./AuthorOnly";
import "./singlepost.scss";

export const RenderTitleConditionally = ({
  updateMode,
  title,
  onChange,
  editPost,
  deletePost,
  author,
}) => {
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
    return (
      <>
        <h1 className="font-semibold uppercase">{title}</h1>
        <AuthorOnly author={author}>
          <div className="flex gap-3">
            <FiEdit className="icon" onClick={editPost} />
            <MdDeleteOutline className="icon" onClick={deletePost} />
          </div>
        </AuthorOnly>
      </>
    );
  }
};
