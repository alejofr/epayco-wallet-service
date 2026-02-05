import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ResendService } from './resend/resend.service';
import { EmailService } from './email.service';

@Module({
  providers: [ResendService, EmailService],
  imports: [ConfigModule],
  exports: [EmailService]
})
export class EmailModule {}
