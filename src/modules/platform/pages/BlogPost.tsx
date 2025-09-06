import React from "react";
import { useParams, Link } from "react-router-dom";
import { blogData } from "../data/blogData";

export default function BlogPost() {
  const { slug } = useParams();
  const blog = blogData.find((b) => b.slug === slug);

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Blog post not found
        </h1>
        <Link
          to="/blogs"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero section with banner image */}
      <div className="relative">
        {/* Background image */}
        <div
          className="w-full h-64 sm:h-80 md:h-96 lg:h-[480px] overflow-hidden rounded-b-3xl shadow-lg bg-cover bg-center relative"
          style={{ backgroundImage: `url(${blog.image})` }}
        >
          {/* Black overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        </div>

        {/* Overlay content card */}
        <div className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2 w-[90%] max-w-5xl bg-gray-400 rounded-2xl p-6 md:p-10 shadow-xl z-10">
          {/* <span className="text-sm text-blue-600 font-semibold">
            {blog.category}
          </span> */}
          <h1 className="text-3xl md:text-4xl font-bold leading-tight text-gray-900 mb-4">
            {blog.title}
          </h1>
          <div className="text-sm text-gray-600 flex flex-wrap gap-4">
            <span>
              By <strong>{blog.author}</strong>
            </span>
            <span>{blog.date}</span>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <section className="pt-[80px] pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <article className="prose prose-lg max-w-none text-gray-700 space-y-8">
            {blog?.content?.map((section, index) => (
              <div key={index}>
                <h2 className="text-2xl font-bold mb-3 text-gray-900">
                  {section.subheading}
                </h2>

                {section.body.split(/\n\s*\n/).map((block, i) => {
                  const lines = block.trim().split(/\n/).filter(Boolean);

                  const isListBlock = lines.every((line) =>
                    line.trim().startsWith("-")
                  );

                  if (isListBlock) {
                    return (
                      <ul key={i} className="list-disc list-inside space-y-2">
                        {lines.map((line, j) => (
                          <li key={j}>
                            {line
                              .replace(/^-+\s*/, "")
                              .split(/(\*\*[^*]+\*\*)/g)
                              .map((chunk, k) =>
                                /^\*\*[^*]+\*\*$/.test(chunk) ? (
                                  <strong key={k}>{chunk.slice(2, -2)}</strong>
                                ) : (
                                  chunk
                                )
                              )}
                          </li>
                        ))}
                      </ul>
                    );
                  } else {
                    return lines.map((line, j) => {
                      const trimmed = line.trim();

                      // Single bullet inside mixed block
                      if (trimmed.startsWith("-")) {
                        return (
                          <ul
                            key={`${i}-${j}`}
                            className="list-disc list-inside space-y-2"
                          >
                            <li>
                              {trimmed
                                .replace(/^-+\s*/, "")
                                .split(/(\*\*[^*]+\*\*)/g)
                                .map((chunk, k) =>
                                  /^\*\*[^*]+\*\*$/.test(chunk) ? (
                                    <strong key={k}>
                                      {chunk.slice(2, -2)}
                                    </strong>
                                  ) : (
                                    chunk
                                  )
                                )}
                            </li>
                          </ul>
                        );
                      }

                      // Regular paragraph
                      return (
                        <p key={`${i}-${j}`} className="leading-relaxed">
                          {trimmed
                            .split(/(\*\*[^*]+\*\*)/g)
                            .map((chunk, k) =>
                              /^\*\*[^*]+\*\*$/.test(chunk) ? (
                                <strong key={k}>{chunk.slice(2, -2)}</strong>
                              ) : (
                                chunk
                              )
                            )}
                        </p>
                      );
                    });
                  }
                })}
              </div>
            ))}
          </article>

          {/* Back to Blogs Button */}
          <div className="mt-16 text-center">
            <Link
              to="/blog"
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
            >
              ← Back to Blogs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
