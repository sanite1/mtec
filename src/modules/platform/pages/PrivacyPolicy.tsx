// PrivacyPolicy.tsx
import React from "react";

export default function PrivacyPolicy() {
  const toc = [
    { id: "intro", label: "Introduction" },
    { id: "data-we-collect", label: "Information We Collect" },
    { id: "use-of-data", label: "How We Use Your Information" },
    { id: "cookies", label: "Cookies & Tracking Technologies" },
    { id: "third-parties", label: "Third-Party Services" },
    { id: "data-security", label: "Data Security" },
    { id: "data-retention", label: "Data Retention" },
    { id: "user-rights", label: "Your Rights" },
    { id: "children", label: "Children’s Privacy" },
    { id: "changes", label: "Changes to this Policy" },
    { id: "contact", label: "Contact Us" },
  ];

  // Smooth scroll handler
  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="">
      <section className="relative flex items-center justify-center h-[60vh] bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
        {/* Background overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />

        {/* Decorative gradient blur */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-pink-500/30 rounded-full blur-3xl" />

        {/* Content */}
        <div className="container mx-auto px-6 text-center relative z-10 ">
          {/* Page Title */}

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Learn how we collect, use, and safeguard your personal data while
            using our services. Your privacy is important to us.
          </p>

          {/* Decorative Divider */}
          <div className="mt-8 flex justify-center">
            <span className="h-1 w-20 bg-red-500 rounded-full"></span>
          </div>
        </div>
      </section>
      <div className="bg-white text-gray-800 px-6 py-12 md:px-12 lg:px-24 mt-[5vh]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* TOC - Hidden on Mobile */}
          <aside className="hidden md:block md:col-span-3">
            <div className="sticky top-24">
              <h2 className="font-semibold text-gray-900 mb-4">
                TABLE OF CONTENTS
              </h2>
              <ul className="space-y-2 text-sm text-gray-700">
                {toc.map((item, idx) => (
                  <li
                    key={item.id}
                    onClick={() => handleScroll(item.id)}
                    className="hover:text-blue-600 cursor-pointer transition"
                  >
                    {idx + 1}. {item.label}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
          {/* Main Content */}
          <main className="md:col-span-6 space-y-12">
            <section id="intro">
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="mb-4">
                At <strong>MTEC Technologies Limited</strong>, we are committed
                to protecting your privacy and safeguarding your personal data.
                This Privacy Policy explains what information we collect, how we
                use it, and your rights regarding your personal data.
              </p>
              <p className="mb-4">
                By using our services, you agree to the practices described in
                this Privacy Policy. If you do not agree, you should discontinue
                use of our services immediately.
              </p>
            </section>
            <section id="data-we-collect">
              <h2 className="text-2xl font-semibold mb-4">
                2. Information We Collect
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Personal Information:</strong> such as your name,
                  email address, phone number, and payment details when you
                  create an account or make a purchase.
                </li>
                <li>
                  <strong>Business Information:</strong> including your store
                  name, business address, and product details.
                </li>
                <li>
                  <strong>Usage Data:</strong> such as IP address, browser type,
                  pages visited, and actions taken on our platform.
                </li>
                <li>
                  <strong>Cookies & Tracking:</strong> small files stored on
                  your device to improve your browsing experience.
                </li>
              </ul>
            </section>
            <section id="use-of-data">
              <h2 className="text-2xl font-semibold mb-4">
                3. How We Use Your Information
              </h2>
              <p className="mb-4">
                We use your data for the following purposes:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>To provide, operate, and maintain our services.</li>
                <li>To process transactions and manage billing.</li>
                <li>To personalize your experience and recommend features.</li>
                <li>To communicate updates, promotions, or service changes.</li>
                <li>
                  To detect, prevent, and address security or fraud issues.
                </li>
                <li>To comply with legal obligations.</li>
              </ul>
            </section>
            <section id="cookies">
              <h2 className="text-2xl font-semibold mb-4">
                4. Cookies & Tracking Technologies
              </h2>
              <p className="mb-4">
                MTEC uses cookies and similar tracking technologies to monitor
                activity on our platform and store certain information. You can
                adjust your browser settings to refuse cookies; however, some
                features of our services may not function properly without them.
              </p>
            </section>
            <section id="third-parties">
              <h2 className="text-2xl font-semibold mb-4">
                5. Third-Party Services
              </h2>
              <p className="mb-4">
                We may share limited information with trusted third-party
                service providers who assist in delivering our services (e.g.,
                payment processors, hosting providers, analytics tools). These
                providers are bound by strict confidentiality obligations and
                cannot use your data for any other purpose.
              </p>
            </section>
            <section id="data-security">
              <h2 className="text-2xl font-semibold mb-4">6. Data Security</h2>
              <p className="mb-4">
                We use industry-standard technical and organizational measures
                to protect your data from unauthorized access, disclosure,
                alteration, or destruction. While we strive to protect your
                information, no method of transmission over the internet is
                completely secure.
              </p>
            </section>
            <section id="data-retention">
              <h2 className="text-2xl font-semibold mb-4">7. Data Retention</h2>
              <p className="mb-4">
                We retain your personal data only as long as necessary to
                fulfill the purposes outlined in this Privacy Policy, comply
                with legal obligations, and resolve disputes. After this period,
                data is securely deleted or anonymized.
              </p>
            </section>
            <section id="user-rights">
              <h2 className="text-2xl font-semibold mb-4">8. Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Access and request a copy of the personal data we hold.</li>
                <li>Request correction of inaccurate or incomplete data.</li>
                <li>
                  Request deletion of your data, subject to legal obligations.
                </li>
                <li>Withdraw consent for certain types of processing.</li>
                <li>Opt-out of marketing communications at any time.</li>
              </ul>
            </section>
            <section id="children">
              <h2 className="text-2xl font-semibold mb-4">
                9. Children’s Privacy
              </h2>
              <p className="mb-4">
                Our services are not directed to individuals under the age of
                18. We do not knowingly collect personal data from children. If
                we learn that we have inadvertently collected data from a minor,
                we will delete it promptly.
              </p>
            </section>
            <section id="changes">
              <h2 className="text-2xl font-semibold mb-4">
                10. Changes to this Policy
              </h2>
              <p className="mb-4">
                We may update this Privacy Policy from time to time to reflect
                changes in our practices or for legal, regulatory, or
                operational reasons. Updates will be posted on our website with
                the effective date clearly indicated.
              </p>
            </section>
            <section id="contact">
              <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
              <p className="mb-4">
                If you have any questions, concerns, or requests regarding this
                Privacy Policy, please contact us at:
              </p>
              <p className="font-semibold">Email: support@mtec.com</p>
              <p className="font-semibold">Address: MTEC Technologies Ltd.</p>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
