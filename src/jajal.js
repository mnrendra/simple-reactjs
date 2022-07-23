const timeParser = (dt) => {
  const newDate = new Date(dt)
  const year = newDate.getFullYear()
  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][newDate.getMonth()]
  const date = newDate.getDate()
  const hour = newDate.getHours()
  const minute = newDate.getMinutes()
  const second = newDate.getSeconds()

  return `${date} ${month} ${year}, ${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second}`
}

export {
  timeParser
}
