<script setup lang="ts">
import ApexSankey from 'vue-apexsankey'
import type { GraphData, SankeyOptions } from 'vue-apexsankey'

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
  height: 600,
  nodeWidth: 20,
  fontFamily: 'Quicksand, sans-serif',
  fontWeight: '600',
  enableToolbar: true
}
</script>

<template>
  <div class="example">
    <div class="description">
      <p>A basic energy flow Sankey diagram showing how different energy sources contribute to total energy production.</p>
    </div>
    
    <div class="chart-container">
      <ApexSankey :data="data" :options="options" />
    </div>

    <div class="code-section">
      <h3>Code</h3>
      <pre><code>&lt;script setup lang="ts"&gt;
import ApexSankey from 'vue-apexsankey'
import type { GraphData, SankeyOptions } from 'vue-apexsankey'

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

const options: Partial&lt;SankeyOptions&gt; = {
  width: 800,
  height: 600,
  nodeWidth: 20,
  fontFamily: 'Quicksand, sans-serif',
  fontWeight: '600',
  enableToolbar: true
}
&lt;/script&gt;

&lt;template&gt;
  &lt;ApexSankey :data="data" :options="options" /&gt;
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
}
</style>
