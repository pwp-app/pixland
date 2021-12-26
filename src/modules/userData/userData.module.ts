import { Module } from '@nestjs/common';
import { QiniuService } from '../../common/services/qiniu.service';
import { UserDataController } from './userData.controller';

@Module({
  controllers: [UserDataController],
  providers: [QiniuService],
})
export class UserDataModule {}
