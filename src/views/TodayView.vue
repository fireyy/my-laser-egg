<template>
  <section id="today">
    <h2>{{title}}</h2>
    <h3>{{selected | formatDate}}</h3>
    <calendar :view="view" :decorate="decorate" :current-views.sync="currentView" :indicator="indicator" :start-monday="true" @select="handleSelect">
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
    view: 'week',
    decorate: {},
    currentView: {},
    indicator: {},
    startDate: new Date,
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
      var arr = []
      for (var i = 0; i < 24; i ++) { arr.push({"time": i, "pm25": Math.floor(Math.random() * 50)})  }
      this.data = arr
    }
  }
}
</script>
