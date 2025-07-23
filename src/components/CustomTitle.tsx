import { CustomTitleType } from "@/types";
import Image from "next/image";

const CustomTitle = ({ name, fontSize, marginY }: CustomTitleType) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className={`text-${fontSize} font-semibold ${marginY}`}>{name}</h1>
    </div>
  );
};

export default CustomTitle;
