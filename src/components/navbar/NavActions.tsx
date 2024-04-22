"use client";

import LoginButton from "@/app/auth/compoenents/LoginButton";
import UserDropdown from "./UserDropdown";
import { useUser } from "@/hooks/useUser";

export default function NavActions() {
  const { data: user, isLoading, isFetching } = useUser();

  if (isLoading || isFetching) {
    return <></>;
  }

  if (!user) {
    return <LoginButton />;
  }

  return <UserDropdown user={user} />;
}
