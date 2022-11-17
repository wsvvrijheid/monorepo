export const truncateText = (text: string, maxLen: number) => {
  if (!text || typeof text !== 'string') return ''

  //trim the string to the maximum length
  const str = text.substring(0, maxLen - 5)

  //re-trim if we are in the middle of a word
  return str.substring(0, Math.min(str.length, str.lastIndexOf(' '))) + '...' + "\n\n"
}
