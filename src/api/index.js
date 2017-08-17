// this is aliased in webpack config based on server/client build
import { createAPI } from 'create-api'

const logRequests = !!process.env.DEBUG_API
const LASER_EGG_UDID = process.env.LASER_EGG_UDID

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

const api = createAPI()

// warm the front page cache every 15 min
// make sure to do this only once across all requests
// if (api.onServer) {
//   warmCache()
// }

// function warmCache () {
//   fetchItems((api.cachedIds.top || []).slice(0, 30))
//   setTimeout(warmCache, 1000 * 60 * 15)
// }

function fetch (child) {
  logRequests && console.log(`fetching ${child}...`)
  const cache = api.cachedData
  if (cache && cache.has(child)) {
    logRequests && console.log(`cache hit for ${child}.`)
    return Promise.resolve(cache.get(child))
  } else {
    return api(child)
    .then(checkStatus)
    .then(parseJSON)
    .then((res) => {
      // mark the timestamp when this item is cached
      if (res) res.__lastUpdated = Date.now()
      cache && cache.set(child, res)
      logRequests && console.log(`fetched ${child}.`)
      return res
    })
    .catch(function(error) {
      console.log('request failed', error)
    })
  }
}

export const getTopByTimeId = () => {
  return fetch(`/topdata/getTopByTimeId?timeId=${LASER_EGG_UDID}`)
  .then(function(data) {
    logRequests && console.log('getTopByTimeId', data)
    return data.data
  })
}
export const getTopDetail = (id) => {
  return fetch(`/topdata/getTopDetail?id=${id}`)
  .then(function(data) {
    logRequests && console.log('getTopDetail', data)
    return data
  })
}
export const getTopHistory = ({mac, type, time}) => {
  return fetch(`/topdata/getTopHistory?mac=${mac}&type=${type}&time=${time}`)
  .then(function(data) {
    logRequests && console.log('getTopHistory', data)
    return data.data
  })
}
// city=上海 time=2017-03-30 10:19:07 type=hour
export const getStationHistory = () => {
  return fetch('/station/getStationHistory')
  .then(function(data) {
    logRequests && console.log('getStationHistory', data)
    return data
  })
}
