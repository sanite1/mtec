// pages/PaymentMethods.tsx
import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import {
  CreditCard,
  Wallet,
  Globe,
  Save,
  Users,
  ShieldCheck,
} from "lucide-react";

const PaymentMethods = () => {
  const [onlineEnabled, setOnlineEnabled] = useState(true);
  const [offlineEnabled, setOfflineEnabled] = useState(false);
  const [chargeCustomer, setChargeCustomer] = useState(true);

  const [paystackConnected, setPaystackConnected] = useState(true);
  const [nombaConnected, setNombaConnected] = useState(false);
  const [pocketConnected, setPocketConnected] = useState(false);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
          Payment Methods
        </h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base lg:text-lg w-full sm:w-[80%] lg:w-[65%]">
          Connect and manage the payment methods that suit your business. Enable
          online and offline methods, set transaction charges.
        </p>
      </div>

      {/* Online / Offline Switch */}
      <div className="bg-white rounded-xl shadow p-4 sm:p-5 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-gray-800">
              Online Payments
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Allow customers to pay directly on your website checkout.
            </p>
          </div>
          <Switch
            checked={onlineEnabled}
            onChange={setOnlineEnabled}
            className={`${
              onlineEnabled ? "bg-purple-600" : "bg-gray-300"
            } relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition`}
          >
            <span
              className={`${
                onlineEnabled ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-4 sm:p-5 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-gray-800">
              Offline Payments
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Record cash, bank deposits, or other manual payments.
            </p>
          </div>
          <Switch
            checked={offlineEnabled}
            onChange={setOfflineEnabled}
            className={`${
              offlineEnabled ? "bg-purple-600" : "bg-gray-300"
            } relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition`}
          >
            <span
              className={`${
                offlineEnabled ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>
      </div>

      {/* Transaction Charges */}
      <div className="bg-white rounded-xl shadow p-4 sm:p-5 mb-6">
        <div className="flex items-start sm:items-center gap-3 mb-4">
          <ShieldCheck className="text-purple-600 shrink-0" size={22} />
          <div>
            <h3 className="font-semibold text-gray-800 text-base sm:text-lg">
              Transaction Charges
            </h3>
            <p className="text-sm text-gray-500">
              Decide who pays the transaction fees for your active payment
              methods.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setChargeCustomer(false)}
            className={`px-4 py-2 rounded-md border text-sm font-medium transition ${
              !chargeCustomer
                ? "bg-purple-600 text-white border-purple-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            Myself
          </button>
          <button
            onClick={() => setChargeCustomer(true)}
            className={`px-4 py-2 rounded-md border text-sm font-medium transition ${
              chargeCustomer
                ? "bg-purple-600 text-white border-purple-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            Customer
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {chargeCustomer
            ? "Transaction fees will be passed to your customers at checkout."
            : "Transaction fees will be deducted from your settlements."}
        </p>
      </div>

      {/* Payment Gateways */}
      <div className="space-y-5">
        {/* Paystack */}
        <div className="bg-white rounded-xl shadow p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-start sm:items-center gap-3">
            <CreditCard className="text-purple-600 shrink-0" size={22} />
            <div>
              <h3 className="font-semibold text-gray-800 text-base sm:text-lg">
                Paystack{" "}
                <span className="text-sm text-gray-500">(1.5% fee)</span>
              </h3>
              <p className="text-sm text-gray-500">
                Receive card, bank transfer, bank debit, Opay and more.
              </p>
            </div>
          </div>
          {paystackConnected ? (
            <button
              onClick={() => setPaystackConnected(false)}
              className="px-4 py-2 rounded-md bg-red-600 text-white text-sm font-medium hover:bg-red-700"
            >
              Disconnect
            </button>
          ) : (
            <button
              onClick={() => setPaystackConnected(true)}
              className="px-4 py-2 rounded-md bg-purple-600 text-white text-sm font-medium hover:bg-purple-700"
            >
              Connect
            </button>
          )}
        </div>

        {/* Nomba */}
        <div className="bg-white rounded-xl shadow p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-start sm:items-center gap-3">
            <Globe className="text-purple-600 shrink-0" size={22} />
            <div>
              <h3 className="font-semibold text-gray-800 text-base sm:text-lg">
                Nomba <span className="text-sm text-gray-500">(1.3% fee)</span>
              </h3>
              <p className="text-sm text-gray-500">
                Receive card, bank transfer, and QR payments.
              </p>
            </div>
          </div>
          <button
            onClick={() => setNombaConnected(!nombaConnected)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              nombaConnected
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-purple-600 text-white hover:bg-purple-700"
            }`}
          >
            {nombaConnected ? "Disconnect" : "Connect"}
          </button>
        </div>

        {/* Pocket App */}
        <div className="bg-white rounded-xl shadow p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-start sm:items-center gap-3">
            <Wallet className="text-purple-600 shrink-0" size={22} />
            <div>
              <h3 className="font-semibold text-gray-800 text-base sm:text-lg">
                Pocket App{" "}
                <span className="text-sm text-gray-500">(0.8% fee)</span>
              </h3>
              <p className="text-sm text-gray-500">
                Allow over 2M Pocket customers to pay you directly from their
                wallet.
              </p>
            </div>
          </div>
          <button
            onClick={() => setPocketConnected(!pocketConnected)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              pocketConnected
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-purple-600 text-white hover:bg-purple-700"
            }`}
          >
            {pocketConnected ? "Disconnect" : "Connect"}
          </button>
        </div>
      </div>

      {/* Save Button */}
      {/* <div className="mt-8 flex justify-end">
        <button className="w-full sm:w-auto px-6 py-3 bg-purple-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-purple-700 transition">
          <Save size={18} /> Save Changes
        </button>
      </div> */}
    </div>
  );
};

export default PaymentMethods;
