import ApexSankey from './components/ApexSankey.vue'
import { setApexSankeyLicense } from './utils/license'

// re-export types
export type {
  Node,
  Edge,
  GraphData,
  SankeyOptions,
  CommonOptions,
  NodeOptions,
  EdgeOptions,
  FontOptions,
  TooltipOptions,
  TooltipContent,
  DataOptions,
  ApexSankeyProps,
  ApexSankeyRef,
  SankeyGraph
} from './types'

// re-export composable
export { useSankey } from './composables/useSankey'
export type { UseSankeyOptions } from './composables/useSankey'

// named exports
export { ApexSankey, setApexSankeyLicense }

// default export
export default ApexSankey
