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

const request = (url) => {
  return fetch(url)
  .then(checkStatus)
  .then(parseJSON)
  .catch(function(error) {
    console.log('request failed', error)
  })
}

const Path = '/topdata'

export const getTopByTimeId = () => {
  return request(`${Path}/getTopByTimeId?timeId=${timeId}`)
  .then(function(data) {
    return data.data
  })
}
export const getTopDetail = (id) => {
  return request(`${Path}/getTopDetail?id=${id}`)
  .then(function(data) {
    return data
  })
}
export const getTopHistory = ({mac, type, time}) => {
  return request(`${Path}/getTopHistory?mac=${mac}&type=${type}&time=${time}`)
  .then(function(data) {
    return data.data
  })
}
// city=上海 time=2017-03-30 10:19:07 type=hour
export const getStationHistory = () => {
  return request('/station/getStationHistory')
  .then(function(data) {
    console.log('request succeeded with JSON response', data)
  })
}


