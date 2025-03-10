"use client";

import Image from "next/image";

const CustomTitle = ({ name, fontSize, marginY }) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className={`text-${fontSize} font-semibold ${marginY}`}>{name}</h1>
      <Image src="/moreDark.png" alt="" width={20} height={20} />
    </div>
  );
};

export default CustomTitle;
