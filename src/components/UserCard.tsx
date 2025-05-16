import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { UserCardType } from "@/types";

const UserCard = ({ type, count, year }: UserCardType) => {
  return (
    <Card className="flex-1 min-w-[130px] odd:bg-thirdColor even:bg-firstColor border-none">
      <CardHeader className="p-4 pb-0 flex flex-row items-center justify-between space-y-0">
        <Badge
          variant="outline"
          className="bg-white text-green-600 rounded-full px-2 py-1 text-[10px]"
        >
          {year}
        </Badge>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Menu</span>
        </Button>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <h1 className="text-2xl font-semibold">{count.toLocaleString()}</h1>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <p className="text-sm font-medium text-gray-500">{type}s</p>
      </CardFooter>
    </Card>
  );
};

export default UserCard;
