export function formatDate (val) {
  if (!val) return
  let date = new Date(val)
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}
