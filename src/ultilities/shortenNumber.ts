export {};

declare global {
  interface Number {
    shorten(): string;
  }
}

Number.prototype.shorten = function (this: number) {
  const units = ['K', 'M', 'B', 'T'];

  const absNumber = Math.abs(this);
  const unitIndex = Math.floor((absNumber.toFixed(0).length - 1) / 3);
  let shortenedNumber = (this / Math.pow(1000, unitIndex)).toFixed(1);

  if (unitIndex > 0) {
    shortenedNumber += units[unitIndex - 1];
  }

  if (shortenedNumber.endsWith('.0')) {
    shortenedNumber = parseInt(shortenedNumber).toString();
  }

  return shortenedNumber;
};
