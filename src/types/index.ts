import { Json } from "./supabase";

export type IPoll = {
  created_at: string;
  created_by: string | null;
  description: string | null;
  end_date: string;
  id: string;
  poll_options: Json[]; //Supabase type issue fron Json field
  title: string;
  updated_at: string | null;
  users: {
    avatar_url: string | null;
    email: string | null;
    id: string;
    user_name: string | null;
  } | null;
};
