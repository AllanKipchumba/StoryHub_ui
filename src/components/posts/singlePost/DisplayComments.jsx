import React from "react";
import "./singlepost.scss";
import { AiOutlineLike } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { AuthorOnly } from "./AuthorOnly";

export const DisplayComments = ({
  hasComments,
  numberOfComments,
  commentsOnPost,
  likeComment,
  deleteComment,
  author,
  handleData,
  loggedinUser,
}) => {
  if (hasComments) {
    return (
      <div className="comments-container p-10 mt-10 lg:max-w-[70%] mx-auto">
        <p className="text-center font-bold tracking-[2px]">
          {numberOfComments === 1 ? (
            <p>1 comment</p>
          ) : (
            <p>{numberOfComments} comments</p>
          )}
        </p>

        {commentsOnPost?.map((comment, index) => {
          return (
            <div key={index} className="mt-5 comments">
              <div key={comment._id} className="comment">
                <div className=" mb-2 text-[#ff0581] flex justify-start gap-3">
                  <p className="capitalize text-sm font-semibold">
                    {comment.authorName}
                  </p>
                  <p className="text-xs italic">
                    {new Date(comment.createdAt).toLocaleString()}
                  </p>
                </div>
                <hr />
                <p className="align-justify">{comment.comment}</p>
                <div className="mt-2 flex gap-2">
                  <AiOutlineLike
                    className="icon icons-LC"
                    onClick={likeComment}
                    onMouseEnter={() => handleData(comment._id)}
                  />

                  {comment.likes.length !== 0 && <p>{comment.likes.length}</p>}

                  <AuthorOnly author={author} loggedinUser={loggedinUser}>
                    <MdOutlineDelete
                      className="icon icons-LC"
                      onClick={deleteComment}
                    />
                  </AuthorOnly>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
};
