"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "../ui/button";

import { cn } from "@/lib/utils";
import { User } from "@supabase/supabase-js";

const CarouselCompoenent = ({ user }: { user: User | null }) => {
  return (
    <div className="w-full flex items-center justify-center">
      <div
        className={cn(
          "grid gap-y-3 text-center sm:w-[80%] md:w-[70%]",
          user ? "grid-rows-3" : "grid-rows-2"
        )}
      >
        <h1 className="font-bold text-4xl">
          Create instant, real-time polls for free!
        </h1>
        <h4 className="text-muted-foreground">
          Precision meets customization with our poll app! Whether it's
          gathering feedback for your business or simply settling a debate among
          friends, our platform offers the flexibility to create polls that hit
          the mark every time.
        </h4>
        {user && (
          <Button asChild className="w-fit mx-auto">
            <Link href="/create-poll">
              <Plus className="h-4 w-4 mr-1" /> Create your poll
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default CarouselCompoenent;

// const config = [
//   {
//     title: "Polling Precision: Craft Custom Polls for Every Occasion!",
//     subtitle:
//       "Precision meets customization with our poll app! Whether it's gathering feedback for your business or simply settling a debate among friends, our platform offers the flexibility to create polls that hit the mark every time.",
//   },
//   {
//     title: "Polling, Your Way: Craft Customized Surveys with Ease!",
//     subtitle:
//       "Say goodbye to one-size-fits-all surveys! With our app, you're in control. Customize every aspect of your polls, from the questions to the design, and gather valuable insights tailored to your specific needs.",
//   },
//   {
//     title: "Your Ideas, Your Polls: Create, Share, and Analyze!",
//     subtitle:
//       "Turn your ideas into action with our custom poll app! Whether you're seeking feedback on a new project or simply curious about the opinions of others, our platform provides the tools you need to create, share, and analyze polls with ease.",
//   },
// ];
