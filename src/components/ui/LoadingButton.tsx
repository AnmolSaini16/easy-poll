import React from "react";
import { Button } from "./button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  loading: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const LoadingButton = ({ loading, ...props }: Props) => {
  return (
    <Button {...props} className={cn("flex items-center", props.className)}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {props.text}
    </Button>
  );
};
