import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserDataModule } from './modules/userData/userData.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    UserDataModule,
  ],
})
export class AppModule {}
