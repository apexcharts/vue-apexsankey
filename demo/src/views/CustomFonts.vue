<script setup lang="ts">
import ApexSankey from 'vue-apexsankey'
import type { GraphData, SankeyOptions } from 'vue-apexsankey'

const data: GraphData = {
  nodes: [
    { id: 'Berlin', title: 'Berlin' },
    { id: 'Job Applications', title: 'Job Applications' },
    { id: 'Barcelona', title: 'Barcelona' },
    { id: 'Madrid', title: 'Madrid' },
    { id: 'Amsterdam', title: 'Amsterdam' },
    { id: 'Paris', title: 'Paris' },
    { id: 'London', title: 'London' },
    { id: 'Munich', title: 'Munich' },
    { id: 'Brussels', title: 'Brussels' },
    { id: 'Dubai', title: 'Dubai' },
    { id: 'Dublin', title: 'Dublin' },
    { id: 'Other Cities', title: 'Other Cities' },
    { id: 'No Response', title: 'No Response' },
    { id: 'Responded', title: 'Responded' },
    { id: 'Rejected', title: 'Rejected' },
    { id: 'Interviewed', title: 'Interviewed' },
    { id: 'No Offer', title: 'No Offer' },
    { id: 'Declined Offer', title: 'Declined Offer' },
    { id: 'Accepted Offer', title: 'Accepted Offer' }
  ],
  edges: [
    { source: 'Berlin', target: 'Job Applications', value: 102, color: '#dddddd' },
    { source: 'Barcelona', target: 'Job Applications', value: 39, color: '#dddddd' },
    { source: 'Madrid', target: 'Job Applications', value: 35, color: '#dddddd' },
    { source: 'Amsterdam', target: 'Job Applications', value: 15, color: '#dddddd' },
    { source: 'Paris', target: 'Job Applications', value: 14, color: '#dddddd' },
    { source: 'London', target: 'Job Applications', value: 6, color: '#dddddd' },
    { source: 'Munich', target: 'Job Applications', value: 5, color: '#dddddd' },
    { source: 'Brussels', target: 'Job Applications', value: 4, color: '#dddddd' },
    { source: 'Dubai', target: 'Job Applications', value: 3, color: '#dddddd' },
    { source: 'Dublin', target: 'Job Applications', value: 3, color: '#dddddd' },
    { source: 'Other Cities', target: 'Job Applications', value: 12, color: '#dddddd' },
    { source: 'Job Applications', target: 'No Response', value: 189, color: '#dddddd' },
    { source: 'Job Applications', target: 'Responded', value: 49, color: 'orange' },
    { source: 'Responded', target: 'Rejected', value: 38, color: '#dddddd' },
    { source: 'Responded', target: 'Interviewed', value: 11, color: 'orange' },
    { source: 'Interviewed', target: 'No Offer', value: 8, color: '#dddddd' },
    { source: 'Interviewed', target: 'Declined Offer', value: 2, color: '#dddddd' },
    { source: 'Interviewed', target: 'Accepted Offer', value: 1, color: 'orange' }
  ],
  options: {
    order: [
      [
        ['Berlin', 'Barcelona', 'Madrid', 'Amsterdam', 'Paris', 'London'],
        ['Munich', 'Brussels', 'Dubai', 'Dublin', 'Other Cities']
      ],
      [['Job Applications']],
      [['Responded'], ['No Response']],
      [['Interviewed'], ['Rejected']],
      [['Accepted Offer', 'Declined Offer', 'No Offer'], []]
    ]
  }
}

const options: Partial<SankeyOptions> = {
  width: 800,
  height: 700,
  nodeWidth: 10,
  fontSize: '20px',
  fontFamily: 'Satisfy, cursive',
  fontWeight: '600',
  fontColor: '#E37816'
}
</script>

<template>
  <div class="example">
    <div class="description">
      <p>
        This example demonstrates custom font styling using the Google Font "Satisfy". 
        The diagram shows a job application flow with custom edge colors highlighting the success path.
      </p>
    </div>
    
    <div class="chart-container">
      <ApexSankey :data="data" :options="options" />
    </div>

    <div class="code-section">
      <h3>Key Options</h3>
      <pre><code>const options: Partial&lt;SankeyOptions&gt; = {
  fontSize: '20px',
  fontFamily: 'Satisfy, cursive',
  fontWeight: '600',
  fontColor: '#E37816'
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
