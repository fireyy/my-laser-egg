<template>
  <section id="today">
    <h2>{{title}}</h2>
    <h3>{{selected | formatDate}}</h3>
    <calendar :start-monday="true" @select="handleSelect">
    </calendar>
    <line-chart :value="data" v-if="data && data.length > 0"></line-chart>
    <p v-else>No Data</p>
  </section>
</template>

<script>
import LineChart from '../components/LineChart.vue'
import Calendar from '../components/Calendar.vue'
import { am0Time } from '../utils'

export default {
  name: 'today-view',
  components: { LineChart, Calendar },

  data: () => ({
    selected: new Date(),
    title: 'Today'
  }),

  computed: {
    data: {
      get() {
        return this.$store.state.today
      },
      set(val) {
        this.$store.state.today = val
      }
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
  },

  methods: {
    handleSelect (day) {
      this.selected = day
      this.$store.dispatch('GET_TOP_HISTORY', {
        type: 'hour',
        time: am0Time(day)
      })
    }
  }
}
</script>
