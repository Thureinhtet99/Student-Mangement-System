"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const RedirectToast = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const redirectReason = searchParams.get("redirect_reason");

    if (redirectReason === "unauthorized_access") {
      toast.warning("You don't have permission to access the requested page");

      // Clean up the URL
      const url = new URL(window.location.href);
      url.searchParams.delete("redirect_reason");
      window.history.replaceState({}, "", url.toString());
    }
  }, [searchParams]);

  return null; // This component doesn't render anything
};

export default RedirectToast;
