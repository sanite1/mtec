import React from "react";

const JoinCommunity = () => {
  return (
    <section className="w-full bg-gradient-to-r from-blue-600 to-green-700 py-20 px-6">
      <div className="max-w-4xl mx-auto text-center text-white">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Join Our Community
        </h2>
        <p className="text-lg md:text-xl text-gray-200 mb-8">
          Be part of a growing network of innovators, entrepreneurs, and
          creators. Share ideas, learn, and grow together with us.
        </p>

        {/* Call to Action */}
        <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-5 py-3 w-full sm:w-80 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold transition"
          >
            Join Now
          </button>
        </form>

        {/* Socials / Extra Info */}
        <div className="mt-8 flex justify-center gap-6">
          <a
            href="/"
            className="text-white hover:text-yellow-400 transition text-sm"
          >
            Twitter
          </a>
          <a
            href="/"
            className="text-white hover:text-yellow-400 transition text-sm"
          >
            LinkedIn
          </a>
          <a
            href="/"
            className="text-white hover:text-yellow-400 transition text-sm"
          >
            Discord
          </a>
        </div>
      </div>
    </section>
  );
};

export default JoinCommunity;
