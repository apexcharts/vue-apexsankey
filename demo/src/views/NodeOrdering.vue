<script setup lang="ts">
import ApexSankey from 'vue-apexsankey'
import type { GraphData, SankeyOptions } from 'vue-apexsankey'

const data: GraphData = {
  nodes: [
    { id: 'Applications', title: 'Applications' },
    { id: 'Accepted', title: 'Accepted' },
    { id: 'Rejected', title: 'Rejected' },
    { id: 'In Progress', title: 'In Progress' },
    { id: 'Software Engineering', title: 'Software Engineering' },
    { id: 'Data Science', title: 'Data Science' },
    { id: 'Marketing', title: 'Marketing' },
    { id: 'Sales', title: 'Sales' },
    { id: 'HR', title: 'HR' },
    { id: 'Finance', title: 'Finance' },
    { id: 'Internship', title: 'Internship' },
    { id: 'Junior', title: 'Junior' },
    { id: 'Mid-level', title: 'Mid-level' },
    { id: 'Senior', title: 'Senior' },
    { id: 'Entry Level', title: 'Entry Level' },
    { id: 'Full-time', title: 'Full-time' },
    { id: 'Part-time', title: 'Part-time' }
  ],
  edges: [
    { source: 'Applications', target: 'Accepted', value: 10 },
    { source: 'Applications', target: 'Rejected', value: 15 },
    { source: 'Applications', target: 'In Progress', value: 10 },
    { source: 'Accepted', target: 'Software Engineering', value: 4 },
    { source: 'Accepted', target: 'Data Science', value: 2 },
    { source: 'Accepted', target: 'Marketing', value: 1 },
    { source: 'Accepted', target: 'Sales', value: 1 },
    { source: 'Accepted', target: 'HR', value: 1 },
    { source: 'Accepted', target: 'Finance', value: 1 },
    { source: 'Rejected', target: 'Software Engineering', value: 5 },
    { source: 'Rejected', target: 'Data Science', value: 3 },
    { source: 'Rejected', target: 'Marketing', value: 2 },
    { source: 'Rejected', target: 'Sales', value: 2 },
    { source: 'Rejected', target: 'HR', value: 2 },
    { source: 'Rejected', target: 'Finance', value: 1 },
    { source: 'In Progress', target: 'Software Engineering', value: 3 },
    { source: 'In Progress', target: 'Data Science', value: 2 },
    { source: 'In Progress', target: 'Marketing', value: 2 },
    { source: 'In Progress', target: 'Sales', value: 1 },
    { source: 'In Progress', target: 'HR', value: 1 },
    { source: 'In Progress', target: 'Finance', value: 1 },
    { source: 'Software Engineering', target: 'Internship', value: 1 },
    { source: 'Software Engineering', target: 'Junior', value: 1 },
    { source: 'Software Engineering', target: 'Mid-level', value: 1 },
    { source: 'Software Engineering', target: 'Senior', value: 1 },
    { source: 'Software Engineering', target: 'Entry Level', value: 1 },
    { source: 'Data Science', target: 'Internship', value: 1 },
    { source: 'Data Science', target: 'Junior', value: 1 },
    { source: 'Data Science', target: 'Mid-level', value: 1 },
    { source: 'Data Science', target: 'Senior', value: 1 },
    { source: 'Data Science', target: 'Entry Level', value: 1 },
    { source: 'Marketing', target: 'Internship', value: 1 },
    { source: 'Marketing', target: 'Junior', value: 1 },
    { source: 'Marketing', target: 'Mid-level', value: 1 },
    { source: 'Marketing', target: 'Senior', value: 1 },
    { source: 'Marketing', target: 'Entry Level', value: 1 },
    { source: 'Sales', target: 'Internship', value: 1 },
    { source: 'Sales', target: 'Junior', value: 1 },
    { source: 'Sales', target: 'Mid-level', value: 1 },
    { source: 'Sales', target: 'Senior', value: 1 },
    { source: 'Sales', target: 'Entry Level', value: 1 },
    { source: 'HR', target: 'Internship', value: 1 },
    { source: 'HR', target: 'Junior', value: 1 },
    { source: 'HR', target: 'Mid-level', value: 1 },
    { source: 'HR', target: 'Senior', value: 1 },
    { source: 'HR', target: 'Entry Level', value: 1 },
    { source: 'Finance', target: 'Internship', value: 1 },
    { source: 'Finance', target: 'Junior', value: 1 },
    { source: 'Finance', target: 'Mid-level', value: 1 },
    { source: 'Finance', target: 'Senior', value: 1 },
    { source: 'Finance', target: 'Entry Level', value: 1 },
    { source: 'Internship', target: 'Full-time', value: 1 },
    { source: 'Internship', target: 'Part-time', value: 1 },
    { source: 'Junior', target: 'Full-time', value: 1 },
    { source: 'Junior', target: 'Part-time', value: 1 },
    { source: 'Mid-level', target: 'Full-time', value: 1 },
    { source: 'Mid-level', target: 'Part-time', value: 1 },
    { source: 'Senior', target: 'Full-time', value: 1 },
    { source: 'Senior', target: 'Part-time', value: 1 },
    { source: 'Entry Level', target: 'Full-time', value: 1 },
    { source: 'Entry Level', target: 'Part-time', value: 1 }
  ]
}

const options: Partial<SankeyOptions> = {
  width: '90%',
  height: 700,
  fontFamily: 'Quicksand, sans-serif',
  fontWeight: '600',
  nodeWidth: 5,
  nodeBorderWidth: 2,
  nodeBorderColor: '#111',
  edgeGradientFill: false
}
</script>

<template>
  <div class="example">
    <div class="description">
      <p>
        This example shows automatic node ordering in a complex multi-layer Sankey diagram. 
        The library automatically determines the optimal positioning to minimize edge crossings.
      </p>
      <p style="margin-top: 12px;">
        You can also specify custom ordering using the <code>order</code> option in data. 
        See the Custom Fonts example for manual ordering.
      </p>
    </div>
    
    <div class="chart-container">
      <ApexSankey :data="data" :options="options" />
    </div>

    <div class="code-section">
      <h3>Custom Order Example</h3>
      <pre><code>const data: GraphData = {
  nodes: [...],
  edges: [...],
  options: {
    // specify custom layer ordering
    order: [
      [['a', 'b']],      // first layer
      [['c', 'd', 'e']], // second layer
      [['f']]            // third layer
    ]
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

.description code {
  background: #f1f5f9;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 13px;
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
