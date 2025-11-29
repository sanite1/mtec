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
