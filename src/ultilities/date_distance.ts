export function formatDate(strDate: string ){
  const date = new Date(strDate)
  return date.toLocaleDateString()
}