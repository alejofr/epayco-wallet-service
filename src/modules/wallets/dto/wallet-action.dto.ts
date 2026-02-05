import { IsNotEmpty, IsString, IsNumber, IsPositive } from "class-validator";

export class InfoBaseWalletActionDto {
    @IsString()
    @IsNotEmpty()
    numberPhone: string;

    @IsString()
    @IsNotEmpty()
    identify: string;
}

export class RechargeWalletByUserInfoDto extends InfoBaseWalletActionDto {
    @IsNumber()
    @IsPositive()
    amount: number;
}

export class PaymentWalletByUserInfoDto extends InfoBaseWalletActionDto {
    @IsNumber()
    @IsPositive()
    amount: number;
}

export class RequestPaymentDto extends InfoBaseWalletActionDto {
    @IsNumber()
    @IsPositive()
    amount: number;
}

export class ConfirmPaymentDto {
    @IsString()
    @IsNotEmpty()
    sessionId: string;

    @IsString()
    @IsNotEmpty()
    token: string;
}