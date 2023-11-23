export const getSku = (id: number) => {
  let sku = ''
  const year = new Date().getFullYear()
  if (0 <= id && id <= 9) {
    sku = `W${year}-00${id}`

    return sku
  } else if (10 <= id && id <= 99) {
    sku = `W${year}-0${id}`

    return sku
  } else {
    sku = `W${year}-${id}`

    return sku
  }
}
