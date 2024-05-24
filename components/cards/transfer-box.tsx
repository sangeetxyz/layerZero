"use client";

import { abi } from "@/common/contract";
import { config } from "@/config/w3m";
import { env } from "@/env";
import { IsLoadingAtom } from "@/lib/atoms";
import { TTransferData } from "@/types/common";
import { simulateContract, writeContract } from "@wagmi/core";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAtom } from "jotai";
import { useState } from "react";
import { toast } from "sonner";
import { isAddress } from "viem";
import { useAccount } from "wagmi";
import ThemeButton from "../buttons/theme-button";

const TransferBox = () => {
  const { open } = useWeb3Modal();
  const { isConnected, address } = useAccount();
  const [, setIsLoading] = useAtom(IsLoadingAtom);
  const [transferData, setTransferData] = useState<TTransferData>({
    amount: {
      value: undefined,
      error: false,
    },
    to: {
      value: "",
      error: false,
    },
  });

  const handleTransfer = async () => {
    if (!transferData.amount.value || transferData.amount.value <= 0) {
      return setTransferData({
        ...transferData,
        amount: {
          ...transferData.amount,
          error: true,
        },
      });
    }
    if (!isAddress(transferData.to.value)) {
      return setTransferData({
        ...transferData,
        to: {
          ...transferData.to,
          error: true,
        },
      });
    }
    if (isConnected && address) {
      try {
        setIsLoading(true);
        const { request: approveRequest } = await simulateContract(config, {
          abi,
          address: env.NEXT_PUBLIC_CONTRACT_ADDRESS,
          chainId: Number(env.NEXT_PUBLIC_CHAIN_ID),
          functionName: "approve",
          args: [
            transferData.to.value,
            BigInt(transferData.amount.value * 10 ** 18),
          ],
        });
        const approveResult = await writeContract(config, approveRequest);

        const { request: transferFromRequest } = await simulateContract(
          config,
          {
            abi,
            address: env.NEXT_PUBLIC_CONTRACT_ADDRESS,
            chainId: Number(env.NEXT_PUBLIC_CHAIN_ID),
            functionName: "transferFrom",
            args: [
              address,
              transferData.to.value,
              BigInt(transferData.amount.value * 10 ** 18),
            ],
          }
        );

        const transferFromResult = await writeContract(
          config,
          transferFromRequest
        );
        if (!!transferFromResult) {
          setIsLoading(false);
          toast.success("Funds Transferred Successfully");
        }
      } catch (error) {
        setIsLoading(false);
        toast.error("Error Transferring Funds");
      }
    } else {
      open();
    }
  };

  return (
    <div className="flex shadow-[0_0px_70px_rgba(8,_112,_184,_0.8)] w-80 sm:w-[28rem] shadow-[#002aff95] bg-black flex-col p-6 space-y-6 bg-opacity-55 rounded-3xl">
      <div>Transfer</div>
      <div className="bg-gradient-to-r from-blue-800 rounded-2xl to-pink-600 p-[1px] w-full">
        <div className="w-full h-full pb-1 space-y-2 rounded-2xl bg-[#171717] flex flex-col p-4">
          <div className="text-xs text-zinc-600 font-bold">
            Total Amount to Transfer
          </div>
          <input
            type="number"
            value={transferData.amount.value}
            onChange={(e) => {
              setTransferData({
                ...transferData,
                amount: {
                  value: parseFloat(e.target.value),
                  error: false,
                },
              });
            }}
            className="bg-transparent text-5xl focus:outline-none"
            placeholder="0"
            step={0.001}
          />
        </div>
      </div>
      {transferData.amount.error && (
        <div className="text-red-700 text-xs">Invalid Amount</div>
      )}
      <div className="bg-gradient-to-r from-blue-800 rounded-2xl to-pink-600 p-[1px] w-full">
        <div className="w-full h-full pb-1 space-y-2 rounded-2xl bg-[#171717] flex flex-col p-4">
          <div className="text-xs text-zinc-600 font-bold">User Address</div>
          <input
            type="text"
            value={transferData.to.value}
            onChange={(e) => {
              setTransferData({
                ...transferData,
                to: {
                  value: e.target.value,
                  error: false,
                },
              });
            }}
            className="bg-transparent text-5xl focus:outline-none"
            placeholder="0x"
          />
        </div>
      </div>
      {transferData.to.error && (
        <div className="text-red-500 text-xs">Invalid Address</div>
      )}
      <ThemeButton
        onClick={() => {
          handleTransfer();
        }}
        text={isConnected ? "Transfer" : "Connect Wallet"}
        icon="wallet"
      />
    </div>
  );
};

export default TransferBox;
