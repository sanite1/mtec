import React from "react";
import { Mail, Phone, MapPin, Send, PhoneCall } from "lucide-react";
import { IStoreDetails } from "../lib/types/store";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterProps {
  logo?: string;
  description?: string;
  email: string;
  phone: string;
  address: string;
  links?: FooterLink[];
  bgColor?: string; // dynamic background
  whatsappLink?: string;
}

const Footer: React.FC<FooterProps> = ({
  logo,
  description,
  email,
  phone,
  address,
  links = [],
  bgColor = "bg-gray-900",
  whatsappLink = "https://wa.me/2349012345678",
}) => {
  const store: IStoreDetails = JSON.parse(
    localStorage.getItem("store") || "null",
  );
  return (
    <footer className={`${bgColor} text-gray-200 py-12 pb-0 relative`}>
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo & Description */}
        <div>
          {store.logoUrl ? (
            <img src={store.logoUrl} alt="Logo" className="h-12 w-auto mb-4" />
          ) : (
            <p className="text-2xl font-bold text-purple-500 mb-4">MTEC</p>
          )}
          {store.storeDescription && (
            <p className="text-sm leading-relaxed">{store.storeDescription}</p>
          )}
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-white font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-purple-400" />
              <span>{store.businessEmail}</span>
            </li>
            <li className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-purple-400" />
              <span>{store.businessPhone}</span>
            </li>
            <li className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-purple-400" />
              <span>{`${store.streetAddress}, ${store.state}, ${store.zipCode}, ${store.country}`}</span>
            </li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h4 className="text-white font-semibold mb-4">Newsletter</h4>
          <p className="text-sm mb-3">Subscribe to get our latest updates.</p>
          <form
            className="flex items-center bg-gray-800 rounded-lg overflow-hidden"
            onSubmit={(e) => {
              e.preventDefault();
              console.log("Subscribed!");
            }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 text-sm bg-transparent outline-none"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Links */}
      {links.length > 0 && (
        <div className="border-t container mx-auto border-gray-700 mt-10 py-6 text-center">
          {/* <ul className="flex flex-wrap justify-center space-x-6 text-sm mb-3">
            {links.map((link, i) => (
              <li key={i}>
                <a
                  href={link.href}
                  className="hover:text-purple-400 transition"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul> */}
          <div className="inline-block px-4 py-2 rounded-md bg-gray-800 text-sm font-medium">
            Powered by{" "}
            <span className="text-purple-500 font-semibold">MTEC</span>
          </div>
        </div>
      )}

      {/* WhatsApp Floating Icon */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 left-5 bg-green-500 p-3 rounded-full shadow-lg hover:bg-green-600 transition"
      >
        <PhoneCall className="w-6 h-6 text-white" />
      </a>
    </footer>
  );
};

export default Footer;
