import React from "react";
import "./singlepost.scss";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { CreateComment } from "./CreateComment";
import { DisplayComments } from "./DisplayComments";
import { AuthorOnly } from "./AuthorOnly";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { NavLink } from "react-router-dom";

export const RenderBody = ({
  author,
  post,
  likePost,
  likes,
  showAddcommentForm,
  numberOfComments,
  addComment,
  commentPost,
  setComment,
  hasComments,
  commentsOnPost,
  likeComment,
  deleteComment,
  handleData,
  loggedinUser,
  deletePost,
  id,
}) => {
  return (
    <div className="mt-3">
      <div className="description">{post.description}</div>
      <div>
        <div className="mt-6 flex gap-5">
          <div className="flex gap-1">
            <AiOutlineLike className="icon icons-LC" onClick={likePost} />
            {likes !== 0 && <p>{likes}</p>}
          </div>

          <div className="flex gap-1">
            <FaRegComment
              className="icon icons-LC"
              onClick={showAddcommentForm}
            />
            {numberOfComments !== 0 && <p>{numberOfComments}</p>}
          </div>

          <AuthorOnly author={author} loggedinUser={loggedinUser}>
            <div className="flex gap-3">
              <NavLink to={`/publish/${id}`}>
                <FiEdit className="icon" />
              </NavLink>
              <MdDeleteOutline className="icon" onClick={deletePost} />
            </div>
          </AuthorOnly>
        </div>

        <CreateComment
          addComment={addComment}
          commentPost={commentPost}
          setComment={setComment}
        />

        <DisplayComments
          hasComments={hasComments}
          numberOfComments={numberOfComments}
          likeComment={likeComment}
          deleteComment={deleteComment}
          author={author}
          commentsOnPost={commentsOnPost}
          handleData={handleData}
          loggedinUser={loggedinUser}
        />
      </div>
    </div>
  );
};
