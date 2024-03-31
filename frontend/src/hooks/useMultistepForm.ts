import { ReactElement, useState } from "react";

export function useMultistepForm(steps: ReactElement[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function previousStep() {
    if (currentStepIndex === 0) return;
    setCurrentStepIndex(currentStepIndex - 1);
  }
  function nextStep() {
    if (currentStepIndex === steps.length - 1) return;
    setCurrentStepIndex((prev) => prev + 1);
  }
  function goTo(index: number) {
    setCurrentStepIndex(index);
  }

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    isFirst: currentStepIndex !== 0,
    isLast: currentStepIndex === steps.length - 1,
    nextStep,
    previousStep,
    goTo,
    steps,
  };
}
