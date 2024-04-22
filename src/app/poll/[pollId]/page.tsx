import { createClient } from "@/lib/supabase/server";
import { createClient as createClientBrowser } from "@/lib/supabase/client";
import { redirect } from "next/navigation";
import PollRootWrapper from "@/components/poll/PollRootWrapper";
import { IPoll } from "@/types";
import { Metadata } from "next";

export async function generateStaticParams() {
  const supabase = createClientBrowser();

  const { data: polls } = await supabase
    .from("poll")
    .select("id")
    .filter("end_date", "gte", new Date().toISOString())
    .limit(10);
  return polls as IPoll[];
}

export async function generateMetadata({
  params,
}: {
  params: { pollId: string };
}): Promise<Metadata> {
  const supabase = createClientBrowser();

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
  const supabase = createClientBrowser();

  const { data: poll, error } = await supabase
    .from("poll")
    .select("*,users(*)")
    .eq("id", params.pollId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  if (!poll) {
    return redirect("/404");
  }

  return <PollRootWrapper poll={poll} />;
}
