<template>
  <svg ref="chart" class="chart"></svg>
</template>
<style lang="less">
.chart {
  .grid {
    fill: RGB(230, 237, 244);
  }
  .bin {
    &:hover {
      stroke: white
    }
  }
  .axis {
    text {
      font: 9px sans-serif;
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
import Chart from '@/components/D3Heat'

const geny = n => {
  const data = []

  for (var i = 0; i < n; i++) {
    data.push({
      bin: i * 150,
      count: Math.random() * (25 * (n - i))
    })
  }

  return data
}

const gen = (x, y) => {
  const data = []

  for (var i = 0; i < x; i++) {
    data.push({
      bin: i,
      bins: geny(y)
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
      target: this.$refs.chart,
      width: 450,
      height: 250,
      axis: false
    })

    this.chart.render(gen(25, 15))
  },
  update () {
    this.changeData()
  },
  methods: {
    changeData () {
      this.chart.update(gen(25, 15))
    }
  }
}
</script>
