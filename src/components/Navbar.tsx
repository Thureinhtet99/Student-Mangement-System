import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, MessageCircleMore } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Link from "next/link";

const Navbar = async () => {
  const user = await currentUser();
  const role = user?.publicMetadata.role as string;

  return (
    <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 max-w-screen-2xl mx-auto">
        {/* LOGO/BRAND */}
        <div className="flex items-center">
          <h1 className="text-lg font-bold text-foreground block lg:hidden">
            Schooool
          </h1>
        </div>

        {/* ICONS AND USER */}
        <div className="flex items-center gap-2">
          <Link href="/messages" className="rounded-full hover:bg-muted">
            <MessageCircleMore className="h-4 w-4" />
            <span className="sr-only">Messages</span>
          </Link>

          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-full hover:bg-muted relative"
                >
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -right-1 -top-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500 text-white border-2 border-background rounded-full hover:bg-red-500">
                    3
                  </Badge>
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="end"
                className="w-72 p-0 shadow-lg border-none rounded-xl overflow-hidden"
              >
                {/* Example notification list */}
                <div className="bg-white dark:bg-zinc-900 divide-y divide-muted-foreground/10">
                  <div className="px-4 py-3 font-semibold text-foreground border-b">
                    Notifications
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    <div className="px-4 py-3 hover:bg-muted transition cursor-pointer">
                      No new notifications.
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* User information and button */}
          <div className="flex items-center gap-3 ml-2 pl-2 border-l">
            <div className="hidden sm:flex flex-col items-end">
              <p className="text-sm font-medium leading-none">
                {user?.username}
              </p>
              <p className="text-xs text-muted-foreground capitalize">
                {role || "User"}
              </p>
            </div>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8",
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
