import React from "react";

const OurStory = () => {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
          <p className="text-lg text-gray-700 mb-4">
            MTEC was born from a simple idea — to empower entrepreneurs in
            Nigeria and across Africa with the tools they need to create, grow,
            and manage online businesses with ease.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Like many startups, we started small — a passionate team fueled by
            the vision to simplify e-commerce. We understand the challenges of
            launching a business from scratch, so we built MTEC to break down
            barriers and make it possible for anyone to sell online, no matter
            their background or experience.
          </p>
          <p className="text-lg text-gray-700">
            This is just the beginning of our journey. As we grow, our mission
            stays the same: to help you think big, sell bigger, and build your
            business on your terms.
          </p>
        </div>

        {/* Right Image / Illustration */}
        <div className="relative">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1000&q=80"
              alt="Startup team working together"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg">
            Let Us Build Together.
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
