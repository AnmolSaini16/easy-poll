export type IPoll = {
  created_at: string;
  created_by: string;
  description: string | null;
  end_date: string;
  id: string;
  title: string;
  updated_at: string | null;
  users: {
    avatar_url: string | null;
    email: string | null;
    id: string;
    user_name: string | null;
  } | null;
};

export type IPolls = {
  created_at: string;
  created_by: string;
  description: string | null;
  end_date: string;
  id: string;
  title: string;
  updated_at: string | null;
  poll_option: {
    count: number;
    created_at: string;
    id: string;
    option: string;
    poll_id: string;
  }[];
}[];
