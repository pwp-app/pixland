import { Controller, Post } from '@nestjs/common';

@Controller('userData')
export class UserDataController {
  @Post()
  getUploadToken() {}
}
