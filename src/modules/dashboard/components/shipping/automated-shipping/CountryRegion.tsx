// components/CountryRegionDialog.tsx
import React, { useState, useMemo } from "react";
import { allCountries } from "country-region-data";
import { ChevronDown, ChevronRight, Search } from "lucide-react";

interface CountryRegionDialogProps {
  onClose: () => void;
  onSave: (selected: string[]) => void;
}

type Region = { name: string; shortCode?: string };
type Country = {
  countryName: string;
  countryShortCode: string;
  regions: Region[];
};

// ✅ Map from allCountries
const formattedCountries: Country[] = allCountries.map(
  ([countryName, countryShortCode, regions]) => ({
    countryName,
    countryShortCode,
    regions: regions.map(([name, shortCode]) => ({
      name,
      shortCode: shortCode || undefined,
    })),
  }),
);

export default function CountryRegionDialog({
  onClose,
  onSave,
}: CountryRegionDialogProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const [search, setSearch] = useState("");

  const toggleCountry = (countryCode: string) => {
    setExpanded(expanded === countryCode ? null : countryCode);
  };

  const handleCountryCheck = (
    countryName: string,
    regions: Region[],
    checked: boolean,
  ) => {
    setSelected((prev) => {
      const newState = { ...prev };
      if (checked) {
        newState[countryName] = regions.map((r) => r.name);
      } else {
        delete newState[countryName];
      }
      return newState;
    });
  };

  const handleRegionCheck = (
    countryName: string,
    regionName: string,
    checked: boolean,
  ) => {
    setSelected((prev) => {
      const countryRegions = prev[countryName] || [];
      let updatedRegions = [...countryRegions];

      if (checked) {
        updatedRegions.push(regionName);
      } else {
        updatedRegions = updatedRegions.filter((r) => r !== regionName);
      }

      return {
        ...prev,
        [countryName]: updatedRegions,
      };
    });
  };

  const handleSave = () => {
    const selections: string[] = [];
    Object.entries(selected).forEach(([country, regions]) => {
      if (regions.length === 0) return;
      selections.push(country);
      selections.push(...regions.map((r) => `${country} - ${r}`));
    });

    console.log("Selected:", selections);
    onSave(selections);
    onClose();
  };

  // 🔍 Filter countries by search input
  const filteredCountries = useMemo(() => {
    if (!search.trim()) return formattedCountries;
    return formattedCountries.filter((c) =>
      c.countryName.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 z-10 mx-4 max-h-[80vh] flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800">
          Select Countries & Regions
        </h3>
        <p className="text-sm text-gray-500 mt-2">
          Choose the destinations where you want your products shipped.
        </p>

        {/* 🔍 Search Bar */}
        <div className="relative mt-4">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search countries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-purple-600 focus:outline-none"
          />
        </div>

        {/* Scrollable list */}
        <div className="mt-4 flex-1 overflow-y-auto border rounded-lg divide-y">
          {filteredCountries.length === 0 ? (
            <p className="text-center text-sm text-gray-500 py-6">
              No countries found
            </p>
          ) : (
            filteredCountries.map(
              ({ countryName, countryShortCode, regions }) => {
                const isExpanded = expanded === countryShortCode;
                const allRegionsSelected =
                  selected[countryName]?.length === regions.length;

                return (
                  <div key={countryShortCode}>
                    {/* Country row */}
                    <div
                      onClick={() => toggleCountry(countryShortCode)}
                      className="flex items-center justify-between px-4 py-3 cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <button type="button" className="text-gray-500">
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </button>
                        <input
                          type="checkbox"
                          checked={
                            !!selected[countryName] && allRegionsSelected
                          }
                          onChange={(e) =>
                            handleCountryCheck(
                              countryName,
                              regions,
                              e.target.checked,
                            )
                          }
                          className="w-4 h-4 accent-purple-600"
                        />
                        <span className="text-gray-800">{countryName}</span>
                      </div>
                    </div>

                    {/* Regions */}
                    {isExpanded && regions.length > 0 && (
                      <div className="pl-16 pr-4 pb-3 space-y-2 border-t pt-3">
                        {regions.map((region) => (
                          <label
                            key={region.shortCode || region.name}
                            className="flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              checked={selected[countryName]?.includes(
                                region.name,
                              )}
                              onChange={(e) =>
                                handleRegionCheck(
                                  countryName,
                                  region.name,
                                  e.target.checked,
                                )
                              }
                              className="w-4 h-4 accent-purple-600"
                            />
                            <span className="text-sm text-gray-700">
                              {region.name}
                            </span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                );
              },
            )
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
