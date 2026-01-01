<script setup lang="ts">
import { ref } from 'vue'
import ApexSankey from 'vue-apexsankey'
import type { GraphData, SankeyOptions } from 'vue-apexsankey'

const data: GraphData = {
  nodes: [
    { id: 'England', title: 'England' },
    { id: 'Wales', title: 'Wales' },
    { id: 'Level 4', title: 'Level 4' },
    { id: 'Level 3', title: 'Level 3' },
    { id: 'Level 2', title: 'Level 2' },
    { id: 'Level 1 and entry level', title: 'Level 1 and entry level' },
    { id: 'No qualifications', title: 'No qualifications' },
    { id: 'Wholesale & retail', title: 'Wholesale & retail' },
    { id: 'Health & social work', title: 'Health & social work' },
    { id: 'Education', title: 'Education' },
    { id: 'Construction', title: 'Construction' },
    { id: 'Manufacturing', title: 'Manufacturing' },
    { id: 'Other', title: 'Other' },
    { id: 'Transport & storage', title: 'Transport & storage' },
    { id: 'Finance & insurance', title: 'Finance & insurance' }
  ],
  edges: [
    { source: 'England', target: 'Level 4', value: 13 },
    { source: 'England', target: 'Level 3', value: 8 },
    { source: 'England', target: 'Level 2', value: 8 },
    { source: 'England', target: 'Level 1 and entry level', value: 6 },
    { source: 'England', target: 'No qualifications', value: 3 },
    { source: 'Wales', target: 'Level 4', value: 7 },
    { source: 'Wales', target: 'Level 3', value: 8 },
    { source: 'Wales', target: 'Level 2', value: 4 },
    { source: 'Wales', target: 'Level 1 and entry level', value: 5 },
    { source: 'Wales', target: 'No qualifications', value: 5 },
    { source: 'Level 4', target: 'Wholesale & retail', value: 4 },
    { source: 'Level 4', target: 'Health & social work', value: 3 },
    { source: 'Level 4', target: 'Education', value: 2 },
    { source: 'Level 4', target: 'Construction', value: 1 },
    { source: 'Level 4', target: 'Manufacturing', value: 2 },
    { source: 'Level 4', target: 'Other', value: 3 },
    { source: 'Level 4', target: 'Transport & storage', value: 2 },
    { source: 'Level 4', target: 'Finance & insurance', value: 3 },
    { source: 'Level 3', target: 'Wholesale & retail', value: 3 },
    { source: 'Level 3', target: 'Health & social work', value: 2 },
    { source: 'Level 3', target: 'Education', value: 1 },
    { source: 'Level 3', target: 'Construction', value: 2 },
    { source: 'Level 3', target: 'Manufacturing', value: 1 },
    { source: 'Level 3', target: 'Other', value: 3 },
    { source: 'Level 3', target: 'Transport & storage', value: 2 },
    { source: 'Level 3', target: 'Finance & insurance', value: 2 },
    { source: 'Level 2', target: 'Wholesale & retail', value: 2 },
    { source: 'Level 2', target: 'Health & social work', value: 1 },
    { source: 'Level 2', target: 'Education', value: 2 },
    { source: 'Level 2', target: 'Construction', value: 1 },
    { source: 'Level 2', target: 'Manufacturing', value: 2 },
    { source: 'Level 2', target: 'Other', value: 2 },
    { source: 'Level 2', target: 'Transport & storage', value: 1 },
    { source: 'Level 2', target: 'Finance & insurance', value: 1 },
    { source: 'Level 1 and entry level', target: 'Wholesale & retail', value: 1 },
    { source: 'Level 1 and entry level', target: 'Health & social work', value: 2 },
    { source: 'Level 1 and entry level', target: 'Education', value: 1 },
    { source: 'Level 1 and entry level', target: 'Construction', value: 2 },
    { source: 'Level 1 and entry level', target: 'Manufacturing', value: 1 },
    { source: 'Level 1 and entry level', target: 'Other', value: 2 },
    { source: 'Level 1 and entry level', target: 'Transport & storage', value: 1 },
    { source: 'Level 1 and entry level', target: 'Finance & insurance', value: 1 },
    { source: 'No qualifications', target: 'Wholesale & retail', value: 1 },
    { source: 'No qualifications', target: 'Health & social work', value: 1 },
    { source: 'No qualifications', target: 'Education', value: 1 },
    { source: 'No qualifications', target: 'Construction', value: 1 },
    { source: 'No qualifications', target: 'Manufacturing', value: 1 },
    { source: 'No qualifications', target: 'Other', value: 1 },
    { source: 'No qualifications', target: 'Transport & storage', value: 1 },
    { source: 'No qualifications', target: 'Finance & insurance', value: 1 }
  ]
}

const edgeOpacity = ref(0.2)
const edgeGradientFill = ref(true)

const options = ref<Partial<SankeyOptions>>({
  width: 800,
  height: 700,
  nodeWidth: 20,
  fontFamily: 'Quicksand, sans-serif',
  fontWeight: '600',
  edgeOpacity: edgeOpacity.value,
  edgeGradientFill: edgeGradientFill.value
})

function updateOptions() {
  options.value = {
    ...options.value,
    edgeOpacity: edgeOpacity.value,
    edgeGradientFill: edgeGradientFill.value
  }
}
</script>

<template>
  <div class="example">
    <div class="description">
      <p>
        Customize edge appearance with opacity and gradient fill options. 
        This diagram shows workforce qualifications to industry sectors flow.
      </p>
    </div>

    <div class="controls">
      <div class="control-group">
        <label>
          Edge Opacity: {{ edgeOpacity }}
          <input 
            v-model.number="edgeOpacity" 
            type="range" 
            min="0.1" 
            max="1" 
            step="0.1"
            @change="updateOptions"
          />
        </label>
      </div>
      
      <div class="control-group">
        <label>
          <input 
            v-model="edgeGradientFill" 
            type="checkbox"
            @change="updateOptions"
          />
          Edge Gradient Fill
        </label>
      </div>
    </div>
    
    <div class="chart-container">
      <ApexSankey :data="data" :options="options" />
    </div>

    <div class="code-section">
      <h3>Key Options</h3>
      <pre><code>const options: Partial&lt;SankeyOptions&gt; = {
  edgeOpacity: {{ edgeOpacity }},
  edgeGradientFill: {{ edgeGradientFill }}
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
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 24px;
  border: 1px solid #e5e5e5;
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
}

.control-group {
  display: flex;
  align-items: center;
}

.control-group label {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: #333;
}

.control-group input[type="range"] {
  width: 150px;
}

.control-group input[type="checkbox"] {
  width: 18px;
  height: 18px;
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
