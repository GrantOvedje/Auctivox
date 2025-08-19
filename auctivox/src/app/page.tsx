import { auth } from "@/auth";
import Image from "next/image";
import SignIn from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { database } from "@/db/database";
import { items  } from "@/db/schema";
import { revalidatePath } from "next/cache";

export default async function Home() {
  const session = await auth()
 
  const allItems = await database.query.items.findMany();


  return (
   <main className="container mx-auto py-12 space-y-8">
    <h1 className="text-4xl font-bold">Items For Sale</h1>

    <div className="grid grid-cols-4 gap-8">
      {allItems.map((item) => (
        <div key={item.id} className="border p-8 rounded-xl space-y-2">
          {item.imageUrl && (
            <Image
              src={item.imageUrl}
              alt={item.name}
              width={400}   // required
              height={300}  // required
              className="w-full h-48 object-cover rounded-md"
            />
          )}
          <h2 className="font-bold">{item.name}</h2>
          <p>Starting price: ${item.startingPrice / 100}</p>
        </div>
      ))}
    </div>

   </main>
  );
}
// database password for supabase-dETKyVJv9IACd0BT