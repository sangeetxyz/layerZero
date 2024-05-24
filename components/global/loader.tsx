import Image from "next/image";
import Background from "./background";

const Loader = () => {
  return (
    <div className="w-full h-full fixed top-0 left-0 flex items-center justify-center">
      <Background />
      <div className="absolute space-y-4 top-0 flex flex-col items-center justify-center left-0 w-full h-full">
        <Image
          src={"/loader.png"}
          width={500}
          height={500}
          alt="loader"
          className="animate-spin w-[14vw] aspect-square"
        />
        <div className="text-sm text-zinc-300">Please wait</div>
      </div>
      {/* <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div> */}
    </div>
  );
};

export default Loader;
