import React from "react";
import CustomersSummary from "../components/customers/CustomersSummary";
import CustomersTable from "../components/customers/CustomersTable";
import { getDecodedJwt } from "../lib/auth";
import { useOrderStats } from "../lib/api/orders";
import { useCustomerStats } from "../lib/api/customer";

export default function Customers() {
  const user = getDecodedJwt();
  const userId = user?.id;

  const { data: stats, refetch } = useCustomerStats(userId);
  return (
    <div>
      <CustomersSummary
        totalCustomers={stats?.totalCustomers || 0}
        subscribers={stats?.newsletterSubscribers || 0}
      />

      <CustomersTable refetch={refetch} />
    </div>
  );
}
