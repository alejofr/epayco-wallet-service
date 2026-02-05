import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailModule } from 'src/email/email.module';
import { OtpRepository } from './repository';
import { OtpService } from './otp.service';
import { OtpEntity, OtpSchema } from './entity';


@Module({
  providers: [OtpService, OtpRepository],
  imports: [MongooseModule.forFeature([{ name: OtpEntity.name, schema: OtpSchema }]), EmailModule, ConfigModule],
  exports: [OtpService]
})
export class OtpModule { }
