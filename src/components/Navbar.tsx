import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, MessageCircleMore } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

const Navbar = async () => {
  const user = await currentUser(); 
  const role = user?.publicMetadata.role as string;

  return (
    <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center justify-between h-16 px-4 max-w-screen-2xl mx-auto">
        {/* LOGO/BRAND */}
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-foreground block lg:hidden">
            Schoool
          </h1>
        </div>

        {/* SEARCH BAR */}
        {/* <div className="hidden lg:flex items-center relative">
          <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-[250px] pl-8 rounded-full bg-muted/30 border"
          />
        </div> */}

        {/* ICONS AND USER */}
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full hover:bg-muted"
          >
            <MessageCircleMore className="h-5 w-5" />
            <span className="sr-only">Messages</span>
          </Button>

          <div className="relative">
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full relative hover:bg-muted transition-colors"
            >
              <Bell className="h-5 w-5" />
              <Badge className="absolute -right-1 -top-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500 text-white border-2 border-background rounded-full hover:bg-red-500">
                3
              </Badge>
              <span className="sr-only">3 unread notifications</span>
            </Button>
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
