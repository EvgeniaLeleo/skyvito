export const convertDate = (dateString: string) => {
  const date = new Date(dateString.replace(/-/g, '/').replace(/[TZ]/g, ' '))

  // return date.toLocaleString().slice(0, -3)
  return date.toLocaleString().slice(0, -3).split(',').join(' в')
}
