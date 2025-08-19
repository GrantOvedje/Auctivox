import { createClient } from "@supabase/supabase-js";

// Define the types for your Supabase project
// (You can generate full types from your Supabase project if you want,
// but it's optional. For now, we'll use `any` or default inferred types.)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export async function uploadImage(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("auctivox-images")
    .upload(fileName, buffer, {
      contentType: file.type,
    });

  if (error) {
    throw new Error("Image upload failed: " + error.message);
  }

  // get the public URL
  const { data } = supabase.storage
    .from("auctivox-images")
    .getPublicUrl(fileName);

  return data.publicUrl;
}