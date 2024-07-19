export function checkNumber(number: string): boolean {
  const regex = /^-?\d+$/;
  return regex.test(number);
}

export function randomNumber(length: number): number {
  const min: number = Number.parseInt(`1`.padEnd(length, '0'));
  const max: number = Number.parseInt(`9`.padEnd(length, '9'));
  return this.randomInRange(min, max);
}

export function randomNumberInRange(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
