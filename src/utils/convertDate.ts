export const convertDate = (dateString: string) => {
  const date = new Date(dateString.replace(/-/g, '/').replace(/[TZ]/g, ' '))

  const currentTime = new Date(Date.now())
  const hoursOffset = Number(
    currentTime
      .toString()
      .split(' ')
      .filter((el) => el.startsWith('GMT'))[0]
      .slice(3, -2)
  )

  const dateArray = date.toLocaleString().slice(0, -3).split(', ')

  const localHours = (Number(dateArray[1].split(':')[0]) + hoursOffset) % 24

  const localDateArray = date.toLocaleString().slice(0, -3).split(', ')
  localDateArray[1] = localHours.toString() + ':' + dateArray[1].split(':')[1]

  return localDateArray.join(' в ')
}
