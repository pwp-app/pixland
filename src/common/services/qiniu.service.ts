import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as qiniu from 'qiniu';

@Injectable()
export class QiniuService {
  private mac: qiniu.auth.digest.Mac;

  constructor(private configService: ConfigService) {
    const accessKey = configService.get<string>('QINIU_ACCESS_KEY')?.trim();
    const secretKey = configService.get<string>('QINIU_SECRET_KEY')?.trim();
    if (!accessKey) {
      throw new Error('Cannot get the access key.');
    }
    if (!secretKey) {
      throw new Error('Cannot get the secret key.');
    }
    this.mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  }

  public getUploadToken(key: string) {
    const bucket = this.configService.get<string>('QINIU_BUCKET');
    const tokenExpires = this.configService.get<string>('QINIU_TOKEN_EXPIRES');
    if (!bucket) {
      throw new Error('Cannot get the bucket name.');
    }
    const putPolicy = new qiniu.rs.PutPolicy({
      scope: `${bucket}:${key}`,
      expires: Number(tokenExpires) || 10,
      fsizeMin: 1,
      fsizeLimit: 10 * 1024 * 1024,
      mimeLimit: 'application/json',
    });
    return putPolicy.uploadToken(this.mac);
  }
}
