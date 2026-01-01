<script setup lang="ts">
import ApexSankey from 'vue-apexsankey'
import type { GraphData, SankeyOptions, TooltipContent } from 'vue-apexsankey'

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

// custom tooltip template
function customTooltip({ source, target, value }: TooltipContent): string {
  return `
    <div style="
      padding: 12px 16px;
      font-family: Inter, sans-serif;
      min-width: 180px;
    ">
      <div style="
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
      ">
        <div style="
          width: 12px;
          height: 12px;
          border-radius: 2px;
          background-color: ${source.color || '#888'};
        "></div>
        <span style="font-weight: 600;">${source.title}</span>
      </div>
      <div style="
        text-align: center;
        color: #666;
        font-size: 20px;
        margin: 4px 0;
      ">↓</div>
      <div style="
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 12px;
      ">
        <div style="
          width: 12px;
          height: 12px;
          border-radius: 2px;
          background-color: ${target.color || '#888'};
        "></div>
        <span style="font-weight: 600;">${target.title}</span>
      </div>
      <div style="
        padding-top: 8px;
        border-top: 1px solid #eee;
        font-size: 13px;
        color: #666;
      ">
        Flow: <strong style="color: #333;">${value} units</strong>
      </div>
    </div>
  `
}

const options: Partial<SankeyOptions> = {
  width: 800,
  height: 600,
  nodeWidth: 20,
  fontFamily: 'Quicksand, sans-serif',
  fontWeight: '600',
  enableTooltip: true,
  tooltipTemplate: customTooltip,
  tooltipBGColor: '#ffffff',
  tooltipBorderColor: '#e5e5e5'
}
</script>

<template>
  <div class="example">
    <div class="description">
      <p>
        Enable tooltips on hover to show detailed information about edges. 
        You can customize the tooltip appearance using a template function.
      </p>
      <p style="margin-top: 8px; font-weight: 500;">
        Hover over any edge to see the custom tooltip.
      </p>
    </div>
    
    <div class="chart-container">
      <ApexSankey :data="data" :options="options" />
    </div>

    <div class="code-section">
      <h3>Custom Tooltip Template</h3>
      <pre><code>function customTooltip({ source, target, value }: TooltipContent): string {
  return `
    &lt;div style="padding: 12px 16px;"&gt;
      &lt;div&gt;
        &lt;span style="
          display: inline-block;
          width: 12px;
          height: 12px;
          background: ${source.color};
        "&gt;&lt;/span&gt;
        ${source.title}
      &lt;/div&gt;
      &lt;div&gt;↓&lt;/div&gt;
      &lt;div&gt;
        &lt;span style="
          display: inline-block;
          width: 12px;
          height: 12px;
          background: ${target.color};
        "&gt;&lt;/span&gt;
        ${target.title}
      &lt;/div&gt;
      &lt;div&gt;Flow: &lt;strong&gt;${value} units&lt;/strong&gt;&lt;/div&gt;
    &lt;/div&gt;
  `
}

const options: Partial&lt;SankeyOptions&gt; = {
  enableTooltip: true,
  tooltipTemplate: customTooltip,
  tooltipBGColor: '#ffffff',
  tooltipBorderColor: '#e5e5e5'
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
