import { createClient } from "@/utils/supabase/server";

export async function loginAction(prevSate, formData) {
  const supabase = await createClient();
  const email = formData.get("email");
  const password = formData.get("password");

  const data = {
    email,
    password,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
  }
}
