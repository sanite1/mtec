// pages/BuyDomain.tsx
import React, { useState } from "react";
import { Search, AlertCircle, Globe, Loader2 } from "lucide-react";
import DomainCheckout from "./DomainCheckout";
const BuyDomain: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ✅ Track checkout state
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

  const takenDomains = ["example.com", "test.org"]; // simulate taken domains

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setResults(null);
    setError(null);

    const domainRegex = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
    if (!domainRegex.test(query)) {
      setError("Please enter a valid domain name (e.g., mysite.com)");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);

      if (takenDomains.includes(query.toLowerCase())) {
        setError(`Sorry, ${query} is already taken.`);
      } else {
        const baseName = query.split(".")[0];
        setResults([
          query,
          `${baseName}.org`,
          `${baseName}.net`,
          `${baseName}.io`,
          `${baseName}.co`,
        ]);
      }
    }, 1000);
  };

  // ✅ Fake pricing logic (could be dynamic later)
  const getDomainPrice = (domain: string) => {
    if (domain.endsWith(".com")) return 10000;
    if (domain.endsWith(".org")) return 8000;
    if (domain.endsWith(".net")) return 9000;
    return 7000;
  };

  // ✅ Handle going back from checkout
  const handleBack = () => {
    setSelectedDomain(null);
  };

  // ----------------- Render -----------------
  if (selectedDomain) {
    return (
      <div className=" flex items-center justify-center">
        <DomainCheckout
          domain={selectedDomain}
          amount={getDomainPrice(selectedDomain)}
          duration="1 Year"
          billingPeriod="Annually"
          onBack={handleBack}
        />
      </div>
    );
  }

  return (
    <div className=" flex flex-col items-center px-4 py-10">
      {/* Header */}
      <div className="text-center max-w-2xl mb-10 px-2">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Find & Secure Your Domain
        </h1>
        <p className="mt-3 text-gray-600 text-sm sm:text-base">
          Enter your desired name and check availability instantly. Valid
          extensions include <span className="font-semibold">.com</span>,{" "}
          <span className="font-semibold">.org</span>,{" "}
          <span className="font-semibold">.net</span>, and more.
        </p>
      </div>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="w-full max-w-2xl flex flex-col sm:flex-row items-stretch bg-white shadow-lg rounded-xl border overflow-hidden transition"
      >
        <input
          type="text"
          placeholder="e.g. mywebsite.com"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-4 py-3 outline-none text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-purple-400"
        />
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 flex items-center justify-center gap-2 font-medium transition sm:rounded-none"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Searching...
            </>
          ) : (
            <>
              <Search size={18} />
              Search
            </>
          )}
        </button>
      </form>

      {/* Error */}
      {error && (
        <div className="mt-6 flex items-center gap-2 text-red-700 bg-red-50 px-4 py-3 rounded-lg border border-red-200 w-full max-w-2xl">
          <AlertCircle size={18} />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Results */}
      {results && (
        <div className="mt-10 w-full max-w-2xl">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
            Available Domains
          </h2>
          <ul className="grid gap-4 sm:gap-5">
            {results.map((domain, i) => (
              <li
                key={i}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white shadow-md rounded-xl px-5 py-4 border hover:border-purple-500 transition"
              >
                <div className="flex items-center gap-2 text-gray-800 text-base font-medium">
                  <Globe size={20} className="text-purple-600" />
                  {domain}
                </div>
                <button
                  onClick={() => setSelectedDomain(domain)}
                  className="mt-3 sm:mt-0 bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition text-sm sm:text-base"
                >
                  Buy
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BuyDomain;
