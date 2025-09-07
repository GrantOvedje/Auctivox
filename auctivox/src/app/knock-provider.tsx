"use client"

import {
  KnockFeedProvider,
  KnockProvider,
} from "@knocklabs/react";
// import { env } from "process";
import { env } from "@/env";
import { ReactNode} from "react";
import { useSession } from "next-auth/react";

export function AppKnockProvider({children}: {children: ReactNode}) {
  const session = useSession();

  return (
    <KnockProvider apiKey={env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY} user={{ id: session?.data?.user?.id ?? "Guest" }}>
      {/* Optionally, use the KnockFeedProvider to connect an in-app feed */}
      <KnockFeedProvider feedId={env.NEXT_PUBLIC_KNOCK_FEED_ID}>
        {children}
      </KnockFeedProvider>
    </KnockProvider>
  );
};
