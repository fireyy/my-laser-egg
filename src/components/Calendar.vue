<template>
  <div class="calendar">
    <div class="calendar__header">
      <!-- 年份 月份 -->
      <div class="calendar__control" :class="{'calendar__control_center': centerHeader}">
        <div class="calendar__arrow left" @click="prevView"></div>
        <div class="calendar__indicator">
          <span class="calendar__indicator-title">{{shownIndicator.title}}</span>
          <span class="calendar__indicator-detail">{{shownIndicator.detail}}</span>
        </div>
        <div class="calendar__arrow right" @click="nextView"></div>
      </div>
      <div class="calendar__action">
        <slot name="action"></slot>
      </div>
    </div>
    <div class="calendar__main">
      <div class="calendar__today" @click="goToday">
        今天
      </div>
      <div class="calendar__date">
        <!-- 星期 -->
        <div class="calendar__weekdays">
          <div v-for="(weekDay, index) in weekDays" :key="index" class="calendar__weekday">{{weekDay}}</div>
        </div>
        <!-- 日期 -->
        <div class="calendar__days">
          <div class="calendar__day" :key="index" v-for="(day, index) in days"
              :class="{'calendar__day_now': checkToday(day), 'calendar__day_selected': checkSelected(day), 'calendar__day_othermonth': checkOtherMonth(day), 'calendar__day_decorate': checkDecorate(day)}"
              @click="select(day)">
            <span>{{day.getDate()}}<i class="sub" v-if="checkSub(day)" :style="{color: checkSub(day).color}">{{checkSub(day).content}}</i></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const I18N = {
  'zh-cn': ['日', '一', '二', '三', '四', '五', '六'],
  'en': ['SUN', 'MON', 'TUN', 'WED', 'THU', 'FRI', 'SAT']
}
export default {
  props: {
    currentViews: {
      type: Object,
      twoWay: true,
      'default'() {
        return {}
      }
    },
    decorate: {
      type: Object,
      'default'() {
        return {}
      }
    },
    sub: {
      type: Object,
      'default'() {
        return {}
      }
    },
    i18n: {
      type: String,
      'default': 'zh-cn'
    },
    indicator: {
      type: Object,
      'default'() {
        return {}
      }
    },
    startMonday: {
      type: Boolean,
      'default': false
    },
    view: {
      type: String,
      'default': 'month'
    },
    centerHeader: {
      type: Boolean,
      'default': true
    }
  },
  data() {
    return {
      startDate: new Date(),
      selected: new Date()
    }
  },
  computed: {
    currentView: {
      get() {
        return this.currentViews
      },
      set() {
        //
      }
    },
    shownIndicator: {
      get() {
        let indicator = {}
        if (this.indicator.title) {
          indicator.title = this.indicator.title
        } else {
          indicator.title = this.startDate.getFullYear()
        }

        if (this.indicator.detail) {
          indicator.detail = this.indicator.detail
        } else {
          indicator.detail = this.startDate.getMonth() + 1 + '月'
        }
        return indicator
      }
    },
    days: {
      get() {
        let days = []
        let dayslength
        let startDay
        let leftPadding
        let startDate
        if (this.view === 'month') {
          dayslength = 35
          startDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth())
          startDay = startDate.getDay()
        } else {
          dayslength = 7
          startDate = this.startDate
          startDay = startDate.getDay()
        }
        if (this.startMonday) {
          leftPadding = startDay ? startDay - 1 : 6
        } else {
          leftPadding = startDay
        }

        Array.from({length: leftPadding}, (v, k) => -(k + 1)).reverse().forEach((minus) => {
          days.push(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + minus))
        })
        days.push(startDate)
        Array.from({length: dayslength - days.length}, (v, k) => k + 1).forEach((plus) => {
          days.push(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + plus))
        })
        return days
      }
    },
    weekDays: {
      get() {
        let weekDayNames = JSON.parse(JSON.stringify(I18N[this.i18n]))

        if (this.startMonday) {
          let sunday = weekDayNames.shift()
          weekDayNames.push(sunday)
        }
        return weekDayNames
      }
    }
  },
  watch: {
    days() {
      this.currentView = {
        start: this.days[0],
        end: this.days[this.days.length - 1]
      }
    }
  },
  methods: {
    checkToday(day) {
      let now = new Date()
      return !!(
        day.getFullYear() === now.getFullYear() &&
        day.getMonth() === now.getMonth() &&
        day.getDate() === now.getDate()
      )
    },
    checkSelected(day) {
      return !!(
        day.getFullYear() === this.selected.getFullYear() &&
        day.getMonth() === this.selected.getMonth() &&
        day.getDate() === this.selected.getDate()
      )
    },
    checkOtherMonth(day) {
      return day.getMonth() !== this.startDate.getMonth()
    },
    checkDecorate(day) {
      let dateFormat = day.getFullYear() + '-' + ('0' + (day.getMonth() + 1)).slice(-2) + '-' + ('0' + (day.getDate())).slice(-2)
      return !!this.decorate[dateFormat]
    },
    checkSub(day) {
      let dateFormat = day.getFullYear() + '-' + ('0' + (day.getMonth() + 1)).slice(-2) + '-' + ('0' + (day.getDate())).slice(-2)
      return this.sub[dateFormat]
    },
    prevView() {
      if (this.view === 'month') {
        this.startDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth() - 1, this.startDate.getDate())
      } else {
        this.startDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate() - 7)
      }
      this.$nextTick(() => {
        this.$emit('prev')
      })
    },
    nextView() {
      if (this.view === 'month') {
        this.startDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth() + 1, this.startDate.getDate())
      } else {
        this.startDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate() + 7)
      }
      this.$nextTick(() => {
        this.$emit('next')
      })
    },
    select(day) {
      this.selected = day
      this.$nextTick(() => {
        this.$emit('select', day)
      })
    },
    goToday() {
      this.startDate = new Date
      this.selected = new Date
      this.$nextTick(() => {
        this.$emit('today')
      })
    }
  },
  created() {
    this.currentView = {
      start: this.days[0],
      end: this.days[this.days.length - 1]
    }
  }
}
</script>

<style>
.calendar {
  font-size: 14px;
  max-width: 800px;
  margin: 0 auto 40px;
}
.calendar .calendar__header {
  position: relative;
  padding: 25px 0;
}
.calendar .calendar__action {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  height: 100%;
  top: 0;
  right: 10px;
}
.calendar .calendar__control {
  width: 240px;
  padding: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: rgba(255,255,255,0.5)
}
.calendar .calendar__control.calendar__control_center {
  margin: 0 auto;
}
.calendar .calendar__control .calendar__indicator {
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-weight: bold;
}
.calendar .calendar__control .calendar__indicator-detail {
  color: #fff;
  margin-left: 10px;
}
.calendar .calendar__control .calendar__arrow {
  width: 44px;
  text-align: center
}
.calendar .calendar__control .calendar__arrow.right:after {
  display: inline-block;
  content: '';
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 5px solid #c7d2d0;
}
.calendar .calendar__control .calendar__arrow.left:after {
  display: inline-block;
  content: '';
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-right: 5px solid #c7d2d0;
}
.calendar .calendar__main {
  display: flex;
}
.calendar .calendar__today {
  flex: none;
  width: 20px;
  padding: 5px 0;
  margin-left: 8px;
  border-radius: 10px;
  align-self: flex-start;
  background: #f32a64;
  font-size: 11px;
  text-align: center;
  color: #fff;
}
.calendar .calendar__date {
  width: 100px;
  flex: 1 0 auto;
}
.calendar .calendar__weekdays {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  font-size: 11px;
  color: rgba(255,255,255,0.5)
}
.calendar .calendar__weekdays .calendar__weekday {
  width: 14.2%;
  flex: 1 0 auto;
  text-align: center;
}
.calendar .calendar__days {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 10px
}
.calendar .calendar__days .calendar__day {
  position: relative;
  flex: 0 0 auto;
  display: inline-block;
  width: 14.2%;
  margin: 3px 0;
  text-align: center;
  font-size: 12px;
  color: #fff
}
.calendar .calendar__days .calendar__day .sub {
  font-style: inherit;
  font-size: 10px;
  line-height: 14px;
  position: absolute;
  top: -5px;
  left: 20px;
  text-align: center;
  width: 14px;
  height: 14px;
  background: #fff;
  border-radius: 14px;
}
.calendar .calendar__days .calendar__day span {
  position: relative;
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
}
.calendar .calendar__days .calendar__day.calendar__day_now span {
  border-radius: 50%;
  background: rgba(0,0,0,0.6);
  color: #fff !important;
}
.calendar .calendar__days .calendar__day.calendar__day_selected span {
  border-radius: 50%;
  background: #f32a64;
  color: #fff !important;
}
.calendar .calendar__days .calendar__day.calendar__day_othermonth span {
  border-radius: 50%;
  color: #ccc;
}
.calendar .calendar__days .calendar__day.calendar__day_decorate {
  position: relative
}
.calendar .calendar__days .calendar__day.calendar__day_decorate:after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: 0;
  right: 0;
  margin: auto;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #eb4f04;
}
</style>
