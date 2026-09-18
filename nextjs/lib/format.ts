// Indian digit grouping, matching how the figures are published (e.g. 20,00,000).
const numberFormat = new Intl.NumberFormat('en-IN')

export const formatNumber = (value: number) => numberFormat.format(value)
