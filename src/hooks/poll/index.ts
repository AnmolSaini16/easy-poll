import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { createClient } from "@/lib/supabase/client";
import { isPollActive } from "@/lib/utils";

export const useGetPoll = (poll_id: string) => {
  const supabase = createClient();

  return useQuery({
    queryKey: ["poll-" + poll_id],
    queryFn: async () => {
      const { data } = await supabase
        .from("poll")
        .select("*,poll_log(*)")
        .eq("id", poll_id)
        .single();

      return {
        poll_options: data?.poll_options as { option: string; count: number }[], //Supabase type issue for JSON
        user_poll_log: data?.poll_log?.[0],
        isActive: isPollActive(data?.end_date!),
      };
    },
    staleTime: Infinity,
  });
};

export const usePollListner = (poll_id: string) => {
  const supabase = createClient();
  const queryClient = useQueryClient();

  useEffect(() => {
    const channels = supabase
      .channel("custom-update-channel")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "poll",
          filter: "id=eq." + poll_id,
        },
        (payload) => {
          queryClient.invalidateQueries({
            queryKey: ["poll-" + payload.new.id],
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
