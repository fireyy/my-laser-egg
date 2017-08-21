<template>
  <section id="recent">
    <h2>{{title}}</h2>
    <line-chart :value="data" v-if="data && data.length > 0"></line-chart>
    <p v-else>No Data</p>
  </section>
</template>

<script>
import LineChart from '../components/LineChart.vue'
import { nowTime } from '../utils'

export default {
  name: 'recent-view',
  components: { LineChart },

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
