import { auth } from "@/auth";
import SignIn from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";
import Link from "next/link";

export async function Header(){
    const session = await auth();

    return (
        <div className="bg-gray-200 py-2">
            <div className="container flex justify-between items-center">
                <div className="flex items-center gap-12">
                    <Link href="/" className="hover:unerline flex items-center gap-1 text-2xl font-bold">
                        Auctivox
                    </Link>

                    <div className="flex items-center gap-8">
                        <Link 
                            href="/" 
                            className="hover:unerline flex items-center gap-1"
                        >
                            All Auctions
                        </Link>

                        <Link 
                            href="/items/create" 
                            className="hover:unerline flex items-center gap-1"
                        >
                            Create Auction
                        </Link>

                        <Link 
                            href="/auctions" 
                            className="hover:unerline flex items-center gap-1"
                        >
                            My Auctions
                        </Link>
                    </div>

                </div>

                <div className="flex items-center gap-4">
                    <div>{session?.user?.name}</div>
                    <div>{session ? <SignOut /> : <SignIn />}</div>
                </div>
            </div>
        </div>
    )
}