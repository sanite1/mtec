import React from "react";
import DiscountSummary from "../components/marketing/DiscountSummary";
import DiscountTable from "../components/marketing/DiscountTable";
import { getDecodedJwt } from "../lib/auth";
import { useDiscountStats, useStoreDiscounts } from "../lib/api/discount";

export default function Marketing() {
  const user = getDecodedJwt();
  const userId = user?.id;

  const { data: stats, refetch: refetchSummary } = useDiscountStats(userId);

  const { data, isLoading, refetch: refetchTable } = useStoreDiscounts(userId);
  return (
    <div>
      <DiscountSummary
        totalCoupons={stats?.totalCoupons || 0}
        activeCoupons={stats?.activeCoupons || 0}
        scheduledCoupons={stats?.scheduledCoupons || 0}
        expiredCoupons={stats?.expiredCoupons || 0}
        refetch={refetchTable}
        refetchSummary={refetchSummary}
      />

      <DiscountTable
        data={data}
        isLoading={isLoading}
        refetchTable={refetchTable}
        refetchSummary={refetchSummary}
      />
    </div>
  );
}
