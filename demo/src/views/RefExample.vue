<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ApexSankey from 'vue-apexsankey'
import type { GraphData, SankeyOptions } from 'vue-apexsankey'

const chartRef = ref<InstanceType<typeof ApexSankey> | null>(null)
const graphInfo = ref<string>('')
const isReady = ref(false)

const data: GraphData = {
  nodes: [
    { id: 'Oil', title: 'Oil' },
    { id: 'Natural Gas', title: 'Natural Gas' },
    { id: 'Coal', title: 'Coal' },
    { id: 'Fossil Fuels', title: 'Fossil Fuels' },
    { id: 'Electricity', title: 'Electricity' },
    { id: 'Energy', title: 'Energy' }
  ],
  edges: [
    { source: 'Oil', target: 'Fossil Fuels', value: 15 },
    { source: 'Natural Gas', target: 'Fossil Fuels', value: 20 },
    { source: 'Coal', target: 'Fossil Fuels', value: 25 },
    { source: 'Coal', target: 'Electricity', value: 25 },
    { source: 'Fossil Fuels', target: 'Energy', value: 60 },
    { source: 'Electricity', target: 'Energy', value: 25 }
  ]
}

const options: Partial<SankeyOptions> = {
  width: 800,
  height: 500,
  nodeWidth: 20,
  fontFamily: 'Quicksand, sans-serif',
  fontWeight: '600'
}

onMounted(() => {
  // wait for next tick to ensure chart is rendered
  setTimeout(() => {
    updateGraphInfo()
    isReady.value = true
  }, 100)
})

function updateGraphInfo() {
  if (chartRef.value?.graph) {
    const graph = chartRef.value.graph
    graphInfo.value = JSON.stringify({
      maxRank: graph.maxRank,
      width: graph.width,
      height: graph.height,
      spacing: graph.spacing
    }, null, 2)
  }
}

function manualRender() {
  chartRef.value?.render()
  updateGraphInfo()
}

function exportSvg() {
  chartRef.value?.graph?.exportToSvg()
}
</script>

<template>
  <div class="example">
    <div class="description">
      <p>
        Access the underlying SankeyGraph instance using template refs. 
        This allows you to call methods like <code>render()</code>, <code>exportToSvg()</code>, 
        and access properties like <code>maxRank</code>.
      </p>
    </div>

    <div class="actions">
      <button @click="manualRender" :disabled="!isReady">
        Manual Re-render
      </button>
      <button @click="exportSvg" :disabled="!isReady">
        Export SVG
      </button>
      <button @click="updateGraphInfo" :disabled="!isReady">
        Refresh Info
      </button>
    </div>

    <div v-if="graphInfo" class="graph-info">
      <h4>Graph Instance Info</h4>
      <pre>{{ graphInfo }}</pre>
    </div>
    
    <div class="chart-container">
      <ApexSankey ref="chartRef" :data="data" :options="options" />
    </div>

    <div class="code-section">
      <h3>Using Template Refs</h3>
      <pre><code>&lt;script setup lang="ts"&gt;
import { ref, onMounted } from 'vue'
import ApexSankey from 'vue-apexsankey'

const chartRef = ref&lt;InstanceType&lt;typeof ApexSankey&gt; | null&gt;(null)

onMounted(() => {
  // access the graph instance
  if (chartRef.value?.graph) {
    console.log('Max rank:', chartRef.value.graph.maxRank)
    console.log('Width:', chartRef.value.graph.width)
  }
})

function exportChart() {
  chartRef.value?.graph?.exportToSvg()
}

function rerender() {
  chartRef.value?.render()
}
&lt;/script&gt;

&lt;template&gt;
  &lt;ApexSankey ref="chartRef" :data="data" :options="options" /&gt;
&lt;/template&gt;</code></pre>
    </div>
  </div>
</template>

<style scoped>
.example {
  max-width: 1200px;
}

.description {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 24px;
  border: 1px solid #e5e5e5;
}

.description p {
  color: #666;
  line-height: 1.6;
}

.description code {
  background: #f1f5f9;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 13px;
}

.actions {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.actions button {
  padding: 10px 20px;
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.actions button:hover:not(:disabled) {
  background: #1d4ed8;
}

.actions button:disabled {
  background: #94a3b8;
  cursor: not-allowed;
}

.graph-info {
  background: #f8fafc;
  padding: 16px 20px;
  border-radius: 8px;
  margin-bottom: 24px;
  border: 1px solid #e2e8f0;
}

.graph-info h4 {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #334155;
}

.graph-info pre {
  margin: 0;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 13px;
  color: #475569;
}

.chart-container {
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #e5e5e5;
  margin-bottom: 24px;
}

.code-section {
  background: #1a1a1a;
  border-radius: 8px;
  padding: 20px;
  overflow-x: auto;
}

.code-section h3 {
  color: #fff;
  font-size: 14px;
  margin-bottom: 16px;
  font-weight: 600;
}

.code-section pre {
  margin: 0;
}

.code-section code {
  color: #a5d6ff;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 13px;
  line-height: 1.6;
  background: transparent;
  padding: 0;
}
</style>
