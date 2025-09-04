import { ArrowDown } from "lucide-react";

const ContactHero = () => {
  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-28 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600 opacity-20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-orange-600 opacity-20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      </div>
      <div className="max-w-6xl mx-auto px-6 lg:px-12 text-center">
        <h1 className="text-5xl font-bold mb-6">Get in Touch</h1>
        <p className="text-lg max-w-2xl mx-auto text-gray-100 mb-8">
          Have questions or need assistance? We’re here to help. Reach out and
          let’s make something amazing together.
        </p>
        <button
          onClick={() => handleScroll("contact-us")}
          className="inline-flex items-center gap-2 cursor-pointer bg-white text-indigo-600 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300"
        >
          Contact Us
          <ArrowDown className="w-5 h-5" />
        </button>
      </div>

      {/* Decorative element */}
      <div className="absolute inset-0 bg-inherit bg-cover bg-center opacity-10 pointer-events-none" />
    </section>
  );
};

export default ContactHero;
