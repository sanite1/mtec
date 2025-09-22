import React from "react";
import DomainHeader from "../components/domain/DomainHeader";
import NoDomainsEmptyState from "../components/domain/NoDomainsEmptyState";

export default function Domain() {
  return (
    <div>
      <DomainHeader />

      <NoDomainsEmptyState />
    </div>
  );
}
