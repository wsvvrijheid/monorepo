export const getReferenceModel = model => {
  if (!model) return null

  const original = model.localizations?.reduce((acc, cur) => {
    if (cur.id < acc.id) return cur
    else return acc
  }, model)

  return original
}
