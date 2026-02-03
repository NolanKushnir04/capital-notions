"use server";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export type SubscribeState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function subscribe(
  _prevState: SubscribeState,
  formData: FormData
): Promise<SubscribeState> {
  const email = formData.get("email") as string | null;
  const firstName = formData.get("first_name") as string | null;
  const lastName = formData.get("last_name") as string | null;
  const phone = formData.get("phone") as string | null;

  if (!email) {
    return { status: "error", message: "Email is required." };
  }

  const { error } = await supabase.from("Subscribers").insert({
    email,
    first_name: firstName,
    last_name: lastName,
    phone_number: phone
  });

  if (error) {
    if (error.code === "23505") {
      // unique constraint
      return { status: "error", message: "You’re already subscribed." };
    }
    return { status: "error", message: "Something went wrong. Try again." };
  }

  return { status: "success", message: "Thanks for subscribing!" };
}
