import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Bell, MessageCircleMore } from "lucide-react";

const Navbar = () => {
  return (
    <>
      <div className="flex items-center justify-between h-16 px-4">
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
        <div className="flex items-center gap-4 ml-auto">
          <Button size="icon" variant="ghost" className="rounded-full">
            <MessageCircleMore className="h-5 w-5" />
            <span className="sr-only">Messages</span>
          </Button>

          <Button size="icon" variant="ghost" className="rounded-full relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -right-1 -top-1 h-4 w-4 p-0 flex items-center justify-center">
              1
            </Badge>
            <span className="sr-only">Notifications</span>
          </Button>

          <div className="flex items-center gap-2">
            <div className="flex flex-col items-end">
              <span className="font-medium text-sm">John Doe</span>
              <span className="text-xs text-muted-foreground">Admin</span>
            </div>

            <Avatar>
              <AvatarImage src="/avatar.png" alt="John Doe" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
