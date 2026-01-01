# vue-apexsankey

Vue 3 wrapper for [ApexSankey](https://github.com/apexcharts/apexsankey) - A JavaScript library to create Sankey diagrams.

## Installation

```bash
npm install vue-apexsankey apexsankey @svgdotjs/svg.js
```

Or with yarn:

```bash
yarn add vue-apexsankey apexsankey @svgdotjs/svg.js
```

Or with pnpm:

```bash
pnpm add vue-apexsankey apexsankey @svgdotjs/svg.js
```

## Loading ApexSankey

**Important:** You must load ApexSankey before using the Vue component. Choose one of the following methods:

### Option 1: ES Module Import (Recommended)

Import ApexSankey at your app's entry point to register it globally:

```ts
// main.ts
import 'apexsankey'
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

### Option 2: CDN Script Tags

Add the scripts to your `index.html` before your app bundle:

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://cdn.jsdelivr.net/npm/@svgdotjs/svg.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/apexsankey/apexsankey.min.js"></script>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

## Quick Start

```vue
<script setup lang="ts">
import ApexSankey from 'vue-apexsankey'
import type { GraphData, SankeyOptions } from 'vue-apexsankey'

const data: GraphData = {
  nodes: [
    { id: 'oil', title: 'Oil' },
    { id: 'gas', title: 'Natural Gas' },
    { id: 'coal', title: 'Coal' },
    { id: 'fossil', title: 'Fossil Fuels' },
    { id: 'energy', title: 'Energy' }
  ],
  edges: [
    { source: 'oil', target: 'fossil', value: 15 },
    { source: 'gas', target: 'fossil', value: 20 },
    { source: 'coal', target: 'fossil', value: 25 },
    { source: 'fossil', target: 'energy', value: 60 }
  ]
}

const options: Partial<SankeyOptions> = {
  width: 800,
  height: 600,
  nodeWidth: 20
}
</script>

<template>
  <ApexSankey :data="data" :options="options" />
</template>
```

## License Setup

If you have a commercial license, set it once at app initialization before rendering any charts:

```ts
// main.ts
import 'apexsankey'
import { createApp } from 'vue'
import { setApexSankeyLicense } from 'vue-apexsankey'
import App from './App.vue'

// set license before mounting app
setApexSankeyLicense('your-license-key-here')

createApp(App).mount('#app')
```

## Using Template Refs

Access the underlying `SankeyGraph` instance via template refs:

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ApexSankey from 'vue-apexsankey'
import type { GraphData } from 'vue-apexsankey'

const chartRef = ref<InstanceType<typeof ApexSankey> | null>(null)

const data: GraphData = {
  nodes: [
    { id: 'a', title: 'A' },
    { id: 'b', title: 'B' }
  ],
  edges: [
    { source: 'a', target: 'b', value: 10 }
  ]
}

onMounted(() => {
  if (chartRef.value?.graph) {
    console.log('Graph instance:', chartRef.value.graph)
    console.log('Max rank:', chartRef.value.graph.maxRank)
  }
})
</script>

<template>
  <ApexSankey ref="chartRef" :data="data" />
</template>
```

## Reactivity

The component automatically updates when props change:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import ApexSankey from 'vue-apexsankey'
import type { GraphData, SankeyOptions } from 'vue-apexsankey'

const data = ref<GraphData>({
  nodes: [
    { id: 'a', title: 'A' },
    { id: 'b', title: 'B' }
  ],
  edges: [
    { source: 'a', target: 'b', value: 10 }
  ]
})

const options = ref<Partial<SankeyOptions>>({
  nodeWidth: 20
})

function updateData() {
  // chart will automatically re-render
  data.value = {
    ...data.value,
    edges: [
      { source: 'a', target: 'b', value: 50 }
    ]
  }
}

function updateOptions() {
  // chart will recreate with new options
  options.value = {
    ...options.value,
    nodeWidth: 30
  }
}
</script>

<template>
  <div>
    <ApexSankey :data="data" :options="options" />
    <button @click="updateData">Update Data</button>
    <button @click="updateOptions">Update Options</button>
  </div>
</template>
```

## Props

| Prop      | Type                     | Required | Description                           |
| --------- | ------------------------ | -------- | ------------------------------------- |
| `data`    | `GraphData`              | Yes      | Sankey diagram data (nodes and edges) |
| `options` | `Partial<SankeyOptions>` | No       | Configuration options for the diagram |

## Data Format

### Nodes

```typescript
interface Node {
  id: string      // unique identifier
  title: string   // display label
  color?: string  // optional custom color
}
```

### Edges

```typescript
interface Edge {
  source: string  // source node id
  target: string  // target node id
  value: number   // edge weight/size
  type?: string   // optional grouping type
  color?: string  // optional custom color
}
```

### Complete Data Structure

```typescript
interface GraphData {
  nodes: Node[]
  edges: Edge[]
  options?: {
    order?: string[][][]      // custom node ordering
    alignLinkTypes?: boolean  // align links by type
  }
}
```

## Options

| Option             | Type                   | Default                      | Description                                  |
| ------------------ | ---------------------- | ---------------------------- | -------------------------------------------- |
| `width`            | `number \| string`     | `800`                        | Width of graph container                     |
| `height`           | `number \| string`     | `800`                        | Height of graph container                    |
| `canvasStyle`      | `string`               | `""`                         | CSS styles for canvas root container         |
| `spacing`          | `number`               | `100`                        | Spacing from top and left of graph container |
| `nodeWidth`        | `number`               | `20`                         | Width of graph nodes                         |
| `nodeBorderWidth`  | `number`               | `1`                          | Border width of nodes in pixels              |
| `nodeBorderColor`  | `string`               | `""`                         | Border color of nodes                        |
| `onNodeClick`      | `(node: Node) => void` | `undefined`                  | Callback function for node click             |
| `edgeOpacity`      | `number`               | `0.4`                        | Opacity value for edges (0 to 1)             |
| `edgeGradientFill` | `boolean`              | `true`                       | Enable gradient fill based on node colors    |
| `enableTooltip`    | `boolean`              | `false`                      | Enable tooltip on hover                      |
| `enableToolbar`    | `boolean`              | `false`                      | Enable/disable graph toolbar                 |
| `tooltipId`        | `string`               | `"sankey-tooltip-container"` | Tooltip HTML element id                      |
| `tooltipTemplate`  | `(content) => string`  | default template             | HTML template for tooltip                    |
| `tooltipBorderColor` | `string`             | `"#BCBCBC"`                  | Border color of tooltip                      |
| `tooltipBGColor`   | `string`               | `"#FFFFFF"`                  | Background color of tooltip                  |
| `fontSize`         | `string`               | `"14px"`                     | Font size of node labels                     |
| `fontFamily`       | `string`               | `""`                         | Font family of node labels                   |
| `fontWeight`       | `string`               | `"400"`                      | Font weight of node labels                   |
| `fontColor`        | `string`               | `"#000000"`                  | Font color of node labels                    |

## Custom Node Ordering

You can specify custom node ordering using the `order` option in data:

```vue
<script setup lang="ts">
import ApexSankey from 'vue-apexsankey'
import type { GraphData } from 'vue-apexsankey'

const data: GraphData = {
  nodes: [
    { id: 'a', title: 'A' },
    { id: 'b', title: 'B' },
    { id: 'c', title: 'C' }
  ],
  edges: [
    { source: 'a', target: 'c', value: 1 },
    { source: 'b', target: 'c', value: 2 }
  ],
  options: {
    order: [
      [['a', 'b']], // first layer
      [['c']]       // second layer
    ]
  }
}
</script>

<template>
  <ApexSankey :data="data" />
</template>
```

## Custom Tooltip

```vue
<script setup lang="ts">
import ApexSankey from 'vue-apexsankey'
import type { GraphData, SankeyOptions } from 'vue-apexsankey'

const data: GraphData = {
  nodes: [
    { id: 'a', title: 'A' },
    { id: 'b', title: 'B' }
  ],
  edges: [
    { source: 'a', target: 'b', value: 10 }
  ]
}

const options: Partial<SankeyOptions> = {
  enableTooltip: true,
  tooltipTemplate: ({ source, target, value }) => `
    <div style="padding: 8px;">
      <strong>${source.title}</strong> → <strong>${target.title}</strong>
      <br />
      Value: ${value}
    </div>
  `
}
</script>

<template>
  <ApexSankey :data="data" :options="options" />
</template>
```

## Using the Composable

For more control, you can use the `useSankey` composable directly:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useSankey } from 'vue-apexsankey'
import type { GraphData, SankeyOptions } from 'vue-apexsankey'

const containerRef = ref<HTMLElement | null>(null)

const data = ref<GraphData>({
  nodes: [
    { id: 'a', title: 'A' },
    { id: 'b', title: 'B' }
  ],
  edges: [
    { source: 'a', target: 'b', value: 10 }
  ]
})

const options = ref<Partial<SankeyOptions>>({
  nodeWidth: 20
})

const { graph, isReady, render, destroy, recreate } = useSankey({
  containerRef,
  data,
  options
})
</script>

<template>
  <div ref="containerRef" style="width: 800px; height: 600px;" />
</template>
```

## TypeScript

All types are exported for use in your TypeScript projects:

```ts
import ApexSankey, {
  GraphData,
  Node,
  Edge,
  SankeyOptions,
  CommonOptions,
  NodeOptions,
  EdgeOptions,
  FontOptions,
  TooltipOptions,
  SankeyGraph
} from 'vue-apexsankey'
```

## SSR Support

This component is SSR-safe. It renders an empty container on the server and only initializes the chart client-side after the component is mounted.

## Browser Support

- Vue 3.3+
- Modern browsers (Chrome, Firefox, Safari, Edge)

## License

See [LICENSE](./LICENSE) file for details.

## Links

- [ApexSankey Documentation](https://apexcharts.com/docs/sankey)
- [ApexSankey GitHub](https://github.com/apexcharts/apexsankey)
