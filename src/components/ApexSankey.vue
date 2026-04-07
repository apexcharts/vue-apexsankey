<script setup lang="ts">
import { ref, toRef, computed } from 'vue'
import { useSankey } from '../composables/useSankey'
import type { ApexSankeyProps, ApexSankeyEmits } from '../types'

const props = defineProps<ApexSankeyProps>()
const emit = defineEmits<ApexSankeyEmits>()

const containerRef = ref<HTMLElement | null>(null)
const dataRef = toRef(props, 'data')
const optionsRef = toRef(props, 'options')

const { graph, isReady, render, destroy, recreate } = useSankey({
  containerRef,
  data: dataRef,
  options: optionsRef,
  onNodeClick: () => (node) => emit('nodeClick', node),
})

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

defineExpose({
  graph,
  element: containerRef,
  isReady,
  render,
  destroy,
  recreate,
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
