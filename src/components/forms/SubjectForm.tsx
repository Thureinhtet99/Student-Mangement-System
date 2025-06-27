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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { subjectFormSchema } from "@/lib/formSchema";
import { useState } from "react";
import { LoaderCircle, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { createSubject, updateSubject } from "@/lib/actions";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input as SearchInput } from "@/components/ui/input";

// Schema type
type Inputs = z.infer<typeof subjectFormSchema>;

const SubjectForm = ({
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
  const [selectedTeachers, setSelectedTeachers] = useState<string[]>(
    data?.teachers?.map((t: any) => t.id) || []
  );
  const [teacherSearchQuery, setTeacherSearchQuery] = useState("");

  const teachers = relatedData?.teachers || [];

  const form = useForm<Inputs>({
    resolver: zodResolver(subjectFormSchema),
    defaultValues: {
      id: data?.id || null,
      name: data?.name || "",
      description: data?.description || "",
    },
  });

  const filteredTeachers = teachers.filter((teacher: any) =>
    teacher.name.toLowerCase().includes(teacherSearchQuery.toLowerCase())
  );

  const toggleTeacherSelection = (teacherId: string) => {
    setSelectedTeachers((prev) =>
      prev.includes(teacherId)
        ? prev.filter((id) => id !== teacherId)
        : [...prev, teacherId]
    );
  };

  const removeTeacher = (teacherId: string) => {
    setSelectedTeachers((prev) => prev.filter((id) => id !== teacherId));
  };

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
        return await createSubject(values);
      } else {
        return await updateSubject(values);
      }
    },
    onSuccess: () => {
      toast.success(
        `Subject is ${type === "create" ? "created" : "updated"} successfully`
      );
      form.reset();
      setSelectedTeachers([]);
      onClose?.();
    },
    onError: (error) => {
      toast.error(
        `Failed to ${type === "create" ? "create" : "update"} subject: ${
          error.message
        }`
      );
    },
  });

  const onSubmit = (values: Inputs) => {
    const formData = {
      ...values,
      teachers: selectedTeachers,
    };
    mutate(formData);
  };

  return (
    <Card className="w-full py-4 border-0">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {isError && (
              <div className="bg-destructive/15 p-3 rounded-md mb-4">
                <p className="text-sm font-medium text-destructive">
                  Error:{" "}
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
                    <Input placeholder="Enter subject name" {...field} />
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
              {/* Teacher Selection Dialog */}
              <FormItem className="flex flex-col space-y-2">
                <FormLabel>Select Teachers</FormLabel>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                    >
                      {selectedTeachers.length > 0
                        ? `${selectedTeachers.length} teacher${
                            selectedTeachers.length > 1 ? "s" : ""
                          } selected`
                        : "Select teachers"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Select Teachers</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                      <SearchInput
                        placeholder="Search teachers..."
                        value={teacherSearchQuery}
                        onChange={(e) => setTeacherSearchQuery(e.target.value)}
                        className="mb-4"
                      />
                      <ScrollArea className="h-[300px] pr-4">
                        {filteredTeachers.length === 0 ? (
                          <p className="text-center text-muted-foreground py-4">
                            No teachers found
                          </p>
                        ) : (
                          <div className="space-y-2">
                            {filteredTeachers.map((teacher: any) => (
                              <div
                                key={teacher.id}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  id={`teacher-${teacher.id}`}
                                  checked={selectedTeachers.includes(
                                    teacher.id
                                  )}
                                  onCheckedChange={() =>
                                    toggleTeacherSelection(teacher.id)
                                  }
                                />
                                <label
                                  htmlFor={`teacher-${teacher.id}`}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                >
                                  {teacher.name}
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
                {selectedTeachers.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2 max-h-[100px] overflow-y-auto p-1">
                    {selectedTeachers.map((teacherId) => {
                      const teacher = teachers.find(
                        (t: any) => t.id === teacherId
                      );
                      return (
                        <Badge
                          key={teacherId}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {teacher?.name || teacherId}
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => removeTeacher(teacherId)}
                          />
                        </Badge>
                      );
                    })}
                  </div>
                )}
                <FormDescription>
                  Select the teachers who will be teaching this subject.
                </FormDescription>
              </FormItem>
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter subject description"
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a brief description of the subject (optional).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-x-2">
              <Button
                variant="destructive"
                type="reset"
                className="w-full md:w-auto"
                onClick={() => {
                  form.reset();
                  setSelectedTeachers([]);
                  resetMutation();
                }}
                disabled={isPending}
              >
                Reset
              </Button>
              <Button
                type="submit"
                className="w-full md:w-auto"
                disabled={isPending}
              >
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

export default SubjectForm;
