import { Address } from "viem";

export enum ECurrentTab {
  TRANSFER = "transfer",
  BRIDGE = "bridge",
}

export type TTransactionData = {
  id: Address;
  from: Address;
  to: Address;
  time: Date;
  network: number;
  amount: number;
  symbol: string;
};

export type TTransferData = {
  to: {
    value: string | Address;
    error: boolean;
  };
  amount: {
    value: number | undefined;
    error: boolean;
  };
};

export type TBridgeData = {
  from: {
    value: number | undefined;
    error: boolean;
  };
  to: {
    value: string | Address;
    error: boolean;
  };
};
