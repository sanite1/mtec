import React from "react";
import lightBlueBg from "../../assets/lightBlueBg.png";
import { Link } from "react-router-dom";
import { HelpCircle, BookOpen, FileText } from "lucide-react"; // Icons

const NeedMoreHelp = () => {
  const links = [
    {
      to: "/faq",
      icon: <HelpCircle className="w-8 h-8" />,
      title: "Frequently Asked Questions",
      desc: "Get answers to some of the most commonly asked questions and feedback.",
    },
    {
      to: "/docs",
      icon: <FileText className="w-8 h-8" />,
      title: "Documentation",
      desc: "Learn everything you need to know about setting up and using MTEC.",
    },
    {
      to: "/blog",
      icon: <BookOpen className="w-8 h-8" />,
      title: "Blog",
      desc: "Read tips, insights, and news to help grow your business with MTEC.",
    },
  ];

  return (
    <section
      className="relative py-20 bg-cover bg-center"
      style={{ backgroundImage: `url(${lightBlueBg})` }}
    >
      <div className="relative max-w-6xl mx-auto text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
          Need more help?
        </h2>
        <p className="text-lg md:text-xl mb-12 text-gray-700">
          Find answers to your questions. Explore our docs to learn everything
          you need to know about <span className="font-semibold">MTEC</span>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {links.map((link, idx) => (
            <Link
              key={idx}
              to={link.to}
              className="flex items-start gap-4 bg-gray-900 text-white rounded-2xl p-6 shadow hover:bg-gray-800 transition w-full"
            >
              <div className="flex-shrink-0 bg-gray-800 p-3 rounded-full">
                {link.icon}
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold mb-1">{link.title}</h3>
                <p className="text-sm text-gray-300">{link.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NeedMoreHelp;
