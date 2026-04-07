import ApexSankey from './components/ApexSankey.vue'
import { setApexSankeyLicense } from './utils/license'

// re-export types
export type {
  SankeyNode,
  SankeyEdge,
  GraphData,
  DataOptions,
  SankeyOptions,
  TooltipContent,
  SankeyGraph,
  ApexSankeyInstance,
  ApexSankeyConstructor,
  ApexSankeyProps,
  ApexSankeyEmits,
  ApexSankeyRef,
} from './types'

// re-export composable
export { useSankey } from './composables/useSankey'
export type { UseSankeyOptions } from './composables/useSankey'

// named exports
export { ApexSankey, setApexSankeyLicense }

// default export
export default ApexSankey
