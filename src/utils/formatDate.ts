export const formatDate = (dateString: string) => {
  return dateString.split('-').reverse().join('.')
}
