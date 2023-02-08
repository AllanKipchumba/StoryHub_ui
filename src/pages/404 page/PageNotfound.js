import React from "react";

export const PageNotfound = () => {
  return (
    <div class="bg-gray-200 text-center p-10 mx-[10%] mt-[15rem] mb-[15em]">
      <div class="container mx-auto">
        <h1 class="text-5xl font-bold hover:no-underline">404 Error</h1>
        <p class="text-2xl ">Page not found</p>
        <a href="/" class="btn btn-indigo mt-6">
          Go back to the Homepage
        </a>
      </div>
    </div>
  );
};
