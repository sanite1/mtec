// ----------------- Types -----------------
export interface OnboardingStep {
  key: string;
  completed: boolean;
  optional: boolean;
  completedAt?: string;
}

export interface OnboardingData {
  _id: string;
  userId: string;
  steps: OnboardingStep[];
  overallProgress: number;
  completedSteps: number;
  totalSteps: number;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}
