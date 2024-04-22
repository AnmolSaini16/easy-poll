import { BarChartHorizontal } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex gap-2 items-center">
      <div className="border rounded-full p-2 bg-gray-700">
        <BarChartHorizontal className="w-7 h-7 text-primary" />
      </div>
      <h1 className="text-3xl font-extrabold">
        <span className="text-primary">Easy</span>Poll{" "}
      </h1>
    </Link>
  );
}
