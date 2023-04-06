export function floorHourByQuarter (hour: number) {
  const roundedHour = Math.round(hour * 4)
  const dividedHour = roundedHour / 4
  return dividedHour
}
