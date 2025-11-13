import React from "react";
import LocationHeader from "../components/location/LocationHeader";
import LocationTable from "../components/location/LocationTable";
import { getDecodedJwt } from "../lib/auth";
import { useStoreLocations } from "../lib/api/locations";

export default function Location() {
  const user = getDecodedJwt();
  const userId = user?.id || "";

  const { data, isLoading, refetch } = useStoreLocations(userId);
  return (
    <div>
      <LocationHeader refetch={refetch} />

      <LocationTable data={data} isLoading={isLoading} refetchTable={refetch} />
    </div>
  );
}
