import fetch from 'isomorphic-unfetch'

export function createAPI () {
  let api = function (child) {
    return fetch(child)
  }
  return api
}
