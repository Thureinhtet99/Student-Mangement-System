"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Eye, EyeOff, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Card, CardContent } from "@/components/ui/card";
import { parentFormSchema } from "@/lib/formSchema";
import { useState } from "react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { useMutation } from "@tanstack/react-query";
import { createParent, updateParent } from "@/lib/actions";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";
// Schema type
type Inputs = z.infer<typeof parentFormSchema>;

const ParentForm = ({
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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<string[]>(
    data?.students?.map((t: any) => t.id) || []
  );
  const [studentSearchQuery, setStudentSearchQuery] = useState("");

  const students = relatedData?.students || [];

  const form = useForm<Inputs>({
    resolver: zodResolver(parentFormSchema),
    defaultValues: {
      username: data?.username || "",
      email: data?.email || "",
      password: data?.password || "",
      name: data?.name || "",
      phone: data?.phone || "",
      address: data?.address || "",
      students: data?.students?.map((t: any) => t.id) || [],
    },
  });

  const filteredStudents = students.filter((student: any) =>
    student.name.toLowerCase().includes(studentSearchQuery.toLowerCase())
  );

  const toggleStudentSelection = (studentId: string) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const removeStudent = (studentId: string) => {
    setSelectedStudents((prev) => prev.filter((id) => id !== studentId));
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
        return await createParent(values);
      } else {
        return await updateParent(values);
      }
    },
    onSuccess: () => {
      toast.success(
        `Parent ${type === "create" ? "created" : "updated"} successfully`
      );
      form.reset();
      setSelectedStudents([]); // Reset selected students
      onClose?.();
    },
    onError: (error) => {
      toast.error(
        `Failed to ${type === "create" ? "create" : "update"} parent: ${
          error.message
        }`
      );
    },
  });

  // onSubmit
  const onSubmit = (values: Inputs) => {
    const formData = {
      ...(type === "update" && data?.id && { id: data.id }),
      ...values,
      students: selectedStudents,
    };
    mutate(formData);
  };

  return (
    <Card className="w-full shadow-sm">
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 py-4"
          >
            {isError && (
              <div className="bg-destructive/15 p-3 rounded-md">
                <p className="text-sm font-medium text-destructive">
                  {error?.message || "Something went wrong. Please try again."}
                </p>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-6">
                  Account Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={isPasswordVisible ? "text" : "password"}
                              placeholder="••••••••"
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                              onClick={() =>
                                setIsPasswordVisible(!isPasswordVisible)
                              }
                            >
                              {isPasswordVisible ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-6">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-8">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="Enter phone"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter address" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-8">
                    <FormField
                      control={form.control}
                      name="students"
                      render={({ field, fieldState }) => (
                        <FormItem className="space-y-2">
                          <FormLabel>Students</FormLabel>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-between"
                                type="button"
                              >
                                <span>
                                  {selectedStudents.length > 0
                                    ? `${selectedStudents.length} student${
                                        selectedStudents.length > 1 ? "s" : ""
                                      } selected`
                                    : "Select students"}
                                </span>
                                <Search className="h-4 w-4 ml-2 opacity-50" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Select Students</DialogTitle>
                              </DialogHeader>
                              <div className="py-4">
                                <div className="relative mb-4">
                                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                  <Input
                                    placeholder="Search students..."
                                    value={studentSearchQuery}
                                    onChange={(e) =>
                                      setStudentSearchQuery(e.target.value)
                                    }
                                    className="pl-8"
                                  />
                                </div>
                                <ScrollArea className="h-[300px] pr-4">
                                  {filteredStudents.length === 0 ? (
                                    <p className="text-center text-muted-foreground py-4">
                                      No students found
                                    </p>
                                  ) : (
                                    <div className="space-y-3">
                                      {filteredStudents.map((student: any) => (
                                        <div
                                          key={student.id}
                                          className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted/50"
                                        >
                                          <Checkbox
                                            id={`student-${student.id}`}
                                            checked={selectedStudents.includes(
                                              student.id
                                            )}
                                            onCheckedChange={() => {
                                              toggleStudentSelection(
                                                student.id
                                              );
                                              field.onChange(
                                                selectedStudents.includes(
                                                  student.id
                                                )
                                                  ? selectedStudents.filter(
                                                      (id) => id !== student.id
                                                    )
                                                  : [
                                                      ...selectedStudents,
                                                      student.id,
                                                    ]
                                              );
                                            }}
                                          />
                                          <label
                                            htmlFor={`student-${student.id}`}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                                          >
                                            {student.name}
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
                          {selectedStudents.length > 0 && (
                            <div className="flex flex-wrap gap-2 max-h-[100px] overflow-y-auto p-1">
                              {selectedStudents.map((studentId) => {
                                const student = students.find(
                                  (s: any) => s.id === studentId
                                );
                                return (
                                  <Badge
                                    key={studentId}
                                    variant="secondary"
                                    className="flex items-center gap-1 py-1.5"
                                  >
                                    {student?.name}
                                    <X
                                      className="h-3 w-3 cursor-pointer ml-1"
                                      onClick={() => {
                                        removeStudent(studentId);
                                        field.onChange(
                                          selectedStudents.filter(
                                            (id) => id !== studentId
                                          )
                                        );
                                      }}
                                    />
                                  </Badge>
                                );
                              })}
                            </div>
                          )}
                          <FormMessage />
                          {!fieldState.error && (
                            <FormDescription>
                              Select the students of this parent
                            </FormDescription>
                          )}
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-x-3 pt-4">
              <Button
                variant="outline"
                type="button"
                className="w-full sm:w-auto"
                onClick={() => {
                  form.reset();
                  resetMutation();
                }}
                disabled={isPending}
              >
                Reset
              </Button>
              <Button
                type="submit"
                className="w-full sm:w-auto"
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

export default ParentForm;
