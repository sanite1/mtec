import React from "react";
import OnboardingProgress from "../components/dashboard/OnboardingProgress";
import Dashboard from "../components/dashboard/Dashboard";

export default function DashboardPage() {
  return (
    <div>
      <OnboardingProgress />

      <Dashboard />
    </div>
  );
}
