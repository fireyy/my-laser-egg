import { formatTime, formatDate } from '../utils'

export default {
  SET_LOADING: (state, { data }) => {
    state.loading = data
  },
  SET_LASER_INFO: (state, { data }) => {
    state.id = data.id
    state.mac = data.mac
  },
  SET_NOW_DATA: (state, { data }) => {
    state.now = data
  },
  SET_TODAY_DATA: (state, { data }) => {
    if (!data) data = []
    if (data.length > 24) data.pop()
    let arr = data.map(_ => {
      return {
        time: formatTime(_.time),
        pm25: _.pm25
      }
    })
    state.today = arr
  },
  SET_RECENT_DATA: (state, { data }) => {
    let recent = data.map(_ => {
      return {
        time: formatDate(_.time),
        pm25: _.pm25
      }
    })
    state.recent = recent
  }
}
