import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { createClient } from "@/lib/supabase/client";
import { isPollActive } from "@/lib/utils";

export const useGetPoll = (poll_id: string) => {
  const supabase = createClient();

  return useQuery({
    queryKey: ["poll-" + poll_id],
    queryFn: async () => {
      const { data: pollData } = await supabase
        .from("poll")
        .select("*, poll_option(*), poll_log(*)")
        .eq("id", poll_id)
        .order("id", { referencedTable: "poll_option", ascending: true })
        .single();

      return {
        pollOptions: pollData?.poll_option,
        user_poll_log: pollData?.poll_log[0],
        isPollActive: isPollActive(pollData?.end_date ?? ""),
      };
    },
    staleTime: Infinity,
  });
};

export const usePollOptionListner = (poll_id: string) => {
  const supabase = createClient();
  const queryClient = useQueryClient();

  useEffect(() => {
    const channels = supabase
      .channel("custom-update-channel")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "poll_option" },
        (payload) => {
          queryClient.invalidateQueries({
            queryKey: ["poll-" + payload.new.poll_id],
          });
        }
      )
      .subscribe();

    return () => {
      channels.unsubscribe();
    };
  }, []);

  return;
};
