<template>
  <svg ref="line-chart" class="chart line-chart"></svg>
</template>
<script>
import Chart from '../libs/D3Line'

export default {
  props: {
    value: {
      type: Array,
      default () {
        return []
      }
    }
  },
  mounted () {
    let width = Math.min(document.documentElement.clientWidth, 800)
    this.chart = new Chart({
      target: this.$refs['line-chart'],
      keys: {
        x: 'time',
        y: 'pm25'
      },
      width: width,
      height: width / 4,
      xTicks: 3,
      yTicks: 3
    })
    this.chart.render(this.value)
  },
  watch: {
    'value': function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.chart.update(newVal)
      }
    }
  }
}
</script>

<style>
.line-chart .column { fill: RGBA(255, 255, 255, 0.1); }
.line-chart .line { stroke: #f32a64; stroke-width: 3px; fill: none; }
.line-chart .axis text { font: 9px sans-serif; fill: rgba(255, 255, 255, 0.5); }
.line-chart .axis path,
.line-chart .axis line { fill: none; stroke: #e6edf4; stroke-width: 1.5px; shape-rendering: crispEdges; }
.line-chart .axis path { display: none; }
</style>
