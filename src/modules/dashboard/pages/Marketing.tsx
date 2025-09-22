import React from "react";
import DiscountSummary from "../components/marketing/DiscountSummary";
import DiscountTable from "../components/marketing/DiscountTable";

export default function Marketing() {
  return (
    <div>
      <DiscountSummary
        totalCoupons={120}
        activeCoupons={45}
        scheduledCoupons={20}
        expiredCoupons={55}
      />

      <DiscountTable />
    </div>
  );
}
