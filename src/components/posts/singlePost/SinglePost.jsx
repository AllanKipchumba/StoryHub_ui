import React from "react";
import "./singlepost.scss";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import ReactTooltip from "react-tooltip";
import { Link } from "react-router-dom";
import axios from "axios";
import { loadingStart, loadingStop } from "../../../Redux/slices/loginSlice";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
};

export const SinglePost = () => {
  const { user, loading } = useSelector((store) => store["logIn"]);
  const token = user.token;
  const dispatch = useDispatch();
  const headers = { Authorization: `Bearer ${token}` };
  const [post, setPost] = useState({});
  const [author, setAuthor] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState();
  const [tooltip, hideTooltip] = useState(true);

  //access post id
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  //   get individual posts by id
  useEffect(() => {
    dispatch(loadingStart());
    const fetchPost = async () => {
      const res = await axios.get("/posts/" + path);
      // console.log(res);
      setPost(res.data.post);
      setAuthor(res.data.postOwner);
      dispatch(loadingStop());
    };
    fetchPost();
  }, []);

  // delete post
  const deletePost = async () => {
    try {
      // alert user to delete
      if (window.confirm(`Delete ${post.title}?`)) {
        // send Bearer tokens along with axios
        await axios.delete("/posts/" + path, { headers });
        window.replace("/");
      } else {
        return false;
      }
      // redirect to home page
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  // update Post
  const updatePost = async () => {
    const updates = {
      title,
      description,
    };
    try {
      if (window.confirm("Update Post")) {
        const res = await axios.patch("/posts/" + path, updates, { headers });
        console.log(res);
        setUpdateMode(false);
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <ClipLoader
          className="loader"
          loading={loading}
          color="#ff0581"
          margin={4}
          size={50}
          cssOverride={override}
        />
      ) : (
        <div className="singlepost">
          <div>
            <div className="flex gap-4">
              {updateMode ? (
                <>
                  <input
                    type="text"
                    placeholder={`Edit title: ${post.title}`}
                    value={title}
                    className="input"
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </>
              ) : (
                <>
                  <h1 className="font-semibold mb-3 uppercase">{post.title}</h1>
                  {author === user?.user.username && (
                    <div className="flex gap-3">
                      <FiEdit
                        className="icon"
                        onClick={() => setUpdateMode(true)}
                        data-tip
                        data-for="editPost"
                        onMouseEnter={() => hideTooltip(true)}
                        onMouseLeave={() => {
                          hideTooltip(false);
                          setTimeout(() => hideTooltip(true), 50);
                        }}
                      />
                      <MdDeleteOutline
                        className="icon"
                        onClick={deletePost}
                        // tooltip props
                        data-tip
                        data-for="deletePost"
                        onMouseEnter={() => hideTooltip(true)}
                        onMouseLeave={() => {
                          hideTooltip(false);
                          setTimeout(() => hideTooltip(true), 50);
                        }}
                      />

                      {tooltip && (
                        <ReactTooltip
                          id="deletePost"
                          place="top"
                          effect="solid"
                        >
                          Delete post
                        </ReactTooltip>
                      )}

                      {tooltip && (
                        <ReactTooltip id="editPost" place="top" effect="solid">
                          Edit post
                        </ReactTooltip>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="flex gap-2 text-[#ff0581]">
              <Link to={`/?author=${author}`}>
                <p
                  // tooltip props
                  data-tip
                  data-for="showAuthorPosts"
                  onMouseEnter={() => hideTooltip(true)}
                  onMouseLeave={() => {
                    hideTooltip(false);
                    setTimeout(() => hideTooltip(true), 50);
                  }}
                  className="capitalize"
                >
                  By {author},
                </p>
              </Link>

              {tooltip && (
                <ReactTooltip id="showAuthorPosts" place="top" effect="solid">
                  Show all posts by {author}
                </ReactTooltip>
              )}

              <p>Posted {new Date(post.createdAt).toDateString()}</p>
            </div>
          </div>

          {updateMode ? (
            <>
              <textarea
                className="input"
                placeholder="Edit post body"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="7"
                cols="50"
              />
              {/* edit button */}
              <div className="mt-10">
                <button onClick={updatePost}>Update</button>
              </div>
            </>
          ) : (
            <div className="mt-3">{post.description}</div>
          )}
        </div>
      )}
    </>
  );
};
