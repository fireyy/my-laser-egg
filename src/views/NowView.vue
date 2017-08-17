<template>
  <section id="now">
    <h2>{{title}}</h2>
    <gauge-chart :value="AQI/555"></gauge-chart>
    <ul class="inline">
      <li>
        <em>AQI</em>
        <span>{{AQI}}</span>
      </li>
      <li>
        <em>PM<sub>2.5</sub></em>
        <span>{{data.pm2_5}}</span>
      </li>
      <li>
        <em>PM<sub>10</sub></em>
        <span>{{data.pm10}}</span>
      </li>
    </ul>
  </section>
</template>

<script>
import GaugeChart from '../components/GaugeChart.vue'
import { getAQI } from '../utils'

export default {
  name: 'now-view',
  components: { GaugeChart },

  data: () => ({
    title: 'Now'
  }),

  computed: {
    AQI () {
      return getAQI(this.data.pm2_5)
    },
    data () {
      return this.$store.state.now
    }
  },

  asyncData ({ store }) {
    return store.dispatch('GET_TOP_DETAIL')
  },

  title () {
    return this.title
  }
}
</script>
