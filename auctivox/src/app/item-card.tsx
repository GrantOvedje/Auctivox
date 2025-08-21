import { Item } from "@/db/schema";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { convertToDollar } from "@/util/currency";

export function ItemCard({item}: {item: Item}) {
    return (
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
            <h2 className="text-xl font-bold">{item.name}</h2>
            <p className="text-lg">Starting price: ${convertToDollar(item.startingPrice)}</p>

            <Button asChild>
                <Link href={`/items/${item.id}`}>Place Bid</Link>
            </Button>
        </div>
    );
    
}