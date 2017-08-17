<template>
  <section id="today">
    <h2>{{title}}</h2>
    <line-chart :value="data" v-if="data && data.length > 0"></line-chart>
    <p v-else>No Data</p>
  </section>
</template>

<script>
import LineChart from '../components/LineChart.vue'
import { am0Time } from '../utils'

export default {
  name: 'today-view',
  components: { LineChart },

  data: () => ({
    title: 'Today'
  }),

  computed: {
    data () {
      return this.$store.state.today
    }
  },

  asyncData ({ store }) {
    return store.dispatch('GET_TOP_HISTORY', {
      type: 'hour',
      time: am0Time()
    })
  },

  title () {
    return this.title
  }
}
</script>
