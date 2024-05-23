"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const ThemeButton = ({ text, icon }: { text: string; icon?: string }) => {
  return (
    <motion.button
      style={{
        backgroundImage: "linear-gradient(90deg, #0029FF, #000000)",
      }}
      whileHover={{
        backgroundImage: "linear-gradient(270deg, #0029FF, #000000)",
      }}
      className="h-10 px-5 rounded-full text-sm whitespace-nowrap flex items-center space-x-2"
    >
      {icon && (
        <Image
          src={`/icons/${icon}.svg`}
          alt={icon}
          width={20}
          height={20}
          className="h-6"
        />
      )}

      <div>{text}</div>
    </motion.button>
  );
};

export default ThemeButton;
