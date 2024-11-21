"use client"

import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react"

export default function Home() {
  const { signOut } = useAuthActions();

  return (
    <div className="h-screen flex items-center justify-center">
      Logged In !
      <Button className="ml-4" onClick={() => signOut()}>
        Sign Out
      </Button> 
    </div>
  )
}
