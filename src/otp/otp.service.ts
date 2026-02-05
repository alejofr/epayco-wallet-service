import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomInt } from 'crypto';
import moment from 'moment';


import { formatEmailForDisplay } from 'src/common/utils';
import { EmailService } from 'src/email/email.service';
import { LangEmail } from 'src/email/types/email.type';
import { OtpRepository } from './repository';
import { OtpEntity, OtpDocument } from './entity';
import { TypeOtp } from './types';


@Injectable()
export class OtpService {
    fromEmail: string;

    constructor(
        private readonly otpRepository: OtpRepository,
        private readonly emailService: EmailService,
        private readonly config: ConfigService
    ) {
        this.fromEmail = this.config.getOrThrow('EMAIL_NOT_REPLY');
    }

    async otpUser(value: string, options?: { type?: 'email' | 'sms', lang?: LangEmail, typeOtp?: TypeOtp, metadata?: any }) {
        const type = options?.type || 'email';
        const typeOtp = options?.typeOtp || 'verify-email';
        const lang = 'en';


        const otp = await this.createOtp(value, { typeOtp, metadata: options?.metadata });
        const dataSend = await this.emailService.sendEmailByTemplateString({
            from: this.fromEmail,
            to: value,
            data: { code: otp.code },
            subject: 'Security Verification',
            template: 'otp-en.html',
            lang
        })

        if (dataSend?.error || !dataSend.ok) {
            await this.otpRepository.deleteById({ _id: otp._id });

            return {
                ok: false,
                errorSend: dataSend.error
            }
        }

        return {
            ok: true,
            message: formatEmailForDisplay(value),
            sessionId: otp._id.toString(),
            dataSend: dataSend.data
        }

    }

    async checkOtp(code: string, type: 'email' | 'sms' = 'email') {

        const otp = await this.attempt(code);

        if (otp) {
            await this.otpRepository.updateById({ _id: otp._id }, { active: false });

            return {
                ok: true,
                otp
            }
        }

        return {
            ok: false,
            otp: null
        }
    }


    private async attempt(
        code: string,
        isExpired: boolean = false,
    ): Promise<OtpDocument | false> {
        const otp = await this.otpRepository.findOne({ code, active: true });

        if (otp) {
            if (isExpired) {
                const now = moment().valueOf();
                if (now > otp.expire) {
                    return false;
                }
            }

            return otp;
        }

        return false;
    }

    private async createOtp(email: string, options?: { expireSeconds?: number; typeOtp?: TypeOtp; metadata?: any }) {
        const expireSeconds = options?.expireSeconds || 300;
        const typeOtp = options?.typeOtp || 'verify-email';
        const expire = this.defaultExpire(expireSeconds);

        return await this.otpRepository.create({
            email,
            expire,
            typeOtp,
            code: this.generateOtp(),
            metadata: options?.metadata
        });
    }

    async validateOtpContext(sessionId: string, code: string) {
       try {
            const otp = await this.otpRepository.findOne({ _id: sessionId, code, active: true });

            if (otp && moment().valueOf() <= otp.expire) {
                return otp;
            }
            
            return null;
       } catch (error) {
            return null;
       }
    }

    async invalidateOtp(sessionId: string, code: string) {
        return await this.otpRepository.updateById({ _id: sessionId, code }, { active: false });
    }

    private defaultExpire(expireSeconds: number): number {
        const now = moment();
        return now.add(expireSeconds, 'seconds').valueOf();
    }

    private generateOtp(): string {
        return randomInt(100000, 999999).toString();
    }

}
