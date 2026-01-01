<script setup lang="ts">
import { ref } from 'vue'
import ApexSankey from 'vue-apexsankey'
import type { GraphData, SankeyOptions, Node } from 'vue-apexsankey'

const data: GraphData = {
  nodes: [
    { id: 'John', title: 'John' },
    { id: 'Raoul', title: 'Raoul' },
    { id: 'Jane', title: 'Jane' },
    { id: 'Marcel', title: 'Marcel' },
    { id: 'Ibrahim', title: 'Ibrahim' },
    { id: 'Junko', title: 'Junko' }
  ],
  edges: [
    { source: 'Marcel', target: 'Ibrahim', value: 72 },
    { source: 'Marcel', target: 'Raoul', value: 155 },
    { source: 'Raoul', target: 'John', value: 109 },
    { source: 'Raoul', target: 'Ibrahim', value: 100 },
    { source: 'Ibrahim', target: 'Jane', value: 100 },
    { source: 'Ibrahim', target: 'Junko', value: 127 },
    { source: 'Ibrahim', target: 'John', value: 67 },
    { source: 'Junko', target: 'Jane', value: 140 },
    { source: 'Junko', target: 'John', value: 93 }
  ]
}

const clickedNode = ref<Node | null>(null)

const options = ref<Partial<SankeyOptions>>({
  width: '90%',
  height: 500,
  fontFamily: 'Quicksand, sans-serif',
  fontWeight: '600',
  nodeWidth: 5,
  nodeBorderWidth: 2,
  nodeBorderColor: '#111',
  edgeGradientFill: false,
  onNodeClick: (node: Node) => {
    clickedNode.value = node
  }
})
</script>

<template>
  <div class="example">
    <div class="description">
      <p>
        Customize node appearance with border styling and click handlers. 
        Click on any node to see the node data.
      </p>
    </div>

    <div v-if="clickedNode" class="click-info">
      <strong>Clicked Node:</strong> {{ clickedNode.title }} (ID: {{ clickedNode.id }})
      <button @click="clickedNode = null">Clear</button>
    </div>
    
    <div class="chart-container">
      <ApexSankey :data="data" :options="options" />
    </div>

    <div class="code-section">
      <h3>Key Options</h3>
      <pre><code>const options: Partial&lt;SankeyOptions&gt; = {
  nodeWidth: 5,
  nodeBorderWidth: 2,
  nodeBorderColor: '#111',
  edgeGradientFill: false,
  onNodeClick: (node: Node) => {
    console.log('Clicked:', node)
  }
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

.click-info {
  background: #e0f2fe;
  padding: 16px 20px;
  border-radius: 8px;
  margin-bottom: 24px;
  border: 1px solid #7dd3fc;
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 14px;
}

.click-info button {
  margin-left: auto;
  padding: 6px 12px;
  background: #0284c7;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
}

.click-info button:hover {
  background: #0369a1;
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
