export function minorFromDate (datetime) {
  const year = (datetime.getFullYear() % 100) * 10000
  const month = (datetime.getMonth() + 1) * 100
  const day = datetime.getDate()

  return `${year + month + day}`
}

export function patchFromDate (datetime) {
  const hour = datetime.getHours() * 10000
  const minute = datetime.getMinutes() * 100
  const second = datetime.getSeconds()

  return `${hour + minute + second}`
}
