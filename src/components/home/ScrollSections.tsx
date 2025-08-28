import StartupSteps from "./SetupSteps";

// components/ScrollSections.tsx
export default function ScrollSections() {
  return (
    <div className="relative  min-h-[300vh]">
      {/* Section A */}
      <div className="sticky top-0 z-10 bg-gray-200 flex items-center justify-center text-white text-4xl rounded-t-[50px]">
        <StartupSteps />
      </div>

      {/* Section B */}
      <div className="sticky top-[50px] z-20 min-h-screen bg-[#1E3A8A] flex items-center justify-center text-white text-4xl rounded-t-[50px]">
        Component B
      </div>

      {/* Section C */}
      <div className="sticky top-[100px] z-30 h-screen bg-blue-500 flex items-center justify-center text-white text-4xl rounded-t-[50px]">
        Component C
      </div>
    </div>
  );
}
