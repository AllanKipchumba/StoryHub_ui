import axios from "axios";
import React, { useState } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Post } from "../../components";
import { Pagination } from "../../components/pagination/Pagination";
import styles from "./myposts.module.scss";
import Notiflix, { Loading } from "notiflix";

export const MyPosts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const [myPosts, setMyPosts] = useState([]);
  const currentPosts = myPosts.slice(indexOfFirstProduct, indexOfLastProduct);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((store) => store["auth"]);
  let token;
  if (user) {
    token = user.token;
  }
  const headers = useMemo(() => {
    if (user) {
      const headers = { Authorization: `Bearer ${token}` };
      return headers;
    }
  }, [token, user]);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        await axios({
          method: "get",
          url: "https://storyhub-api.onrender.com/api/posts/myposts",
          headers: headers,
        }).then((res) => {
          setLoading(false);
          setMyPosts(res.data.slice().reverse());
        });
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchMyPosts();
  }, [headers]);

  return (
    <div className={styles.myposts}>
      {loading &&
        Notiflix.Loading.circle("Fetching data. Please wait...", {
          svgColor: "#eb0202",
          backgroundColor: "rgba(0,0,0,0.5)",
        })}

      {!loading && (
        <>
          {Loading.remove()}
          {myPosts.length === 0 ? (
            <>
              <div class="bg-gray-200 p-10 rounded-lg">
                <h1 class=" text-4xl font-bold text-center hover:no-underline text-gray-800">
                  Welcome to StoryHub
                </h1>
                <p class="text-lg text-center text-gray-600 mt-5">
                  It looks like you haven't published any posts yet. Get started
                  by clicking the 'Publish' button to create a new post!
                </p>
              </div>
              <div class="text-center mt-5">
                <Link to="/publish/write">
                  <button class="border-2 border-[#eb0202] hover:border-[#fd2323] font-bold py-2 px-4 rounded">
                    Publish
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <h3 className="hover:no-underline">My Posts</h3>
              <div className="underLine"></div>
              <div className=" py-3 m-auto grid grid-cols-2 lg:grid-cols-3 gap-6 md:10">
                {currentPosts.map((post) => {
                  return <Post key={post._id} post={post} />;
                })}
              </div>
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                productsPerPage={productsPerPage}
                totalProducts={myPosts.length}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};
