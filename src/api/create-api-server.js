import fetch from 'isomorphic-unfetch'
import LRU from 'lru-cache'

export function createAPI () {
  let api
  // this piece of code may run multiple times in development mode,
  // so we attach the instantiated API to `process` to avoid duplications
  if (process.__API__) {
    api = process.__API__
  } else {
    api = process.__API__ = function (child) {
      console.log('child', child)
      return fetch(`http://api-ios.origins-china.cn:8080${child}`)
    }

    api.onServer = true

    // fetched data cache
    api.cachedData = LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15 // 15 min cache
    })

    // // cache the latest story ids
    // api.cachedIds = {}
    // ;['top', 'new', 'show', 'ask', 'job'].forEach(type => {
    //   api.child(`${type}stories`).on('value', snapshot => {
    //     api.cachedIds[type] = snapshot.val()
    //   })
    // })
  }
  return api
}
