import { ref, shallowRef, onMounted, onBeforeUnmount, watch, type Ref } from 'vue'
import type {
  GraphData,
  SankeyOptions,
  SankeyGraph,
  SankeyNode,
  ApexSankeyConstructor,
  ApexSankeyInstance,
} from '../types'

/**
 * options for useSankey composable
 */
export interface UseSankeyOptions {
  containerRef: Ref<HTMLElement | null>
  data: Ref<GraphData>
  options?: Ref<Omit<Partial<SankeyOptions>, 'onNodeClick'> | undefined>
  onNodeClick?: () => ((node: SankeyNode) => void) | undefined
}

/**
 * composable for managing ApexSankey instance lifecycle
 */
export function useSankey({ containerRef, data, options, onNodeClick }: UseSankeyOptions) {
  const graph = shallowRef<SankeyGraph | null>(null)
  const instance = shallowRef<ApexSankeyInstance | null>(null)
  const isReady = ref(false)

  function getApexSankey(): ApexSankeyConstructor | null {
    if (typeof window === 'undefined') return null
    const win = window as unknown as { ApexSankey?: ApexSankeyConstructor }
    return win.ApexSankey || null
  }

  function buildOptions(): Partial<SankeyOptions> {
    const clickHandler = onNodeClick?.()
    return {
      ...options?.value,
      ...(clickHandler !== undefined && { onNodeClick: clickHandler }),
    }
  }

  function init() {
    if (!containerRef.value) return

    const ApexSankey = getApexSankey()
    if (!ApexSankey) {
      console.error(
        '[vue-apexsankey] ApexSankey not found. Make sure to import apexsankey and @svgdotjs/svg.js before using this component.'
      )
      return
    }

    instance.value = new ApexSankey(containerRef.value, buildOptions())
    graph.value = instance.value.render(data.value)
    isReady.value = true
  }

  function render() {
    if (!instance.value) return
    graph.value?.clear?.()
    graph.value = instance.value.render(data.value)
  }

  /**
   * destroys the chart instance via the core destroy() API
   */
  function destroy() {
    instance.value?.destroy()
    graph.value = null
    instance.value = null
    isReady.value = false
  }

  function recreate() {
    destroy()
    init()
  }

  onMounted(() => init())
  onBeforeUnmount(() => destroy())

  watch(data, () => { if (isReady.value) render() }, { deep: true })
  watch(() => options?.value, () => { if (isReady.value) recreate() }, { deep: true })

  return { graph, isReady, render, destroy, recreate }
}
