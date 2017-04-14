<template>
  <svg ref="chart" class="chart"></svg>
</template>
<style lang="less">
.chart {
  .column {
    fill: RGB(230, 237, 244);
  }
  .line {
    stroke: RGB(243, 42, 100);
    stroke-width: 3px;
    fill: none;
  }
  .axis {
    text {
      font: 9px sans-serif;
      fill: rgba(255, 255, 255, 0.5);
    }
    path,
    line {
      fill: none;
      stroke: RGB(230, 237, 244);
      stroke-width: 1.5px;
      shape-rendering: crispEdges;
    }

    path {
      display: none;
    }
  }
}
</style>
<script>
import Chart from '@/components/D3Line'

const gen = n => {
  const data = []

  for (var i = n; i; i--) {
    data.push({
      time: new Date(Date.now() - (i * 3600000)),
      value: Math.max(250, Math.random() * 3000 | 0)
    })
  }

  return data
}

export default {
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    this.chart = new Chart({
      target: this.$refs.chart
    })

    this.chart.render(gen(24))
  },
  update () {
    this.changeData()
  },
  methods: {
    changeData () {
      this.chart.update(gen(24))
    }
  }
}
</script>
