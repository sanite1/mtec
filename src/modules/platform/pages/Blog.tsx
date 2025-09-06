import React from "react";
import { Link } from "react-router-dom";
import priceBg from "../assets/pricingBg.png";
import { blogData } from "../data/blogData";

const BlogsPage = () => {
  return (
    <div className="">
      <div className="bg-black w-full h-[8vh] lg:h-[10vh]"></div>

      <div
        style={{
          backgroundImage: `url(${priceBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="bg-gray-50 min-h-screen"
      >
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto text-center py-16 px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Blog
          </h1>
          <p className="text-lg text-gray-600">
            Insights, stories, and resources to help you grow your online
            business with <span className="font-semibold">MTEC</span>.
          </p>
        </div>

        {/* Featured Post Section */}
        <div className="max-w-[90%] lg:max-w-[90%] mx-auto px-6 lg:px-24 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Featured Post
          </h2>
          {blogData[0] && (
            <Link
              to={`/blogs/${blogData[0].slug}`}
              className="group grid md:grid-cols-2 gap-6 bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
            >
              <div className="h-64 md:h-auto">
                <img
                  src={blogData[0].image}
                  alt={blogData[0].title}
                  className="w-full max-h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col justify-center p-6">
                <span className="text-sm text-blue-600 font-semibold">
                  {blogData[0].category}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                  {blogData[0].title}
                </h2>
                <p className="text-gray-600 mb-4">{blogData[0].excerpt}</p>
                <span className="text-sm text-gray-500">
                  {blogData[0].date} • {blogData[0].author}
                </span>
                <span className="mt-4 inline-block text-blue-600 font-medium group-hover:underline">
                  Read More →
                </span>
              </div>
            </Link>
          )}
        </div>

        {/* Blog Grid Section */}
        <div className="max-w-[90%] lg:max-w-[90%] mx-auto px-6 lg:px-24 py-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Latest Posts
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {blogData.slice(1).map((blog) => (
              <Link
                key={blog.id}
                to={`/blogs/${blog.slug}`}
                className="group bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden flex flex-col"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <span className="text-xs text-indigo-600 font-semibold">
                    {blog.category}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 text-sm flex-1">{blog.excerpt}</p>
                  <span className="text-sm text-gray-500 mt-4">
                    {blog.date} • {blog.author}
                  </span>
                  <span className="mt-3 inline-block text-indigo-600 font-medium group-hover:underline">
                    Read More →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;
