import { Item } from "@/db/schema";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatNaira } from "@/util/currency";
import { format } from "date-fns";
import { isBidOver } from "@/util/bid-is-over";


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
            <p className="text-lg">
                Starting price: {formatNaira(item.startingPrice)}
            </p>

            {isBidOver(item) ? (
                <p className="text-lg">Bidding is Over</p>
            ) : (
                <p className="text-lg">
                    Ends on: {format(new Date(item.endDate), "eeee MM/dd/yy")}
                </p>
            )}

            

            <Button asChild variant={isBidOver(item) ? "outline" : "default"}>
                <Link href={`/items/${item.id}`}>
                    {isBidOver(item) ? "View Bid" : "Place Bid"}
                </Link>
            </Button>
        </div>
    );
    
}