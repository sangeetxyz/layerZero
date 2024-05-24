import { TTransactionData } from "@/types/common";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { formatAddress, formatTime } from "@/lib/utils";

const TransactionCard = ({
  transaction,
}: {
  transaction: TTransactionData;
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isMounted, setisMounted] = useState(false);

  useEffect(() => {
    setisMounted(true);
  }, []);

  return (
    <motion.div
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
      className="flex flex-col space-y-6"
    >
      <motion.div
        initial={{
          height: "3.4rem",
        }}
        animate={{
          height: isHovering ? "5.4rem" : "3.4rem",
        }}
        className="bg-black rounded-lg p-4 w-full space-y-4 overflow-hidden"
      >
        <div className="flex items-center justify-between md:text-lg">
          <div className="w-full text-center">
            {formatAddress(transaction.id)}
          </div>
          <div className="w-full text-center">
            {transaction.amount} {transaction.symbol}
          </div>

          <div className="w-full text-center">
            {formatTime(transaction.time)}
          </div>
        </div>
        <div className="flex items-center justify-between text-xs md:text-sm">
          <div className="w-full justify-center items-center text-center flex space-x-1">
            <div className="uppercase text-[#FF00E1]">to</div>
            <div className="text-zinc-400">
              {formatAddress(transaction.from)}
            </div>
          </div>
          <div className="w-full text-center justify-center items-center flex space-x-1">
            <div className="uppercase text-[#FF00E1]">from</div>
            <div className="text-zinc-400">{formatAddress(transaction.to)}</div>
          </div>
          <div className="w-full text-center flex justify-center items-center space-x-1">
            <div className="uppercase text-[#FF00E1]">network</div>
            <div className="text-zinc-400">{transaction.network}</div>
          </div>
          {isMounted && (
            <div className="w-full text-center flex justify-center items-center space-x-1">
              <div className="uppercase text-[#FF00E1]">time</div>
              <div className="text-zinc-400">
                {transaction.time.toLocaleTimeString()}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TransactionCard;
