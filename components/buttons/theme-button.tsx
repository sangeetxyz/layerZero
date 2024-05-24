"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ThemeButton = ({
  text,
  icon,
  route,
  onClick,
}: {
  text: string;
  icon?: string;
  route?: string;
  onClick?: () => void;
}) => {
  const router = useRouter();
  return (
    <motion.button
      onClick={() => {
        !!route && router.push(`/${route}`);
        !!onClick && onClick();
      }}
      style={{
        backgroundImage: "linear-gradient(90deg, #0029FF, #000000)",
      }}
      whileHover={{
        backgroundImage: "linear-gradient(270deg, #0029FF, #000000)",
      }}
      transition={{
        duration: 0.5,
      }}
      className="h-10 px-5 rounded-full justify-center flex items-center space-x-2"
    >
      {!!icon && (
        <Image
          src={`/icons/${icon}.svg`}
          alt={icon}
          width={20}
          height={20}
          className="h-4"
        />
      )}

      <div className="font-bold text-sm whitespace-nowrap">{text}</div>
    </motion.button>
  );
};

export default ThemeButton;
