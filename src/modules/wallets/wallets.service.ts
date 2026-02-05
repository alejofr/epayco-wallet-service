import { Injectable } from '@nestjs/common';
import { TransactionsRepository } from 'src/modules/transactions/repository';
import { UserRepository } from 'src/modules/users/repository';


import { WalletsRepository } from './repository';
import { InfoBaseWalletActionDto, RechargeWalletByUserInfoDto } from './dto/wallet-action.dto';


@Injectable()
export class WalletsService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly walletRepository: WalletsRepository,
    private readonly transactionRepository: TransactionsRepository
  ) { }

  async getBalanceWallet({ identify }: InfoBaseWalletActionDto){
    const user = await this.userRepository.findOne({ identify });

    return await this.walletRepository.findOne({ userId: user._id.toString() });
  }

  async rechargeWallet({ identify, amount }: RechargeWalletByUserInfoDto) {
    const user = await this.userRepository.findOne({ identify });
    const wallet = await this.changeAmountWallet(user._id.toString(), amount, 'add');

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

  async changeAmountWallet(userId: string, amount: number, type: 'add' | 'sub') {
    const wallet = await this.walletRepository.findOne({ userId });

    if (type === 'add') {
      wallet.amount += amount;
    } else if (type === 'sub') {
      wallet.amount -= amount;
    }

    return this.walletRepository.updateByEntity(wallet);
  }
}
