<script setup lang="ts">
/**
 * Multi-step onboarding component with step indicators.
 * Converts React compound components + context to Vue provide/inject + slots.
 * Supports controlled and uncontrolled step state with sub-steps.
 */
import { ref, computed, provide, inject, type InjectionKey } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// ============================================================================
// Types & Context
// ============================================================================

interface OnboardingContext {
  currentStep: ReturnType<typeof ref<number>>
  totalSteps: number
  stepValue: ReturnType<typeof ref<number>>
  maxStepValue: number
  canGoNext: ReturnType<typeof computed<boolean>>
  canGoBack: ReturnType<typeof computed<boolean>>
  handleNext: () => void
  handleBack: () => void
  handleComplete: () => void
}

const onboardingKey: InjectionKey<OnboardingContext> = Symbol('onboarding')

// ============================================================================
// Props
// ============================================================================

const props = withDefaults(defineProps<{
  class?: string
  totalSteps: number
  defaultStep?: number
  maxStepValue?: number
  canGoNextFn?: (step: number, stepValue: number) => boolean
}>(), {
  defaultStep: 1,
  maxStepValue: 0,
})

const emit = defineEmits<{
  complete: []
  stepChange: [step: number]
  stepValueChange: [value: number]
}>()

// ============================================================================
// State
// ============================================================================

const currentStep = ref(props.defaultStep)
const stepValue = ref(0)

const canGoNext = computed(() =>
  props.canGoNextFn ? props.canGoNextFn(currentStep.value, stepValue.value) : true
)

const canGoBack = computed(() =>
  currentStep.value > 1 || stepValue.value > 0
)

function handleNext() {
  if (currentStep.value === 1 && stepValue.value < props.maxStepValue) {
    stepValue.value++
    emit('stepValueChange', stepValue.value)
  } else if (currentStep.value < props.totalSteps) {
    stepValue.value = 0
    currentStep.value++
    emit('stepChange', currentStep.value)
  }
}

function handleBack() {
  if (currentStep.value === 1 && stepValue.value > 0) {
    stepValue.value--
    emit('stepValueChange', stepValue.value)
  } else if (currentStep.value === 2) {
    currentStep.value = 1
    stepValue.value = props.maxStepValue
    emit('stepChange', currentStep.value)
  } else if (currentStep.value > 1) {
    currentStep.value--
    emit('stepChange', currentStep.value)
  }
}

function handleComplete() {
  emit('complete')
}

provide(onboardingKey, {
  currentStep,
  totalSteps: props.totalSteps,
  stepValue,
  maxStepValue: props.maxStepValue,
  canGoNext,
  canGoBack,
  handleNext,
  handleBack,
  handleComplete,
})

// Expose for external use
defineExpose({ currentStep, stepValue, handleNext, handleBack, handleComplete })
</script>

<template>
  <div
    :class="cn('flex flex-col rounded-xl border bg-background p-6 shadow-sm', props.class)"
    data-slot="onboarding"
    :data-state="`step-${currentStep}`"
  >
    <slot
      :current-step="currentStep"
      :total-steps="props.totalSteps"
      :step-value="stepValue"
      :can-go-next="canGoNext"
      :can-go-back="canGoBack"
      :handle-next="handleNext"
      :handle-back="handleBack"
      :handle-complete="handleComplete"
    />
  </div>
</template>
