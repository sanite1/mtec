// components/payments/TransactionsSummary.tsx
import React, { useState } from "react";
import {
  DollarSign,
  CheckCircle,
  Clock,
  RefreshCw,
  Settings,
  BanknoteArrowUpIcon,
  CreditCard,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import BankDetailsSidebar from "./BankDetailsSidebar";
import {
  useCreatePayoutDetails,
  useFetchPayoutDetails,
  useUpdatePayoutDetails,
} from "../../lib/api/payoutDetails";
import {
  CreatePayoutDetailsRequest,
  UpdatePayoutDetailsRequest,
} from "../../lib/types/payoutDetails";
import { getDecodedJwt } from "../../lib/auth";
import WithdrawModal from "./WithdrawModal";

interface TransactionsSummaryProps {
  totalTransactions: number;
  successfulPayments: number;
  pendingPayments: number;
  refunds: number;
  offlineTransactions: number;
}

export default function TransactionsSummary({
  totalTransactions,
  successfulPayments,
  pendingPayments,
  refunds,
  offlineTransactions,
}: TransactionsSummaryProps) {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = getDecodedJwt();
  const { mutateAsync: createPayout, isPending } = useCreatePayoutDetails(); // or whatever your hook is named
  const { mutateAsync: updatePayout, isPending: isUpdating } =
    useUpdatePayoutDetails(); // or whatever your hook is named
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleWithdraw = async () => {
    setLoading(true);
    try {
      // call your withdrawal API here
      console.log("Withdrawing:", successfulPayments);
      // simulate API delay
      await new Promise((res) => setTimeout(res, 1500));
      alert("Withdrawal successful!");
      setIsOpen(false);
    } catch (err) {
      console.error(err);
      alert("Withdrawal failed!");
    } finally {
      setLoading(false);
    }
  };
  const {
    data: payoutDetails,
    isLoading,
    refetch,
  } = useFetchPayoutDetails(user?.id); // or whatever your hook is named

  const onCreate = async (data: CreatePayoutDetailsRequest) => {
    try {
      await createPayout(data, {
        onSuccess: () => {
          setIsSidebarOpen(false);
          refetch();
        },
      });
    } catch (error) {
      console.error("Payout Details creation failed:", error);
    }
  };

  const onUpdate = async (data: UpdatePayoutDetailsRequest) => {
    try {
      await updatePayout(
        { payoutId: payoutDetails?._id || "", payload: data },
        {
          onSuccess: () => {
            setIsSidebarOpen(false);
            refetch();
          },
        },
      );
    } catch (error) {
      console.error("Payout Details creation failed:", error);
    }
  };

  return (
    <div>
      {isOpen && (
        <WithdrawModal
          onClose={() => setIsOpen(false)}
          onConfirm={handleWithdraw}
          loading={loading}
          availableBalance={successfulPayments}
        />
      )}
      {/* Progress / Next Step */}
      <div className="my-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-purple-50 border border-purple-200 rounded-md p-4">
        <div>
          <p className="text-sm font-medium text-gray-800">
            Next Step:{" "}
            <span className="text-purple-600">
              Verify your identity to receive payment
            </span>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            You are required to verify your identity in order to be paid all
            pending settlements.
          </p>
        </div>

        <button className="w-full sm:w-auto px-4 py-2 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700 transition">
          Continue
        </button>
      </div>

      {/* Withdrawals Info */}
      <div className="my-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-blue-50 border border-blue-200 rounded-md p-4">
        <div>
          <p className="text-sm font-medium text-gray-800">
            Withdrawals Available:{" "}
            <span className="text-blue-600">
              Only available balance can be withdrawn
            </span>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Funds that are pending or on hold will become available once
            settlements are completed.
          </p>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
        >
          Withdraw Funds
        </button>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-md md:text-xl font-bold">
            Payments / Transactions
          </h1>
          <p className="text-gray-600 mt-1">
            Overview of your store’s payments and settlements
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              navigate("/payments/payment-methods");
            }}
            className="flex text-sm items-center gap-2 px-3 py-2 rounded-lg bg-white text-purple-600 border border-purple-600 font-medium hover:bg-purple-100"
          >
            <Settings size={20} />
            Payment Methods
          </button>
          <button
            onClick={() => {
              setIsSidebarOpen(true);
            }}
            className="flex text-sm items-center gap-2 px-3 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700"
          >
            <BanknoteArrowUpIcon size={20} />
            Bank Details
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
        {/* Total Transactions */}
        <div className="rounded-xl bg-gradient-to-r from-purple-50 to-purple-100 p-3 md:p-5 shadow hover:shadow-md transition">
          <div className="relative flex items-center justify-between">
            <div className="z-10">
              <p className="text-sm text-purple-600 font-medium">
                Total Transactions
              </p>
              <p className="mt-1 text-md md:text-xl font-bold text-purple-900">
                {totalTransactions}
              </p>
            </div>
            <DollarSign className="absolute md:relative flex-shrink-0 right-0 text-purple-500 opacity-80" />
          </div>
        </div>

        {/* Available Balance */}
        <div className="rounded-xl bg-gradient-to-r from-green-50 to-green-100 p-3 md:p-5 shadow hover:shadow-md transition">
          <div className="relative flex items-center justify-between">
            <div className="z-10">
              <p className="text-sm text-green-600 font-medium">
                Available Balance
              </p>
              <p className="mt-1 text-md md:text-xl font-bold text-green-900">
                ₦{successfulPayments.toLocaleString()}
              </p>
            </div>
            <CheckCircle className="absolute md:relative flex-shrink-0 right-0 text-green-500 opacity-80" />
          </div>
        </div>

        {/* Pending Balance */}
        <div className="rounded-xl bg-gradient-to-r from-yellow-50 to-yellow-100 p-3 md:p-5 shadow hover:shadow-md transition">
          <div className="relative flex items-center justify-between">
            <div className="z-10">
              <p className="text-sm text-yellow-600 font-medium">
                Pending Balance
              </p>
              <p className="mt-1 text-md md:text-xl font-bold text-yellow-900">
                ₦{pendingPayments.toLocaleString()}
              </p>
            </div>
            <Clock className="absolute md:relative flex-shrink-0 right-0 text-yellow-500 opacity-80" />
          </div>
        </div>

        {/* Refunds */}
        <div className="rounded-xl bg-gradient-to-r from-red-50 to-red-100 p-3 md:p-5 shadow hover:shadow-md transition">
          <div className="relative flex items-center justify-between">
            <div className="z-10">
              <p className="text-sm text-red-600 font-medium">Refunds</p>
              <p className="mt-1 text-md md:text-xl font-bold text-red-900">
                ₦{refunds.toLocaleString()}
              </p>
            </div>
            <RefreshCw className="absolute md:relative flex-shrink-0 right-0 text-red-500 opacity-80" />
          </div>
        </div>

        {/* Offline Transactions */}
        <div className="rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 p-3 md:p-5 shadow hover:shadow-md transition">
          <div className="relative flex items-center justify-between">
            <div className="z-10">
              <p className="text-sm text-blue-600 font-medium">
                Offline Transactions
              </p>
              <p className="mt-1 text-md md:text-xl font-bold text-blue-900">
                ₦{offlineTransactions.toLocaleString()}
              </p>
            </div>
            <CreditCard className="absolute md:relative flex-shrink-0 right-0 text-blue-500 opacity-80" />
          </div>
        </div>
      </div>

      {isSidebarOpen && (
        <BankDetailsSidebar
          details={payoutDetails}
          isPending={isPending || isUpdating}
          onClose={() => setIsSidebarOpen(false)}
          onSave={(data) => {
            if (!isLoading && payoutDetails) {
              onUpdate(data);
            } else if (!isLoading && !payoutDetails) {
              onCreate(data);
            }
          }}
        />
      )}
    </div>
  );
}
