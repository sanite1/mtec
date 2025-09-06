// components/layout/StickySection.tsx
import React from "react";

type StickySectionProps = {
  children: React.ReactNode;
  /** How long this section should “hold” while sticky (in vh) */
  holdVh?: number;
  /** z-index so later sections can slide over earlier ones */
  zIndex?: number;
  className?: string;
};

const StickySection: React.FC<StickySectionProps> = ({
  children,
  holdVh = 180,
  zIndex = 0,
  className = "",
}) => {
  return (
    <section
      className={`relative ${className}`}
      style={{ height: `${holdVh}vh` }}
    >
      <div className="sticky top-0 h-screen w-full" style={{ zIndex }}>
        {children}
      </div>
    </section>
  );
};

export default StickySection;
