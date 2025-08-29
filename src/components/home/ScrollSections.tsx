import GlobalPayments from "./GlobalPaymentsSection";
import PricingSection from "./Pricing";
import StartupSteps from "./SetupSteps";
import priceBg from "../../assets/pricingBg.png";

// components/ScrollSections.tsx
export default function ScrollSections() {
  return (
    <div className="relative  min-h-[300vh]">
      {/* Section A */}
      <div className="sticky bottom-0 z-30 bg-[#0d1733] border-0">
        <div className=" flex items-center bg-gray-200 justify-center text-white text-4xl rounded-b-[50px] h-full">
          <StartupSteps />
        </div>
      </div>

      {/* Section B */}
      <div className="sticky bottom-0 z-20 bg-[#fff]">
        <div className="bg-[#0d1733] flex items-center justify-center text-white text-4xl rounded-b-[50px] h-full">
          <GlobalPayments />
        </div>
      </div>

      {/* Section C */}
      <div
        style={{
          backgroundImage: `url(${priceBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="sticky bottom-0 z-10 "
      >
        <div className=" flex items-center justify-center text-white text-4xl rounded-b-[50px] h-full">
          <PricingSection />
        </div>
      </div>
    </div>
  );
}
