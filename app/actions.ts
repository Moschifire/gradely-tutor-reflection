'use server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function submitReflection(formData: FormData) {
    const rawFormData = Object.fromEntries(formData.entries());

    const { data, error } = await supabase
        .from('tutor_reflections')
        .insert([rawFormData]);

    if (error) throw new Error(error.message);
    return { success: true };
}