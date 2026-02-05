import { EntityBase } from "src/common/base/entity.type.base";

export type OtpPreferenceUser = 'sms' | 'email';

export type User = {
    name: string;
    surname: string;
    email: string;
    identify: string;
    numberPhone: string;

    otpPreference: OtpPreferenceUser;
} & EntityBase;