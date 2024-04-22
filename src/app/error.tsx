"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex items-center flex-col h-full space-y-10">
      <div className="w-[480px]">
        <iframe
          src="https://giphy.com/embed/13GIAl4R21YLgQ"
          width="480"
          height="270"
          allowFullScreen
        ></iframe>
        <p>
          <a href="https://giphy.com/gifs/okkultmotionpictures-facebook-ko-13GIAl4R21YLgQ">
            via GIPHY
          </a>
        </p>
      </div>

      {error.message.length > 0 && (
        <h1 className="text-xl">Error: {error.message}</h1>
      )}
      <Button onClick={() => reset()}>Try Refreshing</Button>
    </div>
  );
}
