// TermsOfService.tsx
import React from "react";

export default function TermsOfService() {
  const toc = [
    { id: "account-terms", label: "Account Terms" },
    { id: "activation", label: "Account Activation" },
    { id: "rights", label: "MTEC Rights" },
    { id: "responsibilities", label: "Your Responsibilities" },
    { id: "fees", label: "Payment of Fees and Taxes" },
    { id: "confidentiality", label: "Confidentiality" },
    { id: "liability", label: "Limitation of Liability" },
    { id: "ip", label: "Intellectual Property" },
    { id: "services", label: "Additional Services" },
    { id: "feedback", label: "Feedback and Reviews" },
    { id: "privacy", label: "Privacy & Data Protection" },
    { id: "termination", label: "Termination" },
    { id: "law", label: "Governing Law" },
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
            Terms of Service
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Please read our Terms of Service carefully before using our
            platform. By accessing or using our services, you agree to be bound
            by these terms and conditions.
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
            <section id="account-terms">
              <h2 className="text-2xl font-semibold mb-4">1. Account Terms</h2>
              <p className="mb-4">
                To access and use the Services provided by{" "}
                <strong>MTEC Technologies Limited</strong>, you must first
                register for an account (“Account”). When registering, you agree
                to provide accurate, complete, and current information including
                your full legal name, business name, contact details, and a
                valid email address. We reserve the right to reject applications
                or cancel an existing account at our sole discretion.
              </p>
              <p className="mb-4">
                You must be at least 18 years of age, or the age of majority in
                your jurisdiction, in order to open an Account. By creating an
                Account, you represent and warrant that you are entering into
                this Agreement for business and commercial purposes only, and
                not for personal or household use.
              </p>
              <p className="mb-4">
                You are solely responsible for all activity that occurs under
                your Account. This includes maintaining the confidentiality of
                your login credentials and ensuring your devices are secure. If
                we detect suspicious activity, we may request additional
                verification, suspend your Account, or take other security
                measures as deemed necessary.
              </p>
            </section>
            <section id="activation">
              <h2 className="text-2xl font-semibold mb-4">
                2. Account Activation
              </h2>
              <p className="mb-4">
                Your Account becomes active only after completing any required
                verification steps, including identity checks, payment method
                validation, or Know Your Customer (KYC) processes as mandated by
                Nigerian law. Until activation is confirmed, you may have
                limited or no access to certain features of the Service.
              </p>
            </section>
            <section id="rights">
              <h2 className="text-2xl font-semibold mb-4">3. MTEC Rights</h2>
              <p className="mb-4">
                We reserve the right to modify, suspend, or discontinue the
                Service at any time, with or without notice. We may also refuse
                service to anyone for any lawful reason. All intellectual
                property related to the Service remains owned by MTEC and may
                not be used without express written permission.
              </p>
            </section>
            <section id="responsibilities">
              <h2 className="text-2xl font-semibold mb-4">
                4. Your Responsibilities
              </h2>
              <p className="mb-4">
                When using <span className="font-semibold">MTEC</span>, you
                agree to act responsibly and ensure that your online business
                complies with applicable laws, regulations, and industry
                standards.
              </p>
              <ul className="list-disc list-inside mt-3">
                <li>
                  <span className="font-semibold">Accurate Information:</span>{" "}
                  You are responsible for providing true, current, and complete
                  details during registration and while managing your store.
                </li>
                <li>
                  <span className="font-semibold">Store Content:</span> You are
                  solely accountable for the products, descriptions, images, and
                  materials displayed in your storefront.
                </li>
                <li>
                  <span className="font-semibold">Compliance:</span> You must
                  ensure your products and services comply with all applicable
                  laws in the regions where you sell.
                </li>
                <li>
                  <span className="font-semibold">Payments & Taxes:</span> You
                  are responsible for managing your transactions, tax
                  obligations, and any fees associated with running your
                  business.
                </li>
                <li>
                  <span className="font-semibold">Account Security:</span> Keep
                  your login credentials safe and notify us immediately if you
                  suspect unauthorized activity.
                </li>
                <li>
                  <span className="font-semibold">Fair Use:</span> Do not misuse
                  MTEC’s services to engage in fraudulent activity, spam, or
                  actions that may harm the platform or other users.
                </li>
              </ul>
              <p className="mb-4">
                By using MTEC, you acknowledge and accept these responsibilities
                to maintain a safe, transparent, and trustworthy platform for
                all businesses.
              </p>
            </section>
            <section id="fees">
              <h2 className="text-2xl font-semibold mb-4">
                5. Payment of Fees and Taxes
              </h2>
              <p className="mb-4">
                By using MTEC’s services, you agree to pay all applicable fees
                associated with your subscription plan, add-on services, and any
                third-party integrations you choose to enable. Payments must be
                made on time and in the currency specified at checkout.
              </p>
              <p className="mb-4">
                All fees are exclusive of applicable taxes, including VAT, GST,
                sales taxes, or other similar charges. You are responsible for
                paying any such taxes imposed on your use of the services,
                except where MTEC is required by law to collect and remit them
                on your behalf.
              </p>
              <p className="mb-4">
                Subscription fees are billed in advance on a recurring basis
                (monthly or annually, depending on your chosen plan) and are
                non-refundable, except as expressly stated in our refund policy.
                If you fail to make timely payment, MTEC reserves the right to
                suspend or terminate your account and access to services.
              </p>
              <p className="mb-4">
                You authorize MTEC and our payment processors to automatically
                charge your provided payment method for all due amounts. It is
                your responsibility to ensure that your billing information is
                accurate and up-to-date at all times.
              </p>
            </section>
            <section id="confidentiality">
              <h2 className="text-2xl font-semibold mb-4">
                6. Confidentiality
              </h2>
              <p className="mb-4">
                We recognize that, in the course of providing our services, we
                may have access to confidential or proprietary information about
                your business, operations, or finances. We are committed to
                treating all such information with the highest level of care and
                discretion.
              </p>
              <p className="mb-4">
                Except as required by law or regulatory authorities, we will not
                disclose any confidential information to third parties without
                your prior written consent. This obligation continues even after
                the conclusion of our engagement.
              </p>
              <p className="mb-4">
                You agree that we may share limited information with our
                professional advisers, subcontractors, or affiliates solely to
                the extent necessary to deliver the agreed services, and always
                subject to the same duty of confidentiality.
              </p>
              <p className="mb-4">
                Both parties agree to take reasonable steps to protect the
                confidentiality of all sensitive information exchanged in
                connection with this engagement.
              </p>
            </section>
            <section id="liability">
              <h2 className="text-2xl font-semibold mb-4">
                7. Limitation of Liability
              </h2>
              <p className="mb-4">
                While MTEC strives to provide high-quality services, training,
                and resources, we cannot guarantee that all outcomes will fully
                meet your expectations. Our liability for any claim arising out
                of the use of our services, materials, or platforms shall be
                limited to the amount you have paid directly to MTEC for those
                specific services.
              </p>
              <p className="mb-4">
                In no event shall MTEC, its partners, staff, or affiliates be
                held liable for any indirect, incidental, consequential, or
                punitive damages, including but not limited to loss of profits,
                data, business opportunities, or reputational harm, even if we
                have been advised of the possibility of such damages.
              </p>
              <p className="mb-4">
                You acknowledge that your use of our services is at your own
                discretion and risk. We recommend that you take all necessary
                precautions, including obtaining appropriate insurance, to
                safeguard against potential losses.
              </p>
              <p className="mb-4">
                Certain jurisdictions may not allow the exclusion or limitation
                of liability for incidental or consequential damages. In such
                cases, our liability shall be restricted to the maximum extent
                permitted by the applicable law.
              </p>
            </section>
            <section id="ip">
              <h2 className="text-2xl font-semibold mb-4">
                8. Intellectual Property
              </h2>
              <p className="mb-4">
                All intellectual property rights, including but not limited to
                copyrights, trademarks, trade names, service marks, logos,
                designs, graphics, written material, software, and other
                proprietary information or materials (collectively,
                “Intellectual Property”), associated with the services provided
                on this platform remain the exclusive property of the Company or
                its licensors. By using our services, you acknowledge and agree
                that no ownership rights in any Intellectual Property are
                transferred to you.
              </p>
              <p className="mb-4">
                You may access and use our Intellectual Property strictly for
                your personal, non-commercial purposes and only in connection
                with the lawful use of our services. Any reproduction,
                distribution, modification, adaptation, display, transmission,
                or creation of derivative works based on our Intellectual
                Property without the Company’s prior written consent is strictly
                prohibited.
              </p>
              <p className="mb-4">
                In addition, you agree not to remove, obscure, or alter any
                proprietary notices appearing in or on our materials.
                Unauthorized use of our Intellectual Property may result in
                civil liability and/or criminal prosecution under applicable
                laws. The Company reserves all rights not expressly granted to
                you under these Terms.
              </p>
              <p className="mb-4">
                By submitting content or materials to our platform, you grant
                the Company a non-exclusive, royalty-free, worldwide license to
                use, display, reproduce, and distribute such content strictly
                for the purpose of delivering the services, subject always to
                our confidentiality and privacy obligations. You represent and
                warrant that you have the full legal right and authority to
                provide such materials and that doing so does not infringe upon
                any third-party rights.
              </p>
            </section>
            <section id="services">
              <h2 className="text-2xl font-semibold mb-4">
                9. Additional Services
              </h2>
              <p className="mb-4">
                In addition to the primary services outlined in this Agreement,
                the Company may, at its discretion, offer you access to certain
                supplementary or value-added services. These may include, but
                are not limited to, business advisory, technical support,
                marketing assistance, training, or integration with third-party
                tools and platforms. The availability and scope of such services
                will depend on your subscription plan, service package, or
                separate agreement with the Company.
              </p>
              <p className="mb-4">
                Some additional services may be provided free of charge, while
                others may require payment of additional fees. Any associated
                costs, terms, and conditions will be communicated to you in
                advance, and your continued use or explicit acceptance will
                constitute your agreement to such terms.
              </p>
              <p className="mb-4">
                The Company reserves the right to modify, suspend, or
                discontinue any additional services at any time, with or without
                notice, provided that such changes do not materially affect your
                core contractual rights under this Agreement. You acknowledge
                that the Company is not obligated to provide additional services
                and that their provision is solely at the Company’s discretion
                unless otherwise agreed in writing.
              </p>
            </section>
            <section id="feedback">
              <h2 className="text-2xl font-bold mb-4">
                10. Feedback and Reviews
              </h2>
              <p className="mb-4">
                At MTEC, we value the opinions of our clients and stakeholders.
                Your feedback is an essential part of how we improve our
                services and ensure that we continue to meet your expectations.
                Constructive reviews help us identify areas where we are
                excelling, as well as those that may require adjustments. By
                sharing your experiences, you contribute to shaping the quality
                and effectiveness of our work.
              </p>
              <p className="mb-4">
                While we encourage open and honest feedback, we kindly request
                that all reviews remain respectful, accurate, and free from
                defamatory or misleading statements. MTEC reserves the right to
                respond to feedback in order to provide clarification or context
                where necessary. We may also request permission to publicly
                display your testimonials on our website, marketing materials,
                or other communication platforms, always ensuring your privacy
                and preferences are respected.
              </p>
              <p className="mb-4">
                By providing feedback or reviews, you grant MTEC the right to
                use your comments in a fair and transparent manner to improve
                our services and build trust with future clients. We are
                committed to maintaining the confidentiality of sensitive
                details while acknowledging and appreciating your contributions
                to our growth.
              </p>
            </section>
            <section id="privacy">
              <h2 className="text-2xl font-semibold mb-4">
                11. Privacy & Data Protection
              </h2>
              <p className="mb-4">
                We take your privacy seriously and are committed to safeguarding
                your personal information in accordance with applicable data
                protection and privacy laws. By using our services, you consent
                to the collection, processing, and storage of your personal data
                as outlined in this agreement and our Privacy Policy.
              </p>
              <p className="mb-4">
                We will only collect personal data that is necessary for
                providing our services, such as your name, contact details, and
                payment information. Such information will be used exclusively
                for the purposes of service delivery, customer support,
                invoicing, legal compliance, and improving our offerings. We
                will not sell, lease, or share your personal data with third
                parties unless required by law, regulatory authorities, or with
                your explicit consent.
              </p>
              <p className="mb-4">
                You are responsible for ensuring that the information you
                provide to us is accurate and up to date. We may occasionally
                request verification of your data to maintain the integrity and
                security of our systems. Your personal data will be stored
                securely, with technical and organizational measures in place to
                prevent unauthorized access, alteration, or loss.
              </p>
              <p className="mb-4">
                You have the right to request access to the personal data we
                hold about you, request corrections, or request deletion,
                subject to legal and contractual obligations. We will respond to
                such requests within a reasonable timeframe in compliance with
                applicable regulations.
              </p>
              <p className="mb-4">
                By engaging with our services, you acknowledge and accept that
                while we take all reasonable steps to protect your personal
                data, no method of storage or transmission over the internet is
                completely secure, and we cannot guarantee absolute security.
                Nonetheless, we are committed to continuously updating our
                practices to protect your privacy and confidentiality.
              </p>
            </section>
            <section id="termination" className="scroll-mt-20">
              <h2 className="text-2xl font-semibold mb-4">12. Termination</h2>
              <p className="mb-3">
                Either party may terminate these Terms and Conditions at any
                time by providing written notice to the other party. Termination
                may occur for reasons including, but not limited to, breach of
                these Terms, failure to make timely payment, misuse of the
                services, or any conduct deemed harmful to the platform, its
                users, or third parties.
              </p>
              <p className="mb-3">
                Upon termination, your right to access and use the services will
                immediately cease. Any outstanding fees, charges, or obligations
                incurred prior to termination remain payable, and we reserve the
                right to pursue collection of such amounts in accordance with
                applicable law.
              </p>
              <p className="mb-3">
                We may also, at our sole discretion, suspend or restrict your
                access to the services without prior notice if we believe your
                actions violate these Terms, applicable laws, or pose a risk to
                the integrity, security, or reputation of our platform.
              </p>
              <p className="mb-4">
                Termination of your account does not affect provisions of these
                Terms that by their nature are intended to survive, including
                but not limited to confidentiality, intellectual property
                rights, limitation of liability, and dispute resolution.
              </p>
            </section>
            <section id="law">
              <h2 className="text-2xl font-semibold mb-4">13. Governing Law</h2>
              <p className=" mb-4">
                These Terms and Conditions, and any disputes arising out of or
                in connection with them, shall be governed by and construed in
                accordance with the laws of the jurisdiction in which our
                business is registered, without regard to its conflict of law
                principles.
              </p>
              <p className=" mb-4">
                By using our services, you agree that any legal action, claim,
                or dispute shall be brought exclusively before the courts of
                that jurisdiction, unless otherwise required by applicable law.
              </p>
              <p className="">
                We make no representation that our services are appropriate or
                available for use in other locations, and accessing them from
                territories where they are prohibited is at your own risk.
              </p>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
