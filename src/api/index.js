import { timeId } from '@/config'

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

const Path = '/topdata'

export const getTopByTimeId = () => {
  return fetch(`${Path}/getTopByTimeId?timeId=${timeId}`)
  .then(checkStatus)
  .then(parseJSON)
  .then(function(data) {
    return data.data
  }).catch(function(error) {
    console.log('request failed', error)
  })
}
export const getTopDetail = (id) => {
  return fetch(`${Path}/getTopDetail?id=${id}`)
  .then(checkStatus)
  .then(parseJSON)
  .then(function(data) {
    console.log('request succeeded with JSON response', data)
    return data
  }).catch(function(error) {
    console.log('request failed', error)
  })
}
export const getTopHistory = ({mac, type, time}) => {
  return fetch(`${Path}/getTopHistory?mac=${mac}&type=${type}&time=${time}`)
  .then(checkStatus)
  .then(parseJSON)
  .then(function(data) {
    return data.data
  }).catch(function(error) {
    console.log('request failed', error)
  })
}
// city=上海 time=2017-03-30 10:19:07 type=hour
export const getStationHistory = () => {
  return fetch('/station/getStationHistory')
  .then(checkStatus)
  .then(parseJSON)
  .then(function(data) {
    console.log('request succeeded with JSON response', data)
  }).catch(function(error) {
    console.log('request failed', error)
  })
}


