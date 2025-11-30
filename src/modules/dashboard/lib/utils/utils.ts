// Recursively remove empty, null, undefined, and "" values
export const removeEmptyFields = (obj: any): any => {
  if (obj === null || obj === undefined) return undefined;

  if (Array.isArray(obj)) {
    return obj.map(removeEmptyFields).filter((x) => x !== undefined);
  }

  if (typeof obj === "object") {
    const cleaned = Object.entries(obj)
      .map(([key, value]) => [key, removeEmptyFields(value)])
      .filter(([_, value]) => value !== undefined)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
    return Object.keys(cleaned).length ? cleaned : undefined;
  }

  if (obj === "") return undefined; // remove empty strings

  return obj;
};

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
