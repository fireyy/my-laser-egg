export const formatTime = _ => {
  return new Date().setHours(_, 0, 0, 0)
}

export const nowTime = _ => {
  return new Date().toLocaleString('zh-CN', {hour12: false, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit"}).replace(/\//g, '-')
}

export const am0Time = _ => {
  return new Date(formatTime(0)).toLocaleString('zh-CN', {hour12: false, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit"}).replace(/\//g, '-')
}

export const formatDate = _ => {
  let d = _.split("-")
  return new Date().setMonth(d[0] - 1, d[1])
}
