import { ref, shallowRef, onMounted, onBeforeUnmount, watch, type Ref } from 'vue'
import type {
  GraphData,
  SankeyOptions,
  SankeyGraph,
  ApexSankeyConstructor,
  ApexSankeyInstance
} from '../types'

/**
 * options for useSankey composable
 */
export interface UseSankeyOptions {
  /** ref to the container element */
  containerRef: Ref<HTMLElement | null>
  /** sankey data */
  data: Ref<GraphData>
  /** sankey options */
  options?: Ref<Partial<SankeyOptions> | undefined>
}

/**
 * composable for managing ApexSankey instance lifecycle
 */
export function useSankey({ containerRef, data, options }: UseSankeyOptions) {
  const graph = shallowRef<SankeyGraph | null>(null)
  const instance = shallowRef<ApexSankeyInstance | null>(null)
  const isReady = ref(false)

  /**
   * gets the ApexSankey constructor from window
   */
  function getApexSankey(): ApexSankeyConstructor | null {
    if (typeof window === 'undefined') {
      return null
    }

    const win = window as unknown as { ApexSankey?: ApexSankeyConstructor }
    return win.ApexSankey || null
  }

  /**
   * initializes the sankey chart
   */
  function init() {
    if (!containerRef.value) {
      return
    }

    const ApexSankey = getApexSankey()

    if (!ApexSankey) {
      console.error(
        '[vue-apexsankey] ApexSankey not found. Make sure to import apexsankey and @svgdotjs/svg.js before using this component.'
      )
      return
    }

    // create new instance
    instance.value = new ApexSankey(containerRef.value, options?.value || {})
    graph.value = instance.value.render(data.value)
    isReady.value = true
  }

  /**
   * re-renders the chart with current data
   */
  function render() {
    if (!instance.value || !containerRef.value) {
      return
    }

    // clear existing content
    graph.value?.clear?.()

    // re-render with new data
    graph.value = instance.value.render(data.value)
  }

  /**
   * destroys the chart instance and clears the container
   */
  function destroy() {
    if (graph.value) {
      graph.value.clear?.()
    }

    if (containerRef.value) {
      containerRef.value.innerHTML = ''
    }

    graph.value = null
    instance.value = null
    isReady.value = false
  }

  /**
   * recreates the chart with new options
   */
  function recreate() {
    destroy()
    init()
  }

  // initialize on mount
  onMounted(() => {
    init()
  })

  // cleanup on unmount
  onBeforeUnmount(() => {
    destroy()
  })

  // watch for data changes - deep watch for nested objects
  watch(
    data,
    () => {
      if (isReady.value) {
        render()
      }
    },
    { deep: true }
  )

  // watch for options changes - recreate instance with new options
  watch(
    () => options?.value,
    () => {
      if (isReady.value) {
        recreate()
      }
    },
    { deep: true }
  )

  return {
    /** the sankey graph instance */
    graph,
    /** whether the chart is ready */
    isReady,
    /** manually re-render the chart */
    render,
    /** destroy the chart */
    destroy,
    /** recreate the chart with current options */
    recreate
  }
}
