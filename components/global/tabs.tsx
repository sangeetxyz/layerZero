import React, { useEffect } from "react";
import TabButton from "../buttons/tab-button";
import { ECurrentTab } from "@/types/common";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAtom } from "jotai";
import { CurrentTabAtom } from "@/lib/atoms";

const Tabs = () => {
  const path = usePathname();
  const [, setCurrentTab] = useAtom(CurrentTabAtom);

  useEffect(() => {
    setCurrentTab(
      path === "/transfer" ? ECurrentTab.TRANSFER : ECurrentTab.BRIDGE
    );
  }, [path]);

  return (
    <div className="flex items-center">
      <TabButton tab={ECurrentTab.TRANSFER} />
      <Image
        src={"/icons/line.svg"}
        alt="line"
        width={100}
        height={10}
        className="w-20 h-2"
      />
      <TabButton tab={ECurrentTab.BRIDGE} />
    </div>
  );
};

export default Tabs;
