import React from "react";
import CustomersSummary from "../components/customers/CustomersSummary";
import CustomersTable from "../components/customers/CustomersTable";

export default function Customers() {
  return (
    <div>
      <CustomersSummary totalCustomers={1280} subscribers={542} />

      <CustomersTable />
    </div>
  );
}
