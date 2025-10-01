// components/customize/CustomizeStorefront.tsx
import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import { ArrowLeft, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BannerSidebar from "../components/storefront/BannerSidebar";
import AboutSidebar from "../components/storefront/AboutSidebar";
import ContactSidebar from "../components/storefront/ContactSidebar";
import NewsletterSidebar from "../components/storefront/NewsletterSidebar";
import ReturnPolicySidebar from "../components/storefront/ReturnPolicySidebar";
import SocialMediaSidebar, {
  SocialMediaForm,
} from "../components/storefront/SocialMediaSidebar";
import WhatsAppSidebar from "../components/storefront/WhatsAppSidebar";

// ----------------- TYPES -----------------
type SidebarType =
  | "banner"
  | "about"
  | "contact"
  | "location"
  | "newsletter"
  | "returnPolicy"
  | "socialMedia"
  | "customMessage"
  | "productVariation"
  | "whatsapp"
  | null;

interface ToggleRowProps {
  label: string;
  description?: string;
  value: boolean;
  onToggle: () => void;
  onEdit?: () => void;
  requiresEdit?: boolean;
}

interface StorefrontData {
  banner?: { title: string; image: string };
  about?: { content: string; title: string };
  contact?: { email: string; phone: string; address: string };
  location?: { address: string };
  newsletter?: { headline: string; subtext: string; img: File };
  returnPolicy?: { content: string };
  socialMedia?: SocialMediaForm;
  customMessage?: { message: string };
  productVariation?: { enabled: boolean };
  whatsapp?: { number: string };
}

// ----------------- TOGGLE ROW -----------------
const ToggleRow: React.FC<ToggleRowProps> = ({
  label,
  description,
  value,
  onToggle,
  onEdit,
  requiresEdit,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-t-2">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-800">{label}</p>
        {description && (
          <p className="text-xs text-gray-500 mt-0.5">{description}</p>
        )}
      </div>

      <div className="flex items-center gap-3 mt-3 sm:mt-0">
        {value && requiresEdit && (
          <button
            type="button"
            onClick={onEdit}
            className="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm bg-purple-50 text-purple-700 hover:bg-purple-100 transition"
          >
            <Pencil className="w-4 h-4" /> Edit
          </button>
        )}
        <Switch
          checked={value}
          onChange={onToggle}
          className={`${
            value ? "bg-purple-600" : "bg-gray-300"
          } relative inline-flex h-6 w-11 items-center rounded-full transition`}
        >
          <span
            className={`${
              value ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </div>
    </div>
  );
};

// ----------------- MAIN -----------------
const CustomizeStorefront: React.FC = () => {
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    banner: false,
    about: false,
    contact: false,
    location: false,
    newsletter: false,
    returnPolicy: false,
    socialMedia: false,
    customMessage: false,
    productVariation: false,
    whatsapp: false,
  });

  const [sidebar, setSidebar] = useState<SidebarType>(null);
  const [storefrontData, setStorefrontData] = useState<StorefrontData>({});

  const navigate = useNavigate();

  const openSidebar = (key: SidebarType, fresh?: boolean) => {
    if (fresh) {
      // Reset to empty if it's a fresh toggle-on
      setStorefrontData((prev) => ({ ...prev, [key!]: undefined }));
    }
    setSidebar(key);
  };

  const saveSidebarData = (key: SidebarType, data: any) => {
    if (!key) return;
    setStorefrontData((prev) => ({ ...prev, [key]: data }));
  };

  const handleToggle = (key: SidebarType, requiresEdit?: boolean) => {
    setToggles((prev) => {
      const newVal = !prev[key!];
      if (newVal && requiresEdit) {
        openSidebar(key, true); // first time toggle → fresh
      }
      return { ...prev, [key!]: newVal };
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-4">
        <div className="flex items-center">
          <button
            onClick={() => navigate("/storefront")}
            className="p-2 rounded bg-gray-100 hover:bg-gray-200 relative mr-3"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            Customise Storefront
          </h1>
        </div>
        {/* Banner Example */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Banner</h2>
          <ToggleRow
            label="Display Custom Banner"
            description="Enable a custom hero banner on your homepage."
            value={toggles.banner}
            onToggle={() => handleToggle("banner", true)}
            onEdit={() => openSidebar("banner")}
            requiresEdit
          />
        </div>
        {/* ABOUT US */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">About Us</h2>
          <ToggleRow
            label="Display About Us"
            description="Show an About Us section on your website to share your story."
            value={toggles.about}
            onToggle={() => handleToggle("about", true)}
            onEdit={() => openSidebar("about")}
            requiresEdit
          />
        </div>
        {/* CONTACT INFO */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Contact Info
          </h2>
          <ToggleRow
            label="Show Contact Info"
            description="Display your business contact information on the site."
            value={toggles.contact}
            onToggle={() => handleToggle("contact", true)}
            onEdit={() => openSidebar("contact")}
            requiresEdit
          />
        </div>
        {/* LOCATION PAGE */}
        {/* <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Location Page
          </h2>
          <ToggleRow
            label="Enable Location Selection Page"
            description="Allow customers to select a location or branch when shopping."
            value={toggles.location}
            onToggle={() => handleToggle("location", true)}
            onEdit={() => openSidebar("location")}
            requiresEdit
          />
        </div> */}
        {/* NEWSLETTER */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Newsletter
          </h2>
          <ToggleRow
            label="Display Newsletter Form"
            description="Show a pop-up form to collect emails from visitors."
            value={toggles.newsletter}
            onToggle={() => handleToggle("newsletter", true)}
            onEdit={() => openSidebar("newsletter")}
            requiresEdit
          />
        </div>
        {/* PRODUCT LISTING */}
        {/* <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Product Listing
          </h2>
          <p className="text-sm text-gray-500 mb-3">
            Manage how your products are displayed on the shop page.
          </p>
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition"
          >
            <Pencil className="w-4 h-4" /> Edit Product Listing
          </button>
        </div> */}
        {/* RETURN POLICY */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Return Policy
          </h2>
          <ToggleRow
            label="Display Return Policy"
            description="Show your store’s return policy details to customers."
            value={toggles.returnPolicy}
            onToggle={() => handleToggle("returnPolicy", true)}
            onEdit={() => openSidebar("returnPolicy")}
            requiresEdit
          />
        </div>
        {/* SOCIAL MEDIA */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Social Media
          </h2>
          <ToggleRow
            label="Display Social Media Handles"
            description="Show links to your social media accounts on your site."
            value={toggles.socialMedia}
            onToggle={() => handleToggle("socialMedia", true)}
            onEdit={() => openSidebar("socialMedia")}
            requiresEdit
          />
        </div>
        {/* CUSTOM MESSAGE */}
        {/* <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Top Banner Custom Message
          </h2>
          <ToggleRow
            label="Display Custom Message"
            description="Show a custom announcement or message at the top of your site."
            value={toggles.customMessage}
            onToggle={() => handleToggle("customMessage", true)}
            onEdit={() => openSidebar("customMessage")}
            requiresEdit
          />
        </div> */}
        {/* PRODUCT VARIATION */}
        {/* <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Product Variation
          </h2>
          <ToggleRow
            label="Enable Product Variation Options"
            description="Allow customers to choose variations such as size or color."
            value={toggles.productVariation}
            onToggle={() => handleToggle("productVariation", true)}
            onEdit={() => openSidebar("productVariation")}
            requiresEdit
          />
        </div> */}
        {/* WHATSAPP */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            WhatsApp Chat
          </h2>
          <ToggleRow
            label="Enable WhatsApp Chat Button"
            description="Add a floating WhatsApp button so customers can chat with you."
            value={toggles.whatsapp}
            onToggle={() => handleToggle("whatsapp", true)}
            onEdit={() => openSidebar("whatsapp")}
            requiresEdit
          />
        </div>
      </div>

      {/* Sidebar Switch */}
      {sidebar === "banner" && (
        <BannerSidebar
          initialData={storefrontData.banner}
          onSave={(data: any) => saveSidebarData("banner", data)}
          onClose={() => setSidebar(null)}
        />
      )}
      {sidebar === "about" && (
        <AboutSidebar
          initialData={storefrontData.about}
          onSave={(data: any) => saveSidebarData("about", data)}
          onClose={() => setSidebar(null)}
        />
      )}
      {sidebar === "contact" && (
        <ContactSidebar
          initialData={storefrontData.contact}
          onSave={(data: any) => saveSidebarData("contact", data)}
          onClose={() => setSidebar(null)}
        />
      )}
      {/* {sidebar === "location" && (
        <LocationSidebar
          initialData={storefrontData.location}
          onSave={(data: any) => saveSidebarData("location", data)}
          onClose={() => setSidebar(null)}
        />
      )} */}
      {sidebar === "newsletter" && (
        <NewsletterSidebar
          initialData={storefrontData.newsletter}
          onSave={(data: any) => saveSidebarData("newsletter", data)}
          onClose={() => setSidebar(null)}
        />
      )}
      {/* {sidebar === "productListing" && (
        <ProductListingSidebar
          initialData={storefrontData.productListing}
          onSave={(data: any) => saveSidebarData("productListing", data)}
          onClose={() => setSidebar(null)}
        />
      )} */}
      {sidebar === "returnPolicy" && (
        <ReturnPolicySidebar
          initialData={storefrontData.returnPolicy}
          onSave={(data: any) => saveSidebarData("returnPolicy", data)}
          onClose={() => setSidebar(null)}
        />
      )}
      {sidebar === "socialMedia" && (
        <SocialMediaSidebar
          initialData={storefrontData.socialMedia}
          onSave={(data: any) => saveSidebarData("socialMedia", data)}
          onClose={() => setSidebar(null)}
        />
      )}
      {/* {sidebar === "customMessage" && (
        <CustomMessageSidebar
          initialData={storefrontData.customMessage}
          onSave={(data: any) => saveSidebarData("customMessage", data)}
          onClose={() => setSidebar(null)}
        />
      )}
      {sidebar === "productVariation" && (
        <ProductVariationSidebar
          initialData={storefrontData.productVariation}
          onSave={(data: any) => saveSidebarData("productVariation", data)}
          onClose={() => setSidebar(null)}
        />
      )}*/}
      {sidebar === "whatsapp" && (
        <WhatsAppSidebar
          initialData={storefrontData.whatsapp}
          onSave={(data: any) => saveSidebarData("whatsapp", data)}
          onClose={() => setSidebar(null)}
        />
      )}
    </div>
  );
};

export default CustomizeStorefront;
