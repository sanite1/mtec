import React from "react";
import LocationHeader from "../components/location/LocationHeader";
import LocationTable from "../components/location/LocationTable";
import { getDecodedJwt } from "../lib/auth";
import {
  useCreateLocation,
  useStoreLocations,
  useUpdateLocation,
} from "../lib/api/locations";
import { LocationPayload } from "../lib/types/locations";

export default function Location() {
  const user = getDecodedJwt();
  const userId = user?.id || "";

  const { data, isLoading, refetch } = useStoreLocations(userId);
  const { mutateAsync: updateLocation, isPending: updatingLocation } =
    useUpdateLocation();
  const { mutateAsync: createLocation, isPending: creatingLocation } =
    useCreateLocation();

  // const handleCreate = async (data: LocationPayload) => {
  //   await createLocation(
  //     { userId: user?.id, ...data },
  //     {
  //       onSuccess: () => {
  //         setOpenCreate(false);
  //         refetch();
  //       },
  //     },
  //   );
  // };

  // const handleUpdate = async (id: string, updated: LocationPayload) => {
  //   await updateLocation(
  //     { id, data: updated },
  //     {
  //       onSuccess: () => {
  //         setEditTarget(null);
  //         refetch();
  //       },
  //     },
  //   );
  // };

  return (
    <div>
      <LocationHeader refetch={refetch} />

      <LocationTable data={data} isLoading={isLoading} refetchTable={refetch} />
    </div>
  );
}
