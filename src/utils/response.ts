import { HttpException, HttpStatus } from '@nestjs/common';

export class SuccessResponse {
  ret: number;
  data: unknown;
  err_msg = '';
  constructor(data?: unknown) {
    this.ret = 0;
    this.data = data;
  }
}

export class BusinessException extends HttpException {
  constructor(errorMessage: string, ret?: number, statusCode?: HttpStatus) {
    super({ ret, err_msg: errorMessage }, statusCode);
  }
}
