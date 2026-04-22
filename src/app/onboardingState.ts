export const ONBOARDING_MAX_STEP = 5;
export const ONBOARDING_AI_STEP = 5;
export const ONBOARDING_EVENT_NAME = "unibuddy-onboarding-step-change";

export type OnboardingStep = number | "done";

let onboardingStep: OnboardingStep = 1;

const clampStep = (step: number) => Math.min(ONBOARDING_MAX_STEP, Math.max(1, Math.floor(step)));

export function getOnboardingStep(): OnboardingStep {
  return onboardingStep;
}

export function setOnboardingStep(step: OnboardingStep) {
  onboardingStep = step === "done" ? "done" : clampStep(step);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(ONBOARDING_EVENT_NAME));
  }
}
