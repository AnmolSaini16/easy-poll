"use server";

import { redirect } from "next/navigation";

import { createClient } from "../supabase/server";

export async function ActivePollLists() {
  const supabase = createClient();

  return supabase
    .from("poll")
    .select("*,users(*)")
    .filter("end_date", "gte", new Date().toISOString())
    .order("created_at", { ascending: true });
}

export async function ExpiredPollsList() {
  const supabase = createClient();

  return supabase
    .from("poll")
    .select("*,users(*)")
    .filter("end_date", "lte", new Date().toISOString())
    .order("created_at", { ascending: true });
}

export const createPoll = async (payload: {
  title: string;
  description?: string;
  end_date: string;
  poll_options: { option: string; count: number }[];
}): Promise<void> => {
  const supabase = createClient();

  const { data: voteId, error } = await supabase.rpc("create_poll", {
    title: payload.title,
    end_date: payload.end_date,
    options: payload.poll_options,
    description: payload.description ?? "",
  });

  if (error) {
    throw new Error("Fail to create poll");
  } else {
    redirect("/poll/" + voteId);
  }
};

export const updatePoll = (payload: {
  update_id: string;
  option_name: string;
}) => {
  const supabase = createClient();

  return supabase.rpc("update_poll", {
    update_id: payload.update_id,
    option_name: payload.option_name,
  });
};
