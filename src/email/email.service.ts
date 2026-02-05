import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';
import { ResendService } from './resend/resend.service';
import { ParamEmail, ParamSendEmail } from './types/email.type';
import { processingByDataArr, processingByDataObj } from 'src/common/utils';

@Injectable()
export class EmailService {
    PATH_BASE_TEMPLATE: string = '../../emails';

    constructor(private readonly resendService: ResendService) { }

    async sendEmailByTemplateString({ from, to, subject, data, template, lang }: ParamEmail & ParamSendEmail & { data: object | object[] }) {
        const emailTemplate = await this.getEmailTemplate({ template, lang });
        const htmlString = this.processingByData(data, emailTemplate);

        return await this.resendService.sendEmails({
            from,
            to,
            subject,
            html: htmlString,
        });
    }

    private processingByData(data: object | object[], htmlString: string) {
        if (Array.isArray(data)) {
            return processingByDataArr(data, htmlString);
        }

        return processingByDataObj(data, htmlString);
    }

    private async getEmailTemplate({ template, lang = 'en' }: ParamEmail) {
        try {
            const filePath = join(__dirname, this.PATH_BASE_TEMPLATE, lang, template);

            return await fs.readFile(filePath, 'utf-8');
        } catch (error) {
            throw new Error(`Error in get template: ${template} by error ${JSON.stringify(error)}`);
        }
    }
}
