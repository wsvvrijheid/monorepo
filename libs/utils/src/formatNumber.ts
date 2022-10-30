export const formatNumber = (num: number): string | undefined => {
  // TODO: Check for options
  return Intl.NumberFormat('en').format(num)
}
