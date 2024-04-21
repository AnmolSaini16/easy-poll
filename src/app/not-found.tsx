"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex items-center flex-col h-full space-y-10">
      <div className="w-[480px]">
        <iframe
          src="https://giphy.com/embed/8L0Pky6C83SzkzU55a"
          width="480"
          height="270"
          allowFullScreen
        ></iframe>
        <p>
          <a href="https://giphy.com/gifs/mini-italia-8L0Pky6C83SzkzU55a">
            via GIPHY
          </a>
        </p>
      </div>

      <Link href="/">
        <Button variant="outline">Go to Home Page</Button>
      </Link>
    </div>
  );
}
