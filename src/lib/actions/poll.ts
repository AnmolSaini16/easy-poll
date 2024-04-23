"use server";

import { redirect } from "next/navigation";

import { createClient } from "../supabase/server";

export async function ActivePollLists() {
  const supabase = createClient();

  return supabase
    .from("poll")
    .select("*,poll_option(*)")
    .filter("end_date", "gte", new Date().toISOString())
    .order("created_at", { ascending: true });
}

export async function ExpiredPollsList() {
  const supabase = createClient();

  return supabase
    .from("poll")
    .select("*,poll_option(*)")
    .filter("end_date", "lte", new Date().toISOString())
    .order("created_at", { ascending: true });
}

export const createPoll = async (payload: {
  title: string;
  end_date: Date;
  poll_options: string[];
  description?: string;
}): Promise<void> => {
  const supabase = createClient();

  const { data: pollId, error } = await supabase.rpc("create_poll", {
    title: payload.title,
    end_date: new Date(payload.end_date).toISOString(),
    options: payload.poll_options,
    description: payload.description ?? "",
  });

  if (error) {
    console.error(error);
    throw new Error("Fail to create poll");
  } else {
    redirect("/poll/" + pollId);
  }
};

export const updatePoll = async (payload: {
  update_id: string;
  option_name: string;
}) => {
  const supabase = createClient();

  return supabase.rpc("update_poll", {
    update_id: payload.update_id,
    option_name: payload.option_name,
  });
};

export const deletePoll = async (pollId: string) => {
  const supabase = createClient();

  return supabase.from("poll").delete().eq("id", pollId);
};

export const updatePollDetails = async (
  payload: {
    title: string;
    end_date: Date;
    description?: string;
  },
  pollId: string
) => {
  const supabase = createClient();

  return supabase
    .from("poll")
    .update({
      title: payload.title,
      end_date: new Date(payload.end_date).toISOString(),
      description: payload.description ?? "",
    })
    .eq("id", pollId);
};
