import React, { useEffect, useState } from "react";
import "./singlepost.scss";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { CreateComment } from "./CreateComment";
import { DisplayComments } from "./DisplayComments";
import { AuthorOnly } from "./AuthorOnly";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Notiflix from "notiflix";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_URL } from "../../../Redux/slices/postDetailsSlice";

export const RenderBody = ({ author, post, loggedinUser, id, headers }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [likes, setLikes] = useState([]);
  const [addComment, setAddComment] = useState(false);
  const toggleAddComment = (value) => setAddComment(value);
  const { isLoggedIn } = useSelector((store) => store["auth"]);
  const url = window.location.href;

  //GET THE NUMBER OF LIKES ON A POST
  useEffect(() => {
    const getLikesOnPost = async () => {
      try {
        const res = await axios({
          method: "get",
          url: `https://storyhub-api.onrender.com/api/post/${id}/likes`,
          headers: headers,
        });
        setLikes(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getLikesOnPost();
  }, [likes, headers, id, dispatch]);

  //LIKE A POST
  const likePost = async () => {
    switch (isLoggedIn) {
      case true:
        try {
          const res = await axios({
            method: "put",
            url: `https://storyhub-api.onrender.com/api/post/${id}/like`,
            headers: headers,
            data: {},
          });
          setLikes(res.data.likes.length);
        } catch (error) {
          toast.error(error.response.data);
        }
        break;
      default:
        dispatch(SAVE_URL(url));
        navigate("/login");
        break;
    }
  };

  // DELETE A POST
  const deletePost = async () => {
    try {
      await axios({
        method: "delete",
        url: `https://storyhub-api.onrender.com/api/posts/${id}`,
        headers: headers,
      });
      navigate("/");
    } catch (error) {
      toast.error(error);
    }
  };

  const confirmDelete = () => {
    Notiflix.Confirm.show(
      "Delete Post!!!",
      `You are about to delete: ${post.title}`,
      "Delete",
      "Cancel",
      function okCb() {
        deletePost();
      },
      function cancelCb() {},
      {
        width: "320px",
        borderRadius: "8px",
        titleColor: "#eb0202",
        okButtonBackground: "#eb0202",
        cssAnimationStyle: "zoom",
      }
    );
  };

  return (
    <div className="mt-3">
      <div className="description">{post.description}</div>
      <div className="p-[2rem]">
        <div className="mt-6 flex gap-5">
          <div className="flex gap-1">
            <AiOutlineLike className="icon icons-LC" onClick={likePost} />
            {likes !== 0 && <p>{likes}</p>}
          </div>

          <AuthorOnly author={author} loggedinUser={loggedinUser}>
            <div className="flex gap-3">
              <NavLink to={`/publish/${id}`}>
                <FiEdit className="icon mt-1" />
              </NavLink>
              <MdDeleteOutline className="icon mt-1" onClick={confirmDelete} />
            </div>
          </AuthorOnly>

          <div
            className="flex gap-1 hover:cursor-pointer"
            onClick={() => setAddComment(!addComment)}
          >
            <FaRegComment className="icon icons-LC" />
            <p>Comment</p>
          </div>
        </div>

        <CreateComment
          headers={headers}
          id={id}
          addComment={addComment}
          toggleAddComment={toggleAddComment}
          url={url}
          isLoggedIn={isLoggedIn}
        />

        <DisplayComments
          loggedinUser={loggedinUser}
          headers={headers}
          id={id}
          url={url}
          isLoggedIn={isLoggedIn}
        />
      </div>
    </div>
  );
};
