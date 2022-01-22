import { Body, Controller, Post } from '@nestjs/common';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { QiniuService } from '../../common/services/qiniu.service';
import { BusinessException, SuccessResponse } from 'src/utils/response';
import { validateRequest } from '../../utils/sign';
import { getFileKey } from '../../utils/hash';

class GetUploadTokenBody {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
  @IsNumber()
  timestamp: number;
  @IsNotEmpty()
  sign: string;
}

@Controller('userData')
export class UserDataController {
  constructor(private qiniuService: QiniuService) {}

  @Post('getUploadToken')
  getUploadToken(@Body() body: GetUploadTokenBody) {
    const { username, password, timestamp, sign } = body;
    // validate request first
    try {
      validateRequest({
        data: {
          username,
          password,
        },
        timestamp,
        sign,
      });
    } catch (err) {
      throw new BusinessException(err.message, -100, 400);
    }
    // get and return the upload key
    return new SuccessResponse({
      upload_token: this.qiniuService.getUploadToken(`userData/${getFileKey(username, password)}`),
    });
  }
}
