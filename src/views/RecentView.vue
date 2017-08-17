<template>
  <section id="recent">
    <h2>{{title}}</h2>
    <bar-chart :value="data" v-if="data && data.length > 0"></bar-chart>
    <p v-else>No Data</p>
  </section>
</template>

<script>
import BarChart from '../components/BarChart.vue'
import { nowTime } from '../utils'

export default {
  name: 'recent-view',
  components: { BarChart },

  data: () => ({
    title: 'Recent'
  }),

  computed: {
    data () {
      return this.$store.state.recent
    }
  },

  asyncData ({ store }) {
    return store.dispatch('GET_TOP_HISTORY', {
      type: 'day',
      time: nowTime()
    })
  },

  title () {
    return this.title
  }
}
</script>
