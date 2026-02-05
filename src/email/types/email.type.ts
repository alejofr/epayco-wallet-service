export type LangEmail = 'en' | 'es';

export type ParamEmail = {
    template: string;
    lang: LangEmail;
}

export type ParamSendEmail = {
    from: string;
    to: string;
    subject: string;
}