import React from "react";
import { auth, signOut } from "@/auth";
import Link from "next/link";
import { Button } from "./button";
import Image from "next/image";

type Props = {};

function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button>Sign out</Button>
    </form>
  );
}

export default async function Header({}: Props) {
  const session = await auth();
  console.log(session);

  return (
    <header className="border bottom-1 ">
      <nav className="bg-white border-gray-200 px-4 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link href="/">
            <h1>AI Form Builder</h1>
          </Link>
          <div>
            {session?.user ? (
              <div className="flex items-center gap-4">
                <Link href="/view-forms">
                  <Button variant="outline">Dashboard</Button>
                </Link>
                {session.user.name && session.user.image && (
                  <Image
                    src={session.user.image}
                    alt={session.user.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}
                <SignOut />
              </div>
            ) : (
              <Link href="/api/auth/signin">
                <Button variant="link">Sign in</Button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
