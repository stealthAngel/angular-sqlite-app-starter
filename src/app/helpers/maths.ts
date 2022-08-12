export function calculatePercentage(partialValue: number, totalValue: number): number {
  let x: number = (100 * partialValue) / totalValue;
  return !isNaN(x) ? parseFloat(x.toFixed(2)) : 0;
}