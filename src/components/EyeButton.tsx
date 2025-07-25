"use client";

import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function EyeButton({ href }: { href: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="ghost"
      size="icon"
      disabled={isPending}
      onClick={() => startTransition(() => router.push(href))}
      aria-label="View details"
    >
      <Eye className="h-4 w-4" />
    </Button>
  );
}
