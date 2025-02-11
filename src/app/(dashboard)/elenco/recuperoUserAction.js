"use server";

import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

export async function getUser() {
  const { data, error } = await supabase.atuh.getUser();
  if (error) return null;
  return { id: data.user.id, email: data.user.email };
}
