<template>
  <svg ref="gauge-chart" class="chart gauge-chart"></svg>
</template>
<script>
import Chart from '../libs/D3Gauge'

export default {
  props: {
    value: Number
  },
  mounted () {
    this.chart = new Chart({
      target: this.$refs['gauge-chart'],
      format: d => {
        let a = 555 * d
        if (a < 40) {
          return '优'
        } else if (a < 100) {
          return '良'
        } else {
          return '差'
        }
      },
      radius: 80,
      thickness: 10,
      ease: 'easeElastic',
      duration: 600
    })
    this.chart.render({value: this.value})
  },
  watch: {
    'value': function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.chart.update({value: newVal})
      }
    }
  }
}
</script>

<style>
.gauge-chart .circle { fill: none; stroke-linecap: round; stroke-linejoin: round; }
.gauge-chart .background { fill: none; stroke: rgba(255, 255, 255, .2); }
.gauge-chart .foreground { fill: none; stroke: #f32a64; }
.gauge-chart .label { fill: #f32a64; font: 22px sans-serif; text-anchor: middle; alignment-baseline: middle; }
</style>
