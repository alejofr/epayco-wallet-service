export type TypeTransaction = 'recharge' | 'payment';

export type Transaction = {
    amount:         number;
    type:           TypeTransaction;
    walletId:       string;
}