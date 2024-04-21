import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  const supabase = createClient();
  return useQuery({
    queryKey: ["user-info"],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();
      return data?.user;
    },
    staleTime: Infinity,
  });
};
