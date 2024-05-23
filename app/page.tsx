"use client";

import Image from "next/image";
import ThemeButton from "@/components/theme-button";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="h-screen relative anybody">
      <Image
        src="/background.jpg"
        alt="Background"
        fill
        className="object-cover brightness-50"
        priority
        quality={100}
      />
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <div className="flex flex-col text-[8vw] relative w-fit ">
          <div className="text-8x whitespace-nowrap leading-none">
            Welcome to
          </div>
          <div className="font-bold whitespace-nowrap leading-none">
            NeoBase Coding
          </div>
          <div className="font-bold leading-none">Round</div>
          <div className="flex justify-center z-10">
            <ThemeButton text="Get Started" icon="arrow_circle_right" />
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
          <Image
            src={"/coin.png"}
            alt="Coin"
            quality={100}
            width={500}
            height={500}
            className="w-[10vw] aspect-square relative left-[17vw]"
          />
          <Image
            src={"/coin2.png"}
            alt="Coin"
            quality={100}
            width={500}
            height={500}
            className="w-[6vw] aspect-square relative top-[4vw] left-[6vw]"
          />
          <Image
            src={"/secure.png"}
            alt="Coin"
            quality={100}
            width={500}
            height={500}
            className="w-[10vw] aspect-square right-[20vw] relative top-[5vw]"
          />
        </div>
      </div>
    </main>
  );
}
