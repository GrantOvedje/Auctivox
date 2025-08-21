import { items } from "@/db/schema";
import { eq } from "drizzle-orm";
import { database } from "@/db/database";
import { Button } from "@/components/ui/button";
import { formatDistance } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import { convertToDollar } from "@/util/currency";

function formatTimestamp(timestamp: Date) {
    return formatDistance(timestamp, new Date(), { addSuffix: true })
}

export default async function ItemPage({ 
    params,
}: {
    params: Promise<{ itemId: string }>;
}) {
    const { itemId } = await params; //await before destructuring
    
    const item = await database.query.items.findFirst({
        where: eq(items.id, parseInt(itemId)),
    });

    if (!item) {
        return (
            <div className="space-y-8 flex flex-col items-center mt-12">
                <Image src="/package.svg" width="200" height="200" alt="Package" />

                <h1 className="text-4xl font-bold">Item not found</h1>
                <p className="text-center">The item you are trying to view is invalid. 
                   <br /> Please go back and search for a different auction item.
                </p>

                <Button asChild>
                    <Link href={`/`}>View Auction</Link>
                </Button>
            </div>
        );
    }

    // const bids = [
    //     {
    //         id: 1,
    //         amount: 100,
    //         userName: "Grant",
    //         timestamp: new Date(),
    //     },

    //     {
    //         id: 2,
    //         amount: 200,
    //         userName: "Jeremiah",
    //         timestamp: new Date(),
    //     },

    //     {
    //         id: 3,
    //         amount: 300,
    //         userName: "Emmanuel",
    //         timestamp: new Date(),
    //     },
    // ]

    const bids = [];

    const hasBids = bids.length > 0;

    return (
        <main className="space-y-8">
            <div className="flex gap-12">
                <div className="flex flex-col gap-6">
                    <h1 className="text-4xl font-bold">
                        <span className="font-normal">Auction for </span>{item.name}
                    </h1>

                    { item.imageUrl && 
                        <h1 className="">
                            <Image
                                src={item.imageUrl}
                                alt={item.name}
                                width={400}   // required
                                height={400}  // required
                                className="rounded-xl"
                            />
                        </h1>
                    }

                    <div className="text-xl space-y-4">
                        <div>
                            Starting Price of {" "}
                            <span className="font-bold">${convertToDollar(item.startingPrice)}</span>
                        </div>
                        <div>
                            Bid Interval <span className="font-bold">${convertToDollar(item.bidInterval)}</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 flex-1">
                    <h2 className="text-2xl font-bold">Current Bids</h2>

                {hasBids ? (
                    <ul className="space-y-4">
                        {bids.map((bid) => (
                            <li key={bid.id} className="bg-gray-100 rounded-xl p-8">
                                <div className="flex gap-4">
                                    <div>
                                        <span className="font-bold">${bid.amount}</span>by{" "}
                                        <span className="font-bold">{bid.userName}</span>
                                    </div>
                                    
                                    <div>{formatTimestamp(bid.timestamp)}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ): (
                    <div className="flex flex-col items-center gap-8 bg-gray-100 rounded-xl p-12">
                        <Image src="/package.svg"  width="200" height="200" alt="Package"/>

                        <h2 className="text-2xl font-bold">No bids yet</h2>

                        <Button>Place a Bid</Button>
                    </div>
                )}

                    
                </div>
            </div>
            
        </main>
    )
}