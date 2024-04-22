"use client";

import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { Plus } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";
import { useUser } from "@/hooks/useUser";

type Props = {};

const CarouselCompoenent = (props: Props) => {
  const { data: user } = useUser();

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
      className="w-full min-h-[300px]"
    >
      <CarouselContent>
        {config.map((item, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <div className="flex items-center justify-center p-6">
                <div className="space-y-4 sm:w-[80%] md:w-[70%] text-center">
                  <h1 className="font-bold text-4xl">{item.title}</h1>
                  <h4 className="text-muted-foreground">{item.subtitle}</h4>
                  {user && (
                    <div>
                      <Link href="/create-poll">
                        <Button className="">
                          <Plus className="h-4 w-4 mr-1" /> Create your poll
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default CarouselCompoenent;

const config = [
  {
    title: "Polling Precision: Craft Custom Polls for Every Occasion!",
    subtitle:
      "Precision meets customization with our poll app! Whether it's gathering feedback for your business or simply settling a debate among friends, our platform offers the flexibility to create polls that hit the mark every time.",
  },
  {
    title: "Polling, Your Way: Craft Customized Surveys with Ease!",
    subtitle:
      "Say goodbye to one-size-fits-all surveys! With our app, you're in control. Customize every aspect of your polls, from the questions to the design, and gather valuable insights tailored to your specific needs.",
  },
  {
    title: "Your Ideas, Your Polls: Create, Share, and Analyze!",
    subtitle:
      "Turn your ideas into action with our custom poll app! Whether you're seeking feedback on a new project or simply curious about the opinions of others, our platform provides the tools you need to create, share, and analyze polls with ease.",
  },
];
