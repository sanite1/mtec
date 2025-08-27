import StartupSteps from "./SetupSteps";

// components/ScrollSections.tsx
export default function ScrollSections() {
  return (
    <div className="relative">
      {/* Section A */}
      <div className="sticky top-0 z-10 h-fit bg-gray-200 flex items-center justify-center text-white text-4xl rounded-t-[50px]">
        <StartupSteps />
      </div>

      {/* Section B */}
      <div className="sticky top-[50px] z-20 h-screen bg-green-500 flex items-center justify-center text-white text-4xl rounded-t-[50px]">
        Component B
      </div>

      {/* Section C */}
      <div className="sticky top-[100px] z-30 h-screen bg-blue-500 flex items-center justify-center text-white text-4xl rounded-t-[50px]">
        Component C
      </div>
    </div>
  );
}
