import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WalletsService } from './wallets.service';


import { ConfirmPaymentDto, InfoBaseWalletActionDto, RechargeWalletByUserInfoDto, RequestPaymentDto } from './dto/wallet-action.dto';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) { }

  @Post('balance')
  getBalance(@Body() dto: InfoBaseWalletActionDto) {
    return this.walletsService.getBalanceWallet(dto);
  }

  @Post('recharge')
  rechargeWallet(@Body() dto: RechargeWalletByUserInfoDto) {
    return this.walletsService.rechargeWallet(dto);
  }

  @Post('payment')
  requestPayment(@Body() dto: RequestPaymentDto) {
    return this.walletsService.requestPayment(dto);
  }

  @Post('otp/confirm-payment')
  confirmPayment(@Body() dto: ConfirmPaymentDto) {
    return this.walletsService.confirmPayment(dto);
  }
}
