import React from "react";
import OrderSummary from "../components/orders/OrderSummary";
import OrdersTable from "../components/orders/OrdersTable";
import { useOrderStats } from "../lib/api/orders";
import { getDecodedJwt } from "../lib/auth";

export default function Orders() {
  const user = getDecodedJwt();
  const userId = user?.id;

  const { data: stats, refetch } = useOrderStats(userId);

  return (
    <div>
      <OrderSummary
        totalOrders={stats?.totalOrders || 0}
        completed={stats?.completed || 0}
        pending={stats?.pending || 0}
        cancelled={stats?.cancelled || 0}
        totalRevenue={stats?.revenue || 0}
      />

      <OrdersTable refetchSummary={refetch} />
    </div>
  );
}
