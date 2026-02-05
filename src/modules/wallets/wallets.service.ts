import { Injectable } from '@nestjs/common';
import { TransactionsRepository } from 'src/modules/transactions/repository';
import { UserRepository } from 'src/modules/users/repository';
import { OtpService } from 'src/otp/otp.service';
import { formatEmailForDisplay } from 'src/common/utils';


import { WalletsRepository } from './repository';
import {
  ConfirmPaymentDto,
  InfoBaseWalletActionDto,
  RechargeWalletByUserInfoDto,
  RequestPaymentDto
} from './dto/wallet-action.dto';


@Injectable()
export class WalletsService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly walletRepository: WalletsRepository,
    private readonly transactionRepository: TransactionsRepository,
    private readonly otpService: OtpService
  ) { }

  async getBalanceWallet({ identify }: InfoBaseWalletActionDto) {
    const user = await this.userRepository.findOne({ identify });

    return await this.walletRepository.findOne({ userId: user._id.toString() });
  }

  async rechargeWallet({ identify, amount }: RechargeWalletByUserInfoDto) {
    const user = await this.userRepository.findOne({ identify });
    const wallet = await this.walletRepository.findOne({ userId: user._id.toString() });

    wallet.amount += amount;
    await this.walletRepository.updateByEntity(wallet);

    await this.transactionRepository.create({
      amount,
      type: 'recharge',
      walletId: wallet._id.toString()
    })

    return {
      ok: true,
      wallet
    }
  }

  private checkSufficiencyBalance(walletAmount: number, amount: number) {
    if (walletAmount < amount) {
      return {
        ok: false,
        message: 'Insufficient balance'
      }
    }
    return null;
  }

  async requestPayment({ identify, amount }: RequestPaymentDto) {
    const user = await this.userRepository.findOne({ identify });
    const wallet = await this.walletRepository.findOne({ userId: user._id.toString() });

    const validation = this.checkSufficiencyBalance(wallet.amount, amount);
    if (validation) return validation;

    const otp = await this.otpService.otpUser(user.email, {
      typeOtp: 'verify-transaction',
      metadata: { amount, walletId: wallet._id.toString() }
    });

    if (!otp.ok) {
      return otp;
    }

    return {
      ok: true,
      message: `Token sent to`,
      emailStr: formatEmailForDisplay(user.email),
      sessionId: otp.sessionId
    }
  }

  async confirmPayment({ sessionId, token }: ConfirmPaymentDto) {
    const otp = await this.otpService.validateOtpContext(sessionId, token);

    if (!otp) {
      return {
        ok: false,
        message: 'Invalid or expired token'
      }
    }

    const { amount, walletId } = otp.metadata;

    const wallet = await this.walletRepository.findOne({ _id: walletId });

    const validation = this.checkSufficiencyBalance(wallet.amount, amount);
    if (validation) return validation;

    wallet.amount -= amount;

    if (wallet.amount < 0) wallet.amount = 0;

    await this.walletRepository.updateByEntity(wallet);

    await this.transactionRepository.create({
      amount,
      type: 'payment',
      walletId
    });

    await this.otpService.invalidateOtp(sessionId, token);

    return {
      ok: true,
      message: 'Payment confirmed'
    }
  }
}
