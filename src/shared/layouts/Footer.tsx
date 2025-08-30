// Footer.tsx
import React from "react";
import {
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  Linkedin,
  Mail,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 pt-16 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-12">
        {/* Logo + Newsletter */}
        <div className="col-span-2 md:col-span-2">
          <h1 className="text-3xl font-bold text-white">MTEC</h1>
          <p className="mt-3 text-sm text-gray-400 max-w-sm">
            You don’t just build an online store — you build a business on your
            terms. Think big, sell bigger.
          </p>

          {/* Newsletter */}
          <div className="mt-6">
            <h3 className="text-white font-semibold mb-3">Subscribe</h3>
            <p className="text-sm text-gray-400 mb-3">
              Get the latest updates and insights from MTEC straight to your
              inbox.
            </p>
            <form className="flex items-center bg-gray-800 rounded-lg overflow-hidden max-w-sm">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 text-sm text-gray-200 outline-none"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm font-medium text-white"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Links - Platform */}
        <div className="col-span-2 md:col-span-1">
          <h3 className="text-lg font-semibold text-white mb-4">Platform</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/features" className="hover:text-white">
                Features
              </a>
            </li>
            <li>
              <a href="/pricing" className="hover:text-white">
                Pricing
              </a>
            </li>
            <li>
              <a href="/themes" className="hover:text-white">
                Themes & Customization
              </a>
            </li>
            <li>
              <a href="/integrations" className="hover:text-white">
                Integrations
              </a>
            </li>
          </ul>
        </div>

        {/* Links - Resources */}
        <div className="col-span-1 md:col-span-1">
          <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/help" className="hover:text-white">
                Help Center
              </a>
            </li>
            <li>
              <a href="/docs" className="hover:text-white">
                Developer Docs
              </a>
            </li>
            <li>
              <a href="/guides" className="hover:text-white">
                Guides & Tutorials
              </a>
            </li>
            <li>
              <a href="/blog" className="hover:text-white">
                Blog
              </a>
            </li>
          </ul>
        </div>

        {/* Links - Company */}
        <div className="col-span-1 md:col-span-1">
          <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/about" className="hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="/careers" className="hover:text-white">
                Careers
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white">
                Contact
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-white">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto border-t border-gray-700 mt-12 py-6 flex flex-col md:flex-row items-center justify-between text-sm">
        {/* Left Side */}
        <div className="flex flex-wrap gap-4 mb-4 md:mb-0 text-gray-400">
          <span>© {new Date().getFullYear()} MTEC. All rights reserved.</span>
          <a href="/terms" className="hover:text-white">
            Terms of Service
          </a>
          <a href="/privacy" className="hover:text-white">
            Privacy Policy
          </a>
          <a href="/sitemap" className="hover:text-white">
            Sitemap
          </a>
          <a href="/privacy-choices" className="hover:text-white">
            Privacy Choices
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-5 text-gray-400">
          <a
            href="https://facebook.com/mtec"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white"
          >
            <Facebook size={18} />
          </a>
          <a
            href="https://twitter.com/mtec"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white"
          >
            <Twitter size={18} />
          </a>
          <a
            href="https://youtube.com/mtec"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white"
          >
            <Youtube size={18} />
          </a>
          <a
            href="https://instagram.com/mtec"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white"
          >
            <Instagram size={18} />
          </a>
          <a
            href="https://linkedin.com/company/mtec"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white"
          >
            <Linkedin size={18} />
          </a>
          <a href="mailto:info@mtec.com" className="hover:text-white">
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
