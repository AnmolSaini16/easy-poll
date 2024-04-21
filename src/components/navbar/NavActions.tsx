import { createClient } from "@/lib/supabase/server";
import LoginButton from "@/app/auth/compoenents/LoginButton";
import UserDropdown from "./UserDropdown";

export default async function NavActions() {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();

  if (!data?.user) {
    return <LoginButton />;
  }

  return <UserDropdown user={data?.user} />;
}
