import React, { useState } from "react";
import { CheckCircle, Loader2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Utility: Simple regex to check domain validity
const domainRegex = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,11}$/;

export default function ConnectDomain() {
  const [step, setStep] = useState(1);
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isValidDomain = domainRegex.test(domain);

  const nextStep = () => {
    if (step === 2) {
      setLoading(true);
      // simulate DNS check delay
      setTimeout(() => {
        setLoading(false);
        setStep(3);
      }, 2000);
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <div className="h-full flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-lg p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Connect Your Domain
          </h2>
          {step > 1 && (
            <button
              onClick={prevStep}
              className="text-gray-500 hover:text-gray-700 transition"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Step 1: Enter Domain */}
        {step === 1 && (
          <div className="space-y-6">
            <p className="text-gray-600">
              Enter your custom domain to connect it to your store.
            </p>
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="example.com"
              className="w-full border rounded-lg px-4 py-2 focus:ring-purple-500 focus:border-purple-500"
            />
            <button
              onClick={nextStep}
              disabled={!isValidDomain}
              className={`w-full py-2 rounded-lg text-white font-medium transition ${
                isValidDomain
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 2: DNS Instructions */}
        {step === 2 && (
          <div className="space-y-6">
            <p className="text-gray-600">
              To connect <strong>{domain}</strong>, add the following DNS
              records in your domain provider dashboard:
            </p>
            <div className="border rounded-lg p-4 bg-gray-50">
              <p className="text-sm font-medium text-gray-700 mb-2">CNAME</p>
              <div className="flex justify-between items-center">
                <span className="text-gray-800">www → yourstore.host.com</span>
                <button
                  onClick={nextStep}
                  className="px-4 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                  I’ve Added Records
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: DNS Propagation Check */}
        {step === 3 && (
          <div className="flex flex-col items-center justify-center space-y-4 py-8">
            {loading ? (
              <>
                <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
                <p className="text-gray-600">Checking DNS records…</p>
              </>
            ) : (
              <>
                <CheckCircle className="w-10 h-10 text-green-600" />
                <p className="text-gray-700 text-lg font-medium">
                  Domain Verified Successfully!
                </p>
                <button
                  onClick={nextStep}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                >
                  Continue
                </button>
              </>
            )}
          </div>
        )}

        {/* Step 4: Completion */}
        {step === 4 && (
          <div className="flex flex-col items-center justify-center space-y-6 py-8">
            <CheckCircle className="w-12 h-12 text-green-600" />
            <h3 className="text-xl font-semibold text-gray-800">
              Your domain is now connected!
            </h3>
            <p className="text-gray-600 text-center">
              Visitors can now access your store at{" "}
              <span className="font-medium">{domain}</span>.
            </p>
            <button
              onClick={() => {
                navigate("/domain");
              }}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              View Domain
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
