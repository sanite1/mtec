import React, { useState } from "react";
import TaxHeader from "../components/taxes/TaxHeader";
import TaxTable from "../components/taxes/TaxTable";
import { getDecodedJwt } from "../lib/auth";
import { TaxFilters } from "../lib/types/taxes";
import { useStoreTaxes } from "../lib/api/taxes";

export default function Taxes() {
  const user = getDecodedJwt();
  const userId = user?.id || "";

  const { data, isLoading, refetch } = useStoreTaxes(userId);

  return (
    <div>
      <TaxHeader refetch={refetch} />
      <TaxTable data={data} isLoading={isLoading} refetchTable={refetch} />
    </div>
  );
}
