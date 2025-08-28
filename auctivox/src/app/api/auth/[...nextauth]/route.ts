import { handlers } from "@/auth" // Referring to the auth.ts we just created

export const { GET, POST } = handlers



// import { supabase } from "@/lib/supabaseClient";

// export async function POST(req: Request) {
//   const formData = await req.formData();
//   const file = formData.get("file") as File | null;

//   if (!file) {
//     return new Response(JSON.stringify({ error: "No file uploaded" }), {
//       status: 400,
//     });
//   }

//   const arrayBuffer = await file.arrayBuffer();
//   const fileName = `${Date.now()}-${file.name}`;

//   const { data, error } = await supabase.storage
//     .from("auction-images")
//     .upload(fileName, arrayBuffer, {
//       contentType: file.type,
//     });

//   if (error) {
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 500,
//     });
//   }

//   const { data: publicUrl } = supabase.storage
//     .from("auction-images")
//     .getPublicUrl(fileName);

//   return new Response(JSON.stringify({ url: publicUrl.publicUrl }), {
//     status: 200,
//   });
// }
