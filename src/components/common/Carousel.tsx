"use client";

import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

type Props = {};

const CarouselCompoenent = (props: Props) => {
  return (
    <Carousel
      className="w-full h-[400px]"
      plugins={[
        Autoplay({
          delay: 10000,
        }),
      ]}
    >
      <CarouselContent>
        {config.map((item) => (
          <CarouselItem
            key={item.title}
            className={cn("w-full h-[400px] relative", item.color)}
          >
            <div className="absolute bottom-6 left-8 sm:w-[80%] md:w-[60%] space-y-2">
              <h1 className="font-bold text-3xl">{item.title}</h1>
              <h4 className="font-light text-gray-300">{item.subtitle}</h4>
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
    color: "bg-green-800",
  },
  {
    title: "Polling, Your Way: Craft Customized Surveys with Ease!",
    subtitle:
      "Say goodbye to one-size-fits-all surveys! With our app, you're in control. Customize every aspect of your polls, from the questions to the design, and gather valuable insights tailored to your specific needs.",
    color: "bg-red-800",
  },
  {
    title: "Your Ideas, Your Polls: Create, Share, and Analyze!",
    subtitle:
      "Turn your ideas into action with our custom poll app! Whether you're seeking feedback on a new project or simply curious about the opinions of others, our platform provides the tools you need to create, share, and analyze polls with ease.",
    color: "bg-yellow-800",
  },
];
