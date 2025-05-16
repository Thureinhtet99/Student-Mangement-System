"use client";

import { EventType } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon } from "lucide-react";

const Event = ({ title, time, description, type }: EventType) => {
  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="px-0 pt-0 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold text-gray-700">
            {title}
          </CardTitle>
          <Badge
            variant={type === "announcement" ? "outline" : "secondary"}
            className="flex items-center gap-1 font-normal"
          >
            <CalendarIcon className="h-3 w-3" />
            <span className="text-xs">{time}</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <p className="text-sm text-gray-500">{description}</p>
      </CardContent>
    </Card>
  );
};

export default Event;
