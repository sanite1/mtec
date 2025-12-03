export const ConvertPriceRangeToLocale = (priceRange: string | undefined) => {
  if (priceRange && priceRange.includes("-")) {
    const [min, max] = priceRange
      .split("-")
      .map((v) => Number(v.trim()))
      .filter((v) => !isNaN(v));

    if (min && max) {
      return `₦${min.toLocaleString("en-NG", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })} - ₦${max.toLocaleString("en-NG", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    }
  }

  // ✅ Handle SINGLE value string: "15000"
  const single = Number(priceRange && priceRange.trim());
  if (!isNaN(single)) {
    return `₦${single.toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
};

const normalizeHex = (hex: string) => {
  if (!hex) return null;
  const clean = hex.replace("#", "").trim();
  if (/^[0-9A-Fa-f]{3}$/.test(clean)) {
    return clean
      .split("")
      .map((c) => c + c)
      .join("")
      .toLowerCase();
  }
  if (/^[0-9A-Fa-f]{6}$/.test(clean)) {
    return clean.toLowerCase();
  }
  return null;
};

const clamp = (v: number, a = 0, b = 255) =>
  Math.min(b, Math.max(a, Math.round(v)));

export const lightenHex = (hex: string, percent = 20) => {
  const norm = normalizeHex(hex);
  if (!norm) return hex; // return original if invalid

  const r = parseInt(norm.substring(0, 2), 16);
  const g = parseInt(norm.substring(2, 4), 16);
  const b = parseInt(norm.substring(4, 6), 16);

  const amt = percent / 100;

  const nr = clamp(r + (255 - r) * amt);
  const ng = clamp(g + (255 - g) * amt);
  const nb = clamp(b + (255 - b) * amt);

  const toHex = (n: number) => n.toString(16).padStart(2, "0");

  return `#${toHex(nr)}${toHex(ng)}${toHex(nb)}`;
};
