import React from "react";
import PaymentsHeader from "../components/payments/PaymentsHeader";
import TransactionsSummary from "../components/payments/PaymentsHeader";
import TransactionsTable from "../components/payments/PaymentsTable";

export default function Payments() {
  return (
    <div>
      <TransactionsSummary
        totalTransactions={452}
        successfulPayments={380}
        pendingPayments={50}
        refunds={22}
      />
      <TransactionsTable />
    </div>
  );
}
