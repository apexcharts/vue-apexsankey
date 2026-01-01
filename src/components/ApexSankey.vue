<script setup lang="ts">
import { ref, toRef, computed } from 'vue'
import { useSankey } from '../composables/useSankey'
import type { GraphData, SankeyOptions } from '../types'

/**
 * props definition
 */
const props = defineProps<{
  /** sankey diagram data (nodes and edges) */
  data: GraphData
  /** configuration options for the diagram */
  options?: Partial<SankeyOptions>
}>()

// container element ref
const containerRef = ref<HTMLElement | null>(null)

// convert props to refs for reactivity
const dataRef = toRef(props, 'data')
const optionsRef = toRef(props, 'options')

// use the sankey composable
const { graph, isReady, render, destroy, recreate } = useSankey({
  containerRef,
  data: dataRef,
  options: optionsRef
})

// compute container styles from options
const containerStyle = computed(() => {
  const style: Record<string, string> = {}

  if (props.options?.width) {
    style.width = typeof props.options.width === 'number' 
      ? `${props.options.width}px` 
      : props.options.width
  }

  if (props.options?.height) {
    style.height = typeof props.options.height === 'number' 
      ? `${props.options.height}px` 
      : props.options.height
  }

  return style
})

// expose methods and properties for ref access
defineExpose({
  /** the underlying SankeyGraph instance (reactive ref) */
  graph,
  /** the container html element */
  element: containerRef,
  /** whether the chart is ready */
  isReady,
  /** manually re-render the chart */
  render,
  /** destroy the chart */
  destroy,
  /** recreate the chart with current options */
  recreate
})
</script>

<template>
  <div 
    ref="containerRef" 
    class="apex-sankey-container"
    :style="containerStyle"
  />
</template>

<style scoped>
.apex-sankey-container {
  width: 100%;
  height: 100%;
}
</style>
