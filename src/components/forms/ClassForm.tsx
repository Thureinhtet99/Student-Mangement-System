"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { LoaderCircle } from "lucide-react";
import { createClass, updateClass } from "@/lib/actions";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { classFormSchema } from "@/lib/formSchema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Schema type
type Inputs = z.infer<typeof classFormSchema>;

const ClassForm = ({
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
  const teachers = relatedData?.teachers || [];

  const form = useForm<Inputs>({
    resolver: zodResolver(classFormSchema),
    defaultValues: {
      id: data?.id || null,
      name: data?.name || "",
      capacity: data?.capacity || 0,
      teacherId: data?.teacherId || "",
    },
  });

  // Mutation
  const {
    isPending,
    isError,
    error,
    mutate,
    reset: resetMutation,
  } = useMutation({
    mutationFn: async (values: Inputs) => {
      if (type === "create") {
        return await createClass(values);
      } else {
        return await updateClass(values);
      }
    },
    onSuccess: () => {
      toast.success(
        `Class is ${type === "create" ? "created" : "updated"} successfully`
      );
      form.reset();
      onClose?.();
    },
  });

  const onSubmit = (values: Inputs) => {
    mutate(values);
  };

  return (
    <Card className="w-full py-4 border-0">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Class Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter class name" {...field} />
                  </FormControl>
                  {isError && (
                    <p className="text-xs font-medium text-destructive mt-1">
                      {error?.message}
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Capacity */}
              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Capacity</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="30" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Teacher */}
              <FormField
                control={form.control}
                name="teacherId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teacher</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select teacher" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {teachers?.length === 0 ? (
                          <SelectItem value="empty" disabled>
                            No teachers found
                          </SelectItem>
                        ) : (
                          teachers?.map((teacher: any) => (
                            <SelectItem key={teacher.id} value={teacher.id}>
                              {teacher.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Form actions */}
            <div className="flex justify-end gap-x-2">
              <Button
                variant="destructive"
                type="reset"
                onClick={() => {
                  form.reset();
                  resetMutation();
                }}
                disabled={isPending}
              >
                Reset
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <LoaderCircle className="animate-spin h-4 w-4 mr-2" />
                    {type === "create" ? "Creating..." : "Updating..."}
                  </>
                ) : type === "create" ? (
                  "Create"
                ) : (
                  "Update"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ClassForm;
