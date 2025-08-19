"use server"

import { auth } from "@/auth"
import { items } from "@/db/schema";
import { database } from "@/db/database";
import { redirect } from "next/navigation";
import { uploadImage } from "@/lib/supabaseClient";

export async function createItemAction(formData: FormData) {
    const session = await auth();

    if(!session) {
        throw new Error("Unauthorized");
    }
    
    const user = session.user;

    if (!user || !user.id) {
        throw new Error("Unauthorized");
    }

    const startingPrice = formData.get("startingPrice") as string;

    const priceAsCents = Math.floor(parseFloat(startingPrice) * 100)

      //  Handle file upload
    // const file = formData.get("image") as File | null;
    // let imageUrl: string | null = null;

    // if (file) {
    //     const buffer = await file.arrayBuffer();
    //     const fileName = `${Date.now()}-${file.name}`;

    //     const { error } = await supabase.storage
    //     .from("auctivox-images")
    //     .upload(fileName, buffer, {
    //         contentType: file.type,
    //     });

    //     if (error) {
    //     throw new Error("Image upload failed: " + error.message);
    //     }

    //     const { data: publicUrl } = supabase.storage
    //     .from("auctivox-images")
    //     .getPublicUrl(fileName);

    //     imageUrl = publicUrl.publicUrl;
    // }

 
  // Handle file upload
    const file = formData.get("image") as File | null;
    let imageUrl: string | null = null;

    if (file) {
        imageUrl = await uploadImage(file);
    }

  // ...continue inserting item into DB with imageUrl
        
    await database.insert(items).values({
        name: formData.get("name") as string,
        startingPrice: priceAsCents,
        userId: user.id,
        imageUrl,
    });
    redirect("/");
}