// Stepper.ts
import { ref } from "vue";

export function useStepper(totalSteps: number, initialStep = 0) {
  if (initialStep < 0 || initialStep >= totalSteps) {
    throw new Error("Invalid initial step");
  }

  const currentStep = ref(initialStep);

  const nextStep = () => {
    if (currentStep.value < totalSteps - 1) {
      currentStep.value++;
    } else {
      throw new Error("Cannot go beyond the last step");
    }
  };

  const prevStep = () => {
    if (currentStep.value > 0) {
      currentStep.value--;
    } else {
      throw new Error("Cannot go back beyond the first step");
    }
  };

  return {
    currentStep,
    nextStep,
    prevStep,
    totalSteps,
  };
}
