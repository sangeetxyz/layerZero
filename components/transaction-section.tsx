import { TTransactionData } from "@/types/common";
import TransactionCard from "./cards/transaction-card";

const TransactionSection = () => {
  const fakeTransaction: TTransactionData = {
    id: "0x1059Ed65AD58ffc83642C9Be3f24C250905a28F",
    from: "0x1059Ed65AD58ffc83642C9Be3f24C250905a28FB",
    to: "0x1059Ed65AD58ffc83642C9Be3f24C250905a28FB",
    time: new Date(),
    network: 1,
    amount: 0.1,
    symbol: "ETH",
  };
  return (
    <div className="flex flex-col w-full max-w-xl space-y-4 pb-12">
      <div>Transactions</div>
      <div className="w-full flex space-y-4 flex-col bg-[#0F0F0F] bg-opacity-90 p-4 rounded-lg">
        {/* header */}
        <div className="flex items-center uppercase text-blue-700">
          <div className="w-full text-center">transaction id</div>
          <div className="w-full text-center">transfer amount</div>
          <div className="w-full text-center">time</div>
        </div>
        {/* body */}
        {Array.from({ length: 5 }).map((_, i) => (
          <TransactionCard transaction={fakeTransaction} key={i} />
        ))}
      </div>
    </div>
  );
};

export default TransactionSection;
