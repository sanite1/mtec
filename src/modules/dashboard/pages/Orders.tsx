import React from "react";
import OrderSummary from "../components/orders/OrderSummary";
import OrdersTable from "../components/orders/OrdersTable";

export default function Orders() {
  return (
    <div>
      <OrderSummary
        totalOrders={67}
        completed={40}
        pending={15}
        cancelled={12}
        totalRevenue={1400000}
      />

      <OrdersTable />
    </div>
  );
}
