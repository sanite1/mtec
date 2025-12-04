import React from "react";
import OnboardingProgress from "../components/dashboard/OnboardingProgress";
import Dashboard from "../components/dashboard/Dashboard";
import { getDecodedJwt } from "../lib/auth";
import { useOnboardingProgress } from "../lib/api/onboardingSteps";

export default function DashboardPage() {
  // const navigate = useNavigate();
  const user = getDecodedJwt();

  const { data, isLoading } = useOnboardingProgress(user?.id);
  return (
    <div>
      {!data?.isCompleted && <OnboardingProgress onboardingDetails={data} />}

      <Dashboard />
    </div>
  );
}
