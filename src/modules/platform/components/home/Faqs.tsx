import React, { useState } from "react";
import background from "../../assets/bluegradient.png";
const faqs = [
  {
    question: "What services does MTEC provide?",
    answer:
      "We specialize in IT solutions, consultancy, and managed services designed to help businesses scale efficiently.",
  },
  {
    question: "Are MTEC professionals certified?",
    answer:
      "Yes. Our team consists of certified experts across multiple technology domains, ensuring industry-standard solutions.",
  },
  {
    question: "How does MTEC ensure project success?",
    answer:
      "We adopt a client-first approach, with detailed planning, transparent communication, and cutting-edge tools.",
  },
  {
    question: "Can MTEC support startups and large enterprises?",
    answer:
      "Absolutely. Whether you’re a growing startup or an established enterprise, we tailor solutions to your needs.",
  },
  {
    question: "Does MTEC offer ongoing support?",
    answer:
      "Yes. We provide 24/7 technical support and proactive monitoring to ensure business continuity.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="bg-[#1c1c1c] text-white py-16 px-6 mt-[50px]"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Content */}
        <div>
          <h2 className="text-4xl font-bold mb-4 text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-50">
            At <span className="text-blue-400 font-semibold">MTEC</span>, we
            believe in clarity. Here are answers to common questions our clients
            ask about our services and approach.
          </p>
        </div>

        {/* Right Content */}
        <div className="bg-[#101010] p-8 rounded-lg divide-y divide-gray-700">
          {faqs.map((faq, index) => (
            <div key={index} className="py-4">
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full text-left focus:outline-none"
              >
                <h3 className="font-semibold text-lg">{faq.question}</h3>
                <span className="ml-2 text-gray-400">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <p className="text-gray-400 text-sm mt-2">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
