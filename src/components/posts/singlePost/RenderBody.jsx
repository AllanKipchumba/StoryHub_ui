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

export const RenderBody = ({ author, post, loggedinUser, id, headers }) => {
  const navigate = useNavigate();
  const [likes, setLikes] = useState([]);
  const [addComment, setAddComment] = useState(false);
  const [numberOfComments, setnumberOfComments] = useState("");
  const howManyComments = (value) => {
    setnumberOfComments(value);
  };

  //GET THE NUMBER OF LIKES ON A POST
  useEffect(() => {
    const getLikesOnPost = async () => {
      try {
        const res = await axios({
          method: "get",
          url: `http://localhost:5000/api/post/${id}/likes`,
          headers: headers,
        });
        setLikes(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getLikesOnPost();
  });

  //LIKE A POST
  const likePost = async () => {
    try {
      const res = await axios({
        method: "put",
        url: `http://localhost:5000/api/post/${id}/like`,
        headers: headers,
        data: {},
      });
      setLikes(res.data.likes.length);
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  // DELETE A POST
  const deletePost = async () => {
    try {
      await axios({
        method: "delete",
        url: `http://localhost:5000/api/posts/${id}`,
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

          <div className="flex gap-1">
            <FaRegComment
              className="icon icons-LC"
              onClick={() => setAddComment(!addComment)}
            />
            {numberOfComments !== 0 && <p>{numberOfComments}</p>}
          </div>

          <AuthorOnly author={author} loggedinUser={loggedinUser}>
            <div className="flex gap-3">
              <NavLink to={`/publish/${id}`}>
                <FiEdit className="icon" />
              </NavLink>
              <MdDeleteOutline className="icon" onClick={confirmDelete} />
            </div>
          </AuthorOnly>
        </div>

        <CreateComment headers={headers} id={id} addComment={addComment} />

        <DisplayComments
          author={author}
          loggedinUser={loggedinUser}
          headers={headers}
          id={id}
          getNumberOfComments={howManyComments}
        />
      </div>
    </div>
  );
};
