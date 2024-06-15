class AppError extends Error {
  public statusCode: number;
  constructor(statusCode: number, message: string, stack = '') {
    super(message);
    this.statusCode = statusCode;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;













// class AppError extends Error {
//   public status: string;
//   public isOperational: boolean;

//   constructor(message: string, public statusCode: number) {
//     super(message);

//     this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
//     this.isOperational = true;

//     Error.captureStackTrace(this, this.constructor);
//   }
// }

// export default AppError;
