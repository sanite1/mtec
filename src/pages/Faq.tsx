import React, { useState } from "react";

const faqData = [
  {
    title: "General",
    faqs: [
      {
        question: "What is MTEC?",
        answer:
          "MTEC is an all-in-one e-commerce hub that helps you build, manage, and grow your online store. You can sell products, services, and digital goods across multiple channels with secure payments and powerful analytics.",
      },
      {
        question: "Who can use MTEC?",
        answer:
          "MTEC is built for entrepreneurs, small businesses, and growing brands who want to sell online without needing technical expertise.",
      },
      {
        question: "Do I need coding skills to build my store?",
        answer:
          "No coding required! Our drag-and-drop editor and customizable templates make it easy to launch your store in minutes.",
      },
      {
        question: "Can I use my own domain name?",
        answer:
          "Yes. You can connect a custom domain name to your MTEC store for a professional brand presence.",
      },
    ],
  },
  {
    title: "Getting Started / Store Setup",
    faqs: [
      {
        question: "How do I sign up?",
        answer:
          "Simply click 'Sign Up' on our homepage, enter your details, and follow the onboarding steps to set up your store.",
      },
      {
        question: "Can I customize my storefront?",
        answer:
          "Yes. You can choose themes, adjust layouts, add brand colors, and personalize your store with ease.",
      },
      {
        question: "How do I add products and services?",
        answer:
          "From your dashboard, navigate to 'Products' and click 'Add New'. You can upload images, set prices, add descriptions, and manage stock levels.",
      },
      {
        question: "Can I manage inventory and orders?",
        answer:
          "Yes. MTEC provides built-in inventory and order management tools, keeping you updated in real-time.",
      },
    ],
  },
  {
    title: "Payments & Billing",
    faqs: [
      {
        question: "What payment methods does MTEC support?",
        answer:
          "MTEC supports multiple payment gateways, including debit/credit cards, bank transfers, and wallets like Paystack and Stripe.",
      },
      {
        question: "Can I accept international payments?",
        answer:
          "Yes. You can accept payments in both local currency (naira) and global currencies such as USD, GBP, and EUR.",
      },
      {
        question: "How do transaction fees work?",
        answer:
          "Transaction fees depend on the selected payment gateway. MTEC charges no hidden fees—only standard gateway fees apply.",
      },
      {
        question: "When do I receive payouts?",
        answer:
          "Payouts are typically processed within 1–3 business days, depending on your bank and payment gateway.",
      },
    ],
  },
  {
    title: "Selling & Marketing",
    faqs: [
      {
        question: "Can I sell across multiple channels?",
        answer:
          "Yes. MTEC allows you to sell on your website, social media platforms, and offline with sync features.",
      },
      {
        question: "Does MTEC integrate with social media?",
        answer:
          "Yes. You can integrate with platforms like Instagram, Facebook, and WhatsApp to boost sales.",
      },
      {
        question: "Can I offer discounts or coupon codes?",
        answer:
          "Absolutely. You can create discount campaigns, promo codes, and special offers directly from your dashboard.",
      },
      {
        question: "Does MTEC support digital products?",
        answer:
          "Yes. You can sell eBooks, courses, files, and other digital goods with secure delivery.",
      },
    ],
  },
  {
    title: "Security & Support",
    faqs: [
      {
        question: "How secure are transactions on MTEC?",
        answer:
          "We use bank-grade encryption and trusted payment providers to ensure all transactions are safe and secure.",
      },
      {
        question: "What kind of support do you provide?",
        answer:
          "We provide 24/7 customer support via live chat, email, and helpdesk.",
      },
      {
        question: "Is there 24/7 customer service?",
        answer:
          "Yes. Our support team is available around the clock to assist you.",
      },
      {
        question: "How do I contact MTEC for help?",
        answer:
          "You can reach out through our Contact page, submit a support ticket, or email support@mtec.com.",
      },
    ],
  },
];

const FAQsPage = () => {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleFAQ = (index: string) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="">
      <div className="bg-black w-full h-[8vh] lg:h-[10vh]"></div>
      <div className="bg-gray-50 min-h-screen py-16 px-6">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600">
            Find answers to the most common questions about MTEC. Can’t find
            what you’re looking for? Contact our support team.
          </p>
        </div>
        {/* FAQ Categories */}
        <div className="max-w-4xl mx-auto space-y-8">
          {faqData.map((section, sectionIdx) => (
            <div
              key={sectionIdx}
              className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-4">
                {section.title}
              </h2>
              <div className="divide-y divide-gray-200">
                {section.faqs.map((faq, idx) => {
                  const index = `${sectionIdx}-${idx}`;
                  return (
                    <div key={index} className="py-4">
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="flex justify-between items-center w-full text-left focus:outline-none"
                      >
                        <h3 className="text-xl font-semibold text-gray-800">
                          {faq.question}
                        </h3>
                        <span className="ml-2 text-gray-500 text-xl">
                          {openIndex === index ? "−" : "+"}
                        </span>
                      </button>
                      {openIndex === index && (
                        <p className="text-gray-600 text-lg mt-2">
                          {faq.answer}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        {/* CTA Section */}
        <div className="max-w-3xl mx-auto mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Need more help?
          </h2>
          <p className="text-gray-600 mb-6">
            Explore our docs, FAQs, or blogs to learn everything you need to
            know about MTEC.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="/docs"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              Visit Docs
            </a>
            <a
              href="/blogs"
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition"
            >
              Read Blogs
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQsPage;
