export const crudsTest = (cruds: string) => {
  const crudsRegex = /([c-][r-][u-][d-][s-])/g
  return crudsRegex.test(cruds)
}

