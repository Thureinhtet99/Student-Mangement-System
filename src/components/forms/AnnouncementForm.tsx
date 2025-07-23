"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { announcementFormSchema } from "@/libs/formSchema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { createAnnouncement, updateAnnouncement } from "@/libs/actions";
import { toast } from "sonner";
import { formatDateLocal } from "@/libs/dataTimeFormat";
import FormActionButton from "../FormActionButton";

// Schema type
type Inputs = z.infer<typeof announcementFormSchema>;

const AnnouncementForm = ({
  type,
  data,
  onClose,
  relatedData,
}: {
  type: "create" | "update";
  data?: any;
  onClose?: () => void;
  relatedData?: any;
}) => {
  const classes = relatedData?.classes || [];

  const form = useForm<Inputs>({
    resolver: zodResolver(announcementFormSchema),
    defaultValues: {
      name: data?.name || "",
      description: data?.description || "",
      date: data?.date ? new Date(data.date) : undefined,
      classId: data?.classId || undefined,
    },
  });

  const {
    isPending,
    isError,
    error,
    mutate,
    reset: resetMutation,
  } = useMutation({
    mutationFn: async (values: Inputs) => {
      if (type === "create") {
        return await createAnnouncement(values);
      } else {
        return await updateAnnouncement(values);
      }
    },
    onSuccess: () => {
      toast.success(
        `Announcement is ${
          type === "create" ? "created" : "updated"
        } successfully`
      );
      form.reset();
      onClose?.();
    },
    onError: () => {
      toast.error(
        `Failed to ${type === "create" ? "create" : "update"} announcement`
      );
    },
  });

  const onSubmit = (values: Inputs) => {
    const formData = {
      ...(type === "update" && data?.id && { id: data.id }),
      ...values,
    };
    mutate(formData);
  };

  return (
    <Card className="w-full py-4">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {isError && (
              <div className="bg-destructive/15 p-3 rounded-md">
                <p className="text-xs font-medium text-destructive">
                  {error?.message || "Something went wrong. Please try again."}
                </p>
              </div>
            )}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter announcement name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value ? new Date(value) : undefined);
                        }}
                        value={
                          field.value instanceof Date &&
                          !isNaN(field.value.getTime())
                            ? formatDateLocal(field.value)
                            : ""
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="classId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ? String(field.value) : ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {classes?.length === 0 ? (
                        <SelectItem value="empty" disabled>
                          No classes found
                        </SelectItem>
                      ) : (
                        classes?.map((c: any) => (
                          <SelectItem key={c.id} value={String(c.id)}>
                            {c.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter announcement details..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a brief description of the announcement (optional)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormActionButton
              form={form}
              resetMutation={resetMutation}
              isPending={isPending}
              type={type}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AnnouncementForm;
