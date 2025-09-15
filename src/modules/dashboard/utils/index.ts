export const updateSearchParams = (
  params: Record<string, string>,
  currentParams: URLSearchParams
): URLSearchParams => {
  const newParams = new URLSearchParams(currentParams.toString());

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
  });

  return newParams;
};

// Export data to CSV
export const exportToCSV = (data: any[], filename: string) => {
  if (!data || data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(","),
    ...data.map((row) =>
      headers
        .map((header) => {
          const value = row[header];
          return typeof value === "string" && value.includes(",")
            ? `"${value}"`
            : value;
        })
        .join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}.csv`);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
