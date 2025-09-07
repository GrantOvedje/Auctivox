import "dotenv/config"
import { database } from "@/db/database";

async function test() {
  try {
    const items = await database.query.items.findMany();
    console.log("ITEMS:", items);
  } catch (error) {
    console.error("DB ERROR:", error);
  }
}

test();
