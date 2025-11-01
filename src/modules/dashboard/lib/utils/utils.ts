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
