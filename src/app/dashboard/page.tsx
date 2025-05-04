"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <Button
        variant="destructive"
        onClick={() => signOut({ callbackUrl: "/login" })}
      >
        Sair
      </Button>
    </div>
  );
}
