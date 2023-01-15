import React, { useState } from "react";
import { Pagination } from "../pagination/Pagination";
import { Post } from "./post/Post";

export const AllPosts = ({ posts }) => {
  //pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);

  //get current Products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  //Return a subarray of elements from the posts array, starting at the firstProductIndex and ending at (and not including) the lastProductIndex
  const currentPosts = posts.slice(indexOfFirstProduct, indexOfLastProduct);
  return (
    <div>
      <div className="mx-auto mt-3 grid grid-cols-2 lg:grid-cols-3">
        <h3 className="hover:no-underline">All Posts</h3>
      </div>
      <div className="underLine"></div>

      <div className=" py-3 m-auto grid grid-cols-2 lg:grid-cols-3 gap-10">
        {currentPosts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>

      {/* PAGINATION */}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        productsPerPage={productsPerPage}
        totalProducts={posts.length}
      />
    </div>
  );
};
