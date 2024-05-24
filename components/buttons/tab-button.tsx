"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { CurrentTabAtom } from "@/lib/atoms";
import { ECurrentTab } from "@/types/common";
import { pink, purple } from "@/lib/constants";

const TabButton = ({
  onClick,
  tab,
}: {
  onClick?: () => void;
  tab: ECurrentTab;
}) => {
  const [currentTab, setCurrentTab] = useAtom(CurrentTabAtom);
  const [isHovering, setIsHovering] = useState(false);
  const router = useRouter();
  return (
    <motion.button
      onClick={() => {
        !!onClick && onClick();
        setCurrentTab(tab);
        router.push(`/${tab}`);
      }}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
      style={{
        backgroundImage: `linear-gradient(90deg, ${
          tab === currentTab ? purple : pink
        }, 
        ${tab === currentTab ? pink : purple}
        )`,
      }}
      whileHover={{
        backgroundImage: `linear-gradient(132.5deg, ${
          tab === currentTab ? pink : purple
        },
        ${tab === currentTab ? purple : pink}
        )`,
      }}
      transition={{
        duration: 0.25,
      }}
      className="h-8 px-3 rounded-full flex items-center space-x-1"
    >
      <AnimatePresence>
        {(tab === currentTab || isHovering) && (
          <motion.div
            initial={{
              scale: 0,
              opacity: 0,
              x: 20,
            }}
            animate={{
              scale: 1,
              x: 0,
              opacity: 1,
            }}
            exit={{
              scale: 0,
              x: 20,
              opacity: 0,
            }}
          >
            <Image
              src={`/icons/ellipse.svg`}
              alt={currentTab}
              width={20}
              height={20}
              className="h-2.5"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-sm whitespace-nowrap uppercase">{tab}</div>
    </motion.button>
  );
};

export default TabButton;
