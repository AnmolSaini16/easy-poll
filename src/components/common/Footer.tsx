import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import Logo from "./Logo";
import { BarChartHorizontal } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t-[0.5px] py-5 flex items-center justify-between gap-5">
      <h1 className="text-2xl font-bold">
        <span className="text-yellow-500">Easy</span>Poll{" "}
      </h1>
      <div className="flex items-center gap-2">
        Made By Anmol
        <Link href="https://github.com/AnmolSaini16" target="_blank">
          <GitHubLogoIcon className="w-6 h-6 hover:scale-125 transition-all" />
        </Link>
      </div>
    </footer>
  );
}
