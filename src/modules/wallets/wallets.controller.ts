import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WalletsService } from './wallets.service';


import { InfoBaseWalletActionDto, RechargeWalletByUserInfoDto } from './dto/wallet-action.dto';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) { }

  @Post('recharge')
  rechargeWallet(@Body() dto: RechargeWalletByUserInfoDto) {
    return this.walletsService.rechargeWallet(dto);
  }

  @Post('balance')
  getBalance(@Body() dto: InfoBaseWalletActionDto) {
    return this.walletsService.getBalanceWallet(dto);
  }
}
