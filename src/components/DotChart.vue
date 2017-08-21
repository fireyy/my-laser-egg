<template>
  <svg ref="dot-chart" class="chart dot-chart"></svg>
</template>
<script>
import Chart from '../libs/D3Bar'

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
    this.chart = new Chart({
      target: this.$refs['dot-chart'],
      keys: {
        x: 'time',
        y: 'pm25'
      }
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
.dot-chart .axis text { font: 9px sans-serif; fill: RGB(255, 255, 255); }
.dot-chart .axis path,
.dot-chart .axis line { fill: none; stroke: #e6edf4; stroke-width: 1.5px; shape-rendering: crispEdges; }
.dot-chart .axis path { display: none; }
</style>
