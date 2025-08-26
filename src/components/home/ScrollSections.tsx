// components/ScrollSections.tsx
export default function ScrollSections() {
  return (
    <div className="relative h-[300vh]">
      {/* Section A */}
      <div className="sticky top-0 z-10 h-screen bg-red-500 flex items-center justify-center text-white text-4xl">
        Component A
      </div>

      {/* Section B */}
      <div className="sticky top-0 z-20 h-screen bg-green-500 flex items-center justify-center text-white text-4xl">
        Component B
      </div>

      {/* Section C */}
      <div className="sticky top-0 z-30 h-screen bg-blue-500 flex items-center justify-center text-white text-4xl">
        Component C
      </div>
    </div>
  );
}
