"use client";

import Background from "@/components/global/background";
import Navbar from "@/components/global/navbar";
import Tabs from "@/components/global/tabs";
import { IsLoadingAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import TransactionSection from "@/components/transaction-section";
import Loader from "@/components/global/loader";
import BridgeBox from "@/components/cards/bridge-box";

const Bridge = () => {
  const [isLoading] = useAtom(IsLoadingAtom);
  return (
    <div className="h-screen overflow-hidden">
      <Background />
      <div className="absolute top-0 left-0 w-full h-full">
        <Navbar />
        <div className="flex flex-col px-4 items-center pt-40 mb-40 space-y-6 h-full overflow-auto">
          <Tabs />
          <BridgeBox />
          <TransactionSection />
        </div>
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default Bridge;
