export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { database } from "@/db/database";
import { ItemCard } from "./item-card";

export default async function Home() {
  try {
    const allItems = await database.query.items.findMany();

    console.log("✅ HOME ITEMS:", allItems);

    if (!allItems || allItems.length === 0) {
      return (
        <main className="space-y-8">
          <h1 className="text-4xl font-bold">Items For Sale</h1>
          <p className="text-gray-500">No items are currently available.</p>
        </main>
      );
    }

    return (
      <main className="space-y-8">
        <h1 className="text-4xl font-bold">Items For Sale</h1>
        <div className="grid grid-cols-4 gap-8">
          {allItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </main>
    );
  } catch (error) {
    console.error("❌ HOME PAGE DB ERROR:", error);

    return (
      <main className="space-y-8">
        <h1 className="text-4xl font-bold">Items For Sale</h1>
        <p className="text-red-500">
          Error fetching items. Please try again later.
        </p>
      </main>
    );
  }
}

// database password for supabase-dETKyVJv9IACd0BT