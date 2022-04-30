export class CustomError extends Error {
  constructor(message: string) {
    super(message);
  }
  log() {
    console.error(`${this.name} occured ${this.message} at ${this.stack}`);
  }
}
