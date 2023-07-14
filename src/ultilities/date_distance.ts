export {};

declare global {
  interface String {
    formatAsDate(): string;
  }
}

String.prototype.formatAsDate = function (this: string ){
  const date = new Date(this)
  return date.toLocaleDateString()
}