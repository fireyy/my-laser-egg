import {
  getTopByTimeId,
  getTopDetail,
  getTopHistory,
  getStationHistory
} from '../api'

export default {
  TOGGLE_LOADING: ({ commit, dispatch, state }, { type }) => {
    commit('SET_LOADING', { type })
  },
  GET_TOP_BY_TIME_ID: ({ commit, dispatch, state }) => {
    dispatch('TOGGLE_LOADING', { type: true })
    if (!state.id) {
      return getTopByTimeId()
      .then(data => {
        commit('SET_LASER_INFO', { data })
        return data
      })
    } else {
      return Promise.resolve({
        id: state.id,
        mac: state.mac
      })
    }
  },
  GET_TOP_DETAIL: ({ commit, dispatch, state }) => {
    return new Promise((resolve, reject) => {
      dispatch('GET_TOP_BY_TIME_ID').then(info => {
        getTopDetail(info.id)
        .then(data => {
          dispatch('TOGGLE_LOADING', { type: false })
          commit('SET_NOW_DATA', { data })
          resolve(data)
        }).catch(err => {
          dispatch('TOGGLE_LOADING', { type: false })
        })
      })
    })
  },
  GET_TOP_HISTORY: ({ commit, dispatch, state }, {type, time}) => {
    return new Promise((resolve, reject) => {
      dispatch('GET_TOP_BY_TIME_ID').then(info => {
        getTopHistory({
          mac: info.mac,
          type: type,
          time: time
        })
        .then(data => {
          dispatch('TOGGLE_LOADING', { type: false })
          if (type === 'day') {
            commit('SET_RECENT_DATA', { data })
          } else {
            commit('SET_TODAY_DATA', { data })
          }
          resolve(data)
        }).catch(err => {
          dispatch('TOGGLE_LOADING', { type: false })
        })
      })
    })
  },
  GET_STATION_HISTORY: ({ commit, dispatch, state }) => {
    return getStationHistory()
    .then(data => {
      // commit('SET_RECENT_DATA', { data })
      return data
    })
  }
}
