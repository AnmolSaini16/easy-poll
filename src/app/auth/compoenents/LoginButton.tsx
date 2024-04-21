"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

const LoginButton = () => {
  const supabase = createClient();

  return (
    <Button
      variant="outline"
      onClick={() => {
        supabase.auth.signInWithOAuth({
          provider: "github",
          options: {
            redirectTo:
              location.origin + "/auth/callback?next=" + location.pathname,
          },
        });
      }}
    >
      <GitHubLogoIcon className="mr-2 h-4 w-4" /> Login
    </Button>
  );
};

export default LoginButton;
