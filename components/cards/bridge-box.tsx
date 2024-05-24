"use client";

import { abi } from "@/common/contract";
import { config } from "@/config/w3m";
import { env } from "@/env";
import { IsLoadingAtom } from "@/lib/atoms";
import { TBridgeData, TTransferData } from "@/types/common";
import { simulateContract, writeContract } from "@wagmi/core";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAtom } from "jotai";
import { useState } from "react";
import { toast } from "sonner";
import { useAccount, useBalance } from "wagmi";
import ThemeButton from "../buttons/theme-button";
import { encodePacked, formatEther, isAddress } from "viem";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BridgeBox = () => {
  const { open } = useWeb3Modal();
  const { isConnected, address } = useAccount();
  const [, setIsLoading] = useAtom(IsLoadingAtom);
  const [bridgeData, setBridgeData] = useState<TBridgeData>({
    from: {
      value: undefined,
      error: false,
    },
    to: {
      value: "",
      error: false,
    },
  });

  const handleBridge = async () => {
    if (!bridgeData.from.value || bridgeData.from.value <= 0) {
      console.log("error");
      return setBridgeData({
        ...bridgeData,
        from: {
          ...bridgeData.from,
          error: true,
        },
      });
    }
    if (!isAddress(bridgeData.to.value)) {
      return setBridgeData({
        ...bridgeData,
        to: {
          ...bridgeData.to,
          error: true,
        },
      });
    }
    if (isConnected && address) {
      try {
        setIsLoading(true);

        const adapterParams = encodePacked(
          ["uint16", "uint256"],
          [1, BigInt("1000000")]
        );

        const { request: transferFromRequest } = await simulateContract(
          config,
          {
            abi,
            address: env.NEXT_PUBLIC_CONTRACT_ADDRESS,
            chainId: Number(env.NEXT_PUBLIC_CHAIN_ID),
            functionName: "sendFrom",
            args: [
              address,
              42161,
              bridgeData.to.value,
              BigInt(bridgeData.from.value),
              {
                refundAddress: address,
                adapterParams,
                zroPaymentAddress: "0x0000000000000000000000000000000000000000",
              },
            ],
          }
        );

        const sendFromResult = await writeContract(config, transferFromRequest);

        if (!!sendFromResult) {
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

  const { data } = useBalance({
    address: address,
    chainId: 137,
  });

  return (
    <div className="flex shadow-[0_0px_70px_rgba(8,_112,_184,_0.8)] w-80 sm:w-[28rem] shadow-[#002aff95] bg-black flex-col p-6 space-y-6 bg-opacity-55 rounded-3xl">
      <div>Transfer</div>
      <Select>
        <SelectTrigger className="bg-zinc-900 rounded-xl w-fit space-x-2">
          <Image
            src="/icons/ethereum.svg"
            alt="ethereum"
            width={20}
            height={20}
            className="w-4 aspect-square"
          />
          <SelectValue placeholder="Select Token" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Token 1</SelectItem>
          <SelectItem value="2">Token 2</SelectItem>
          <SelectItem value="3">Token 3</SelectItem>
        </SelectContent>
      </Select>

      <div className="bg-gradient-to-r from-blue-800 rounded-2xl to-pink-600 p-[1px] w-full">
        <div className="w-full h-full relative pb-1 space-y-2 rounded-2xl bg-[#171717] flex flex-col p-4">
          <div className="flex space-x-3 items-center">
            <div className="text-xs text-zinc-600 font-bold">From</div>
            <div className="bg-zinc-950 rounded-full px-2 pt-1 pb-0.5 text-zinc-400 text-xs">
              Polygon
            </div>
          </div>
          <input
            type="number"
            value={bridgeData.from.value}
            onChange={(e) => {
              setBridgeData({
                ...bridgeData,
                from: {
                  value: parseFloat(e.target.value),
                  error: false,
                },
              });
            }}
            className="bg-transparent text-5xl focus:outline-none"
            placeholder="0"
            step={0.001}
          />

          <div
            onClick={() => {
              setBridgeData({
                ...bridgeData,
                from: {
                  value: !!data ? parseFloat(formatEther(data.value)) : 0,
                  error: false,
                },
              });
            }}
            className="bg-zinc-50 absolute px-2 top-9 right-4 rounded text-xs text-zinc-950 uppercase cursor-pointer"
          >
            max
          </div>
        </div>
      </div>
      {bridgeData.from.error && (
        <div className="text-red-700 text-xs">Invalid Amount</div>
      )}

      <div className="text-sm text-zinc-300">
        Balance: {!!data ? formatEther(data.value) : 0}
      </div>
      <div className="flex justify-center">
        <Image
          src={"/icons/arrow_circle_down.svg"}
          alt="arrow"
          width={30}
          height={30}
          className="w-4 aspect-square"
        />
      </div>
      <div className="bg-gradient-to-r from-blue-800 rounded-2xl to-pink-600 p-[1px] w-full">
        <div className="w-full h-full pb-1 space-y-2 rounded-2xl bg-[#171717] flex flex-col p-4">
          <div className="flex space-x-3 items-center">
            <div className="text-xs text-zinc-600 font-bold">To</div>
            <div className="bg-zinc-950 rounded-full px-2 pt-1 pb-0.5 text-zinc-400 text-xs">
              Arbitrum
            </div>
          </div>
          <input
            type="text"
            value={bridgeData.to.value}
            onChange={(e) => {
              setBridgeData({
                ...bridgeData,
                to: {
                  value: e.target.value,
                  error: false,
                },
              });
            }}
            className="bg-transparent text-5xl focus:outline-none"
            placeholder="0x"
            step={0.001}
          />
        </div>
      </div>
      {bridgeData.to.error && (
        <div className="text-red-500 text-xs">Invalid Amount</div>
      )}

      <ThemeButton
        onClick={() => {
          handleBridge();
        }}
        text={isConnected ? "Transfer" : "Connect Wallet"}
        icon="wallet"
      />
    </div>
  );
};

export default BridgeBox;
