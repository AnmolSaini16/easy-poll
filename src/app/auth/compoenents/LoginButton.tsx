"use client";

import { GitHubLogoIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createClient } from "@/lib/supabase/client";

const LoginButton = () => {
  const supabase = createClient();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Login</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Login</DialogTitle>
          <DialogDescription>
            Securely login to your easy poll account
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 p-2">
          <Button
            variant="outline"
            onClick={() => {
              supabase.auth.signInWithOAuth({
                provider: "github",
                options: {
                  redirectTo:
                    location.origin +
                    "/auth/callback?next=" +
                    location.pathname,
                },
              });
            }}
          >
            Login with GitHub <GitHubLogoIcon className="ml-2 h-4 w-4" />
          </Button>
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                OR
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                  redirectTo: location.origin + location.pathname,
                },
              });
            }}
          >
            Login with Google{" "}
            <svg role="img" viewBox="0 0 24 24" className="ml-2 h-4 w-4">
              <path
                fill="currentColor"
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              />
            </svg>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginButton;
