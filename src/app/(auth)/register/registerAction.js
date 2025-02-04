"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function signupAction(prevState, formData) {
  const supabase = await createClient();
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirm-password");

  const data = {
    email,
    password,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/about");
  }
  redirect("/");
}
