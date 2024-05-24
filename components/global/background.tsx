import Image from "next/image";
import React from "react";

const Background = () => {
  return (
    <Image
      src="/background.jpg"
      alt="Background"
      fill
      className="object-cover brightness-50"
      priority
      quality={100}
    />
  );
};

export default Background;
