import React from "react";
import TransactionsSummary from "../components/payments/PaymentsHeader";
import TransactionsTable from "../components/payments/PaymentsTable";
import { getDecodedJwt } from "../lib/auth";
import { usePaymentStats } from "../lib/api/payment";

export default function Payments() {
  const user = getDecodedJwt();
  const userId = user?.id;

  const { data: stats, refetch } = usePaymentStats(userId);
  return (
    <div>
      <TransactionsSummary
        totalTransactions={stats?.totalTransactions || 0}
        successfulPayments={stats?.availableBalance || 0}
        pendingPayments={stats?.pendingBalance || 0}
        refunds={stats?.refund || 0}
        offlineTransactions={stats?.offlineTransactions || 0}
      />
      <TransactionsTable />
    </div>
  );
}
