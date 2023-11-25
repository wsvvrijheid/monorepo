export const getSku = (id: number) => {
  const year = new Date().getFullYear()
  const paddedId = id.toString().padStart(3, '0')

  return `W${year}-${paddedId}`
}
