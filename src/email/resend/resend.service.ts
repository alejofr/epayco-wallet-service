import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateEmailOptions, CreateEmailRequestOptions, Resend } from 'resend';

@Injectable()
export class ResendService {
  private readonly resendClient: Resend;

  constructor(private readonly config: ConfigService) {
    const apiKey = this.config.getOrThrow('API_KEY_RESEND');
    this.resendClient = new Resend(apiKey);
  }

  async sendEmails(
    payload: CreateEmailOptions,
    options?: CreateEmailRequestOptions,
  ) {
    const { data, error } = await this.resendClient.emails.send(
      payload,
      options,
    );

    if (data) {
      return {
        ok: true,
        data,
      };
    }

    return {
      ok: false,
      error: error,
    };
  }
}
