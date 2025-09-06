"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import demoContact from "../../assets/demoContact.png";
import ticketContact from "../../assets/ticketContact.png";
import emailContact from "../../assets/emailContact.png";
import RequestDemoModal from "./RequestDemoModal";
import ContactTicketModal from "./ContactTicketModal";

const contactOptions = [
  {
    id: 1,
    title: "Request a Demo",
    description:
      "See MTEC in action. Book a personalized demo and explore how our platform can help your business grow.",
    action: "Book Demo",
    image: demoContact,
    type: "demo", // identifies modal type
  },
  {
    id: 2,
    title: "Contact via Ticket",
    description:
      "Submit a ticket for quick support. Our team will get back to you within 24 hours.",
    action: "Submit Ticket",
    image: ticketContact,
    type: "ticket",
  },
  {
    id: 3,
    title: "Send us an Email",
    description:
      "Reach us directly via email for inquiries, feedback, or collaborations.",
    action: "Send Email",
    image: emailContact,
    type: "email",
    email: "support@mtec.com", // replace with your email
  },
];

const ContactVariants = () => {
  const [active, setActive] = useState<number | null>(null);
  const [demoOpen, setDemoOpen] = useState(false);
  const [ticketOpen, setTicketOpen] = useState(false);

  return (
    <section id="contact-us" className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-6 h-[1000px] lg:h-[420px]">
          {contactOptions.map((option) => (
            <div
              key={option.id}
              onMouseEnter={() => setActive(option.id)}
              onMouseLeave={() => setActive(null)}
              className={`relative flex-1 rounded-2xl overflow-hidden shadow-lg transition-all duration-500 ease-in-out cursor-pointer ${
                active === option.id
                  ? "lg:flex-[1.6]"
                  : active === null
                    ? "lg:flex-1"
                    : "lg:flex-[0.8]"
              }`}
              style={{
                backgroundImage: `url(${option.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* White overlay (bottom half) */}
              <div className="absolute bottom-0 w-full bg-white/90 backdrop-blur-sm p-6 transition-all duration-500">
                <h3 className="text-xl font-semibold text-gray-900">
                  {option.title}
                </h3>
                {/* Reveal only if active OR mobile */}
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    active === option.id
                      ? "max-h-40 mt-3"
                      : "max-h-0 lg:max-h-0"
                  } lg:block`}
                >
                  <p className="text-gray-600 text-sm mb-4">
                    {option.description}
                  </p>

                  {option.type === "email" ? (
                    <a
                      href={`mailto:${option.email}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 text-white text-sm font-medium shadow hover:bg-indigo-700 transition"
                    >
                      {option.action} <ArrowRight className="w-4 h-4" />
                    </a>
                  ) : (
                    <button
                      onClick={() => {
                        if (option.type === "demo") {
                          setDemoOpen(true);
                        } else if (option.type === "ticket") {
                          setTicketOpen(true);
                        }
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 text-white text-sm font-medium shadow hover:bg-indigo-700 transition"
                    >
                      {option.action} <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <RequestDemoModal open={demoOpen} setOpen={setDemoOpen} />
        <ContactTicketModal open={ticketOpen} setOpen={setTicketOpen} />
      </div>
    </section>
  );
};

export default ContactVariants;
