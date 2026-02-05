import { EntityBase } from "src/common/base/entity.type.base";

export type Wallet = {
    amount: number;
    userId: string;
} & EntityBase;