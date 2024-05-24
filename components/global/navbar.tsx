"use client";

import { useWeb3Modal } from "@web3modal/wagmi/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import ThemeButton from "../buttons/theme-button";
import { useAccount } from "wagmi";
import { formatAddress } from "@/lib/utils";

const Navbar = () => {
  const router = useRouter();
  const { open } = useWeb3Modal();
  const { isConnected, address } = useAccount();
  return (
    <div className="h-20 absolute top-0 left-0 w-full flex items-center justify-between p-6">
      <Image
        className="cursor-pointer"
        onClick={() => router.push("/")}
        src="/logo.png"
        alt="logo"
        width={40}
        height={40}
      />
      <ThemeButton
        icon={isConnected ? "online" : "wallet"}
        text={
          isConnected && address ? formatAddress(address) : "Connect Wallet"
        }
        onClick={() => {
          open();
        }}
      ></ThemeButton>
    </div>
  );
};

export default Navbar;
