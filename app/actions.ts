// app/actions.ts
'use server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function submitReflection(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());
  
  // LOG THE DATA TO SEE WHAT WE ARE SENDING
  console.log("Submitting to Supabase:", rawFormData);

  const { data, error } = await supabase
    .from('tutor_reflections')
    .insert([rawFormData]);

  if (error) {
    // THIS ERROR WILL SHOW IN YOUR TERMINAL (VS CODE)
    console.error("SUPABASE ERROR:", error.message);
    throw new Error(error.message);
  }

  return { success: true };
}