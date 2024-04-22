import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import UserPollsTable from "@/components/poll/UserPollsTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: {
    id: string;
  };
}) {
  const supabase = createClient();

  if (!searchParams?.id) {
    return redirect("/");
  }
  const { data, error } = await supabase
    .from("poll")
    .select("*")
    .eq("created_by", searchParams.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }
  return <UserPollsTable userPolls={data} />;
}
