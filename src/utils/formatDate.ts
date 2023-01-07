const month = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
]

export const formatDate = (dateString: string) => {
  // console.log(dateString.split('-').reverse().join('.'))
  return (
    month[Number(dateString.split('-')[1]) - 1] + ' ' + dateString.split('-')[0]
  )
}
