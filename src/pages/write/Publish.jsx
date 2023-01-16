import React, { useState } from "react";
import "./publish.scss";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import BeatLoader from "react-spinners/BeatLoader";
import { loadingStart, loadingStop } from "../../Redux/slices/loginSlice";
import { storage } from "../../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
  const { user, loading } = useSelector((store) => store["logIn"]);
  const token = user.token;
  const headers = { Authorization: `Bearer ${token}` };
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageURL, setImageURL] = useState("");
  const navigate = useNavigate();

  //UPLOAD IMAGE TO FIREBASE STORAGE
  const handleImageChange = (e) => {
    //access the file being uploaded
    const file = e.target.files[0];
    //store the file in the images folder in firebase storage
    const storageRef = ref(storage, `images/${Date.now()}${file.name}`);
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
        // setUploadProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        // get the image url
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageURL(downloadURL);
          // toast.success("Image uploaded succesfully");
        });
      }
    );
  };

  const submitForm = async (e) => {
    e.preventDefault();
    dispatch(loadingStart());

    const newPost = {
      title,
      category,
      imageURL,
      description,
    };
    try {
      const res = await axios({
        method: "post",
        url: "http://localhost:5000/api/posts/",
        data: newPost,
        headers: headers,
      });
      dispatch(loadingStop());
      // change route to read new post
      navigate("/post/" + res.data._id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="write ">
        <form onSubmit={submitForm} className="col-span-3">
          <label>Title</label>
          <input
            type="text"
            Placeholder="Post Title"
            className="input"
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Category</label>
          <input
            type="text"
            Placeholder="Category"
            className="input"
            onChange={(e) => setCategory(e.target.value)}
            required
          />

          {/* image input */}
          <label>Image</label>
          <input
            type="file"
            accept="image/*"
            placeholder="product image"
            name="image"
            onChange={(e) => handleImageChange(e)}
          />

          {imageURL !== "" && (
            <input
              type="text"
              required
              placeholder="image URL"
              name="imageURL"
              value={imageURL}
              disabled
            />
          )}

          <label>Content</label>
          <textarea
            placeholder="Write your content here"
            rows="15"
            cols="60"
            className="input"
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>

          <button type="submit">
            {loading ? (
              <BeatLoader loading={loading} color="#fff" margin={4} size={17} />
            ) : (
              `Publish`
            )}
          </button>
        </form>
      </div>
    </>
  );
};
