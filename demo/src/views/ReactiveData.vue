<script setup lang="ts">
import { ref, computed } from 'vue'
import ApexSankey from 'vue-apexsankey'
import type { GraphData, SankeyOptions } from 'vue-apexsankey'

// reactive edge values
const oilValue = ref(15)
const gasValue = ref(20)
const coalToFossil = ref(25)
const coalToElectricity = ref(25)

// computed data that updates when values change
const data = computed<GraphData>(() => ({
  nodes: [
    { id: 'Oil', title: 'Oil' },
    { id: 'Natural Gas', title: 'Natural Gas' },
    { id: 'Coal', title: 'Coal' },
    { id: 'Fossil Fuels', title: 'Fossil Fuels' },
    { id: 'Electricity', title: 'Electricity' },
    { id: 'Energy', title: 'Energy' }
  ],
  edges: [
    { source: 'Oil', target: 'Fossil Fuels', value: oilValue.value },
    { source: 'Natural Gas', target: 'Fossil Fuels', value: gasValue.value },
    { source: 'Coal', target: 'Fossil Fuels', value: coalToFossil.value },
    { source: 'Coal', target: 'Electricity', value: coalToElectricity.value },
    { 
      source: 'Fossil Fuels', 
      target: 'Energy', 
      value: oilValue.value + gasValue.value + coalToFossil.value 
    },
    { source: 'Electricity', target: 'Energy', value: coalToElectricity.value }
  ]
}))

const options: Partial<SankeyOptions> = {
  width: 800,
  height: 500,
  nodeWidth: 20,
  fontFamily: 'Quicksand, sans-serif',
  fontWeight: '600'
}

function randomize() {
  oilValue.value = Math.floor(Math.random() * 50) + 5
  gasValue.value = Math.floor(Math.random() * 50) + 5
  coalToFossil.value = Math.floor(Math.random() * 50) + 5
  coalToElectricity.value = Math.floor(Math.random() * 50) + 5
}
</script>

<template>
  <div class="example">
    <div class="description">
      <p>
        The chart automatically re-renders when data changes. 
        Use the sliders below to adjust edge values and see the diagram update in real-time.
      </p>
    </div>

    <div class="controls">
      <div class="control-row">
        <div class="control-group">
          <label>
            Oil → Fossil Fuels: {{ oilValue }}
            <input v-model.number="oilValue" type="range" min="5" max="100" />
          </label>
        </div>
        
        <div class="control-group">
          <label>
            Natural Gas → Fossil Fuels: {{ gasValue }}
            <input v-model.number="gasValue" type="range" min="5" max="100" />
          </label>
        </div>
      </div>

      <div class="control-row">
        <div class="control-group">
          <label>
            Coal → Fossil Fuels: {{ coalToFossil }}
            <input v-model.number="coalToFossil" type="range" min="5" max="100" />
          </label>
        </div>
        
        <div class="control-group">
          <label>
            Coal → Electricity: {{ coalToElectricity }}
            <input v-model.number="coalToElectricity" type="range" min="5" max="100" />
          </label>
        </div>
      </div>

      <button class="randomize-btn" @click="randomize">
        Randomize Values
      </button>
    </div>
    
    <div class="chart-container">
      <ApexSankey :data="data" :options="options" />
    </div>

    <div class="code-section">
      <h3>Reactive Data Example</h3>
      <pre><code>import { ref, computed } from 'vue'

const oilValue = ref(15)
const gasValue = ref(20)

// computed data automatically updates the chart
const data = computed&lt;GraphData&gt;(() => ({
  nodes: [...],
  edges: [
    { source: 'Oil', target: 'Fossil Fuels', value: oilValue.value },
    { source: 'Natural Gas', target: 'Fossil Fuels', value: gasValue.value },
    // ...
  ]
}))

// changing ref values triggers chart re-render
function updateValues() {
  oilValue.value = 50
  gasValue.value = 30
}</code></pre>
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

.controls {
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  margin-bottom: 24px;
  border: 1px solid #e5e5e5;
}

.control-row {
  display: flex;
  gap: 32px;
  margin-bottom: 20px;
}

.control-row:last-of-type {
  margin-bottom: 24px;
}

.control-group {
  flex: 1;
}

.control-group label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.control-group input[type="range"] {
  width: 100%;
  height: 6px;
  cursor: pointer;
}

.randomize-btn {
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

.randomize-btn:hover {
  background: #1d4ed8;
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
