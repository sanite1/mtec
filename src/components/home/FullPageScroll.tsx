import React, { useEffect } from "react";
// @ts-ignore
import fullpage from "fullpage.js";

export default function FullPageScroll() {
  useEffect(() => {
    new fullpage("#fullpage", {
      autoScrolling: true,
      scrollHorizontally: true,
    });
  }, []);

  return (
    <div id="fullpage">
      <div className="section bg-red-500 flex items-center justify-center">
        <h1 className="text-4xl text-white">Section 1</h1>
      </div>
      <div className="section bg-blue-500 flex items-center justify-center">
        <h1 className="text-4xl text-white">Section 2</h1>
      </div>
      <div className="section bg-green-500 flex items-center justify-center">
        <h1 className="text-4xl text-white">Section 3</h1>
      </div>
    </div>
  );
}
