import { TypeTransaction } from "src/modules/transactions/types/transactions.type";
import { OtpPreferenceUser } from "src/modules/users/types/user.type";

export const TYPE_OTP_USER: OtpPreferenceUser[] = ['sms', 'email'];
export const TYPE_TRANSACTION_WALLET: TypeTransaction[] = ['payment','recharge']