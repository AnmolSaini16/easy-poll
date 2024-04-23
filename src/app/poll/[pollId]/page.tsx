import { Metadata } from "next";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import PollRootWrapper from "@/components/poll/PollRootWrapper";

export async function generateMetadata({
  params,
}: {
  params: { pollId: string };
}): Promise<Metadata> {
  const supabase = createClient();

  const { data: poll } = await supabase
    .from("poll")
    .select("*,users(*)")
    .eq("id", params.pollId)
    .single();

  if (!poll) {
    return {};
  }

  return {
    title: poll.title,
  };
}

export default async function PollPage({
  params,
}: {
  params: { pollId: string };
}) {
  const supabase = createClient();

  const { data: poll } = await supabase
    .from("poll")
    .select("*,users(*)")
    .eq("id", params.pollId)
    .single();

  if (!poll) {
    return redirect("/404");
  }

  return <PollRootWrapper poll={poll} />;
}
