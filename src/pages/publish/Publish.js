import React, { useState } from "react";
import styles from "./publish.module.scss";
import { useSelector } from "react-redux";
import axios from "axios";
import BeatLoader from "react-spinners/BeatLoader";
import { storage } from "../../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { RevealOnScroll } from "../../components/RevealOnScroll/RevealOnScroll";

const categories = [
  { id: 1, name: "Tech" },
  { id: 2, name: "Design" },
  { id: 3, name: "Development" },
  { id: 4, name: "Inspiration" },
  { id: 5, name: "News" },
];

const initialState = {
  title: "",
  imageURL: "",
  category: "",
  description: "",
};

const detectForm = (id, publish, edit) => {
  if (id === "write") {
    return publish;
  }
  return edit;
};

export const Publish = () => {
  const { user } = useSelector((store) => store["auth"]);
  const postDetails = useSelector((store) => store["post"]);
  const postEdit = postDetails.post;
  const token = user.token;
  const headers = { Authorization: `Bearer ${token}` };
  const navigate = useNavigate();
  const { id } = useParams();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const [post, setPost] = useState(() => {
    const newState = detectForm(id, { ...initialState }, postEdit);
    return newState;
  });
  // console.log(post);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };
  const { title, category, imageURL, description } = post;
  // console.log(post);

  //UPLOAD IMAGE TO FIREBASE STORAGE
  const handleImageChange = (e) => {
    //access the file being uploaded
    const file = e.target.files[0];
    //store the file in the images folder in firebase storage
    const storageRef = ref(storage, `images_prod/${Date.now()}${file.name}`);
    //upload task to firebase
    const uploadTask = uploadBytesResumable(storageRef, file);

    //monitor upload progress
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = Math.trunc(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setUploadProgress(progress);
      },
      (error) => {
        console.log(error);
        toast.error(error.message);
      },
      () => {
        // Handle successful uploads on complete
        // get the image url
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setPost({ ...post, imageURL: downloadURL });
          toast.success("Image uploaded succesfully");
        });
      }
    );
  };

  //CREATE POST
  const createPost = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newPost = {
      title,
      category,
      imageURL,
      description,
    };

    try {
      const res = await axios({
        method: "post",
        url: "https://storyhub-api.onrender.com/api/posts/",
        data: newPost,
        headers: headers,
      });
      setLoading(false);
      toast.success("Post Created");
      navigate("/post/" + res.data._id);
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };

  // EDIT POST
  const editPost = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updates = {
      title,
      category,
      imageURL,
      description,
    };

    try {
      const res = await axios({
        method: "patch",
        url: "https://storyhub-api.onrender.com/api/posts/" + id,
        data: updates,
        headers: headers,
      });
      toast.success("Post edited");
      navigate("/post/" + res.data._id);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <RevealOnScroll>
      <div className={styles.write}>
        <div className={styles.header}>
          <h3>{detectForm(id, "Create a new post", "Edit Post")}</h3>
        </div>
        <form
          onSubmit={detectForm(id, createPost, editPost)}
          className="col-span-3"
        >
          <label>Title</label>
          <input
            type="text"
            placeholder="Post title"
            className={styles.input}
            name="title"
            value={title}
            onChange={(e) => handleInputChange(e)}
            required
          />

          <label>Category</label>
          <select
            required
            name="category"
            value={category}
            onChange={(e) => handleInputChange(e)}
            className={styles.input}
          >
            <option value="" disabled>
              -- choose category --
            </option>
            {categories.map((cat) => {
              return (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              );
            })}
          </select>

          <label>Upload image</label>
          <input
            type="file"
            accept="image/*"
            placeholder="product image"
            name="image"
            onChange={(e) => handleImageChange(e)}
            className={styles.input}
          />

          {uploadProgress !== 0 && (
            <div className={styles.progress}>
              <div
                className={styles["progress-bar"]}
                style={{ width: `${uploadProgress}%` }}
              >
                {uploadProgress < 100
                  ? `Uploading... ${uploadProgress}%`
                  : `Upload Complete ${uploadProgress}%`}
              </div>
            </div>
          )}

          {imageURL !== "" && (
            <input
              type="text"
              required
              placeholder="image URL"
              name="imageURL"
              value={imageURL}
              className={styles.input}
              disabled
            />
          )}

          <label>Content</label>
          <textarea
            placeholder="Write your content here"
            rows="15"
            cols="60"
            className={styles.input}
            name="description"
            value={description}
            onChange={(e) => handleInputChange(e)}
            required
          ></textarea>

          <div className="flex gap-5">
            <button type="submit">
              {loading ? (
                <BeatLoader
                  loading={loading}
                  color="#fff"
                  margin={4}
                  size={17}
                />
              ) : (
                detectForm(id, "Publish", "Submit")
              )}
            </button>

            {id !== "write" && (
              <button onClick={() => navigate(`/post/${id}`)}> Cancel</button>
            )}
          </div>
        </form>
      </div>
    </RevealOnScroll>
  );
};
