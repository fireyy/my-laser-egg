<template>
  <svg ref="bar-chart" class="chart bar-chart"></svg>
</template>
<script>
import * as d3 from 'd3'
import Chart from '../libs/D3Bar'
import Tip from '../libs/D3Tip'

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
    const tip = new Tip({
      format: d => d3.format(',')(d.pm25)
    })
    this.chart = new Chart({
      target: this.$refs['bar-chart'],
      keys: {
        x: 'time',
        y: 'pm25'
      },
      max: 30,
      width: 800,
      height: 208,
      axisPadding: 5,
      barPadding: 15,
      tickSize: 3,
      mouseover: tip.show.bind(tip),
      mouseout: tip.hide,
      ease: 'easeElastic',
      color: ['RGB(0, 177, 240)', 'rgb(243, 43, 101)']
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
.bar-chart .bar { fill: #f32a64; }
.bar-chart .column { fill: #e6edf4; }
.bar-chart .axis text { font: 9px sans-serif; fill: RGB(255, 255, 255); }
.bar-chart .axis path,
.bar-chart .axis line { fill: none; stroke: #e6edf4; stroke-width: 1.5px; shape-rendering: crispEdges; }
.bar-chart .axis path { display: none; }
</style>
