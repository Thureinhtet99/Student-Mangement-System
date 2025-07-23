"use client";

import { FormDescription, FormItem, FormLabel } from "@/components/ui/form";
import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Search, X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { MultiSelectBoxType } from "@/types";

const MultiSelectBox = ({
  name,
  subject,
  verb,
  items,
  selectedItems,
  setSelectedItems,
}: MultiSelectBoxType<any>) => {
  const [itemSearchQuery, setItemSearchQuery] = useState("");

  const filteredItems = items.filter((item: any) =>
    item.name.toLowerCase().includes(itemSearchQuery.toLowerCase())
  );

  const toggleItemSelection = (itemId: string | number) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const removeItem = (itemId: string | number) => {
    setSelectedItems((prev) => prev.filter((id) => id !== itemId));
  };

  return (
    <FormItem className="space-y-2">
      <FormLabel className="capitalize">{name}
        <span>s</span>
      </FormLabel>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between"
            type="button"
          >
            <span>
              {selectedItems.length > 0
                ? `${selectedItems.length} ${name}${
                    selectedItems.length > 1 ? "s" : ""
                  } selected`
                : `Select ${name}s`}
            </span>
            <Search className="h-4 w-4 ml-2 opacity-50" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Select {name}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="relative mb-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={`Search ${name}...`}
                value={itemSearchQuery}
                onChange={(e) => setItemSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <ScrollArea className="h-[300px] pr-4">
              {filteredItems.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">
                  No {name} found
                </p>
              ) : (
                <div className="space-y-3">
                  {filteredItems.map((item: any) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-2 rounded-md hover:bg-muted/50"
                    >
                      <Checkbox
                        id={`${item}-${item.id}`}
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={() => toggleItemSelection(item.id)}
                      />
                      <label
                        htmlFor={`${item}-${item.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                      >
                        {item.name}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button">Done</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {selectedItems.length > 0 && (
        <div className="flex flex-wrap gap-2 max-h-[100px] overflow-y-auto p-1">
          {selectedItems.map((itemId) => {
            const subject = items.find((t: any) => t.id === itemId);
            return (
              <Badge
                key={itemId}
                variant="secondary"
                className="flex items-center gap-1 py-1.5"
              >
                {subject?.name}
                <X
                  className="h-3 w-3 cursor-pointer ml-1"
                  onClick={() => removeItem(itemId)}
                />
              </Badge>
            );
          })}
        </div>
      )}
      <FormDescription>
        Select the {name}s this {subject} will be {verb}
      </FormDescription>
    </FormItem>
  );
};

export default MultiSelectBox;
