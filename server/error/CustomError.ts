interface Error {
    status: number;
    message: string;

}


class CustomError extends Error {
  status = 400;

  constructor(status: number, message: string) {
    super(message);

    this.status = status;

    // 👇️ because we are extending a built-in class
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  getErrorMessage() {
    return 'Something went wrong: ' + this.message;
  }
}

module.exports = CustomError

/// https://bobbyhadz.com/blog/typescript-property-status-does-not-exist-on-type-errorhttps://bobbyhadz.com/blog/typescript-property-status-does-not-exist-on-type-error
 /*
export class CustomError extends Error {
  status = 400;

  constructor(status: number, message: string) {
    super(message);

    this.status = status;

    // 👇️ because we are extending a built-in class
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  getErrorMessage() {
    return 'Something went wrong: ' + this.message;
  }
}

const err = new CustomError(500, 'Something went wrong');

console.log(err.status); // 👉️ 500
console.log(err.message); // 👉️ "Something went wrong"v
 */