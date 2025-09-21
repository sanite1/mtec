import React from "react";
import DiscountSummary from "../components/marketing/DiscountSummary";

export default function Marketing() {
  return (
    <div>
      <DiscountSummary
        totalCoupons={120}
        activeCoupons={45}
        scheduledCoupons={20}
        expiredCoupons={55}
      />
    </div>
  );
}
