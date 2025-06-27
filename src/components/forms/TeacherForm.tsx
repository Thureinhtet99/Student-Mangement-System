"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowUpFromLine,
  LoaderCircle,
  Search,
  X,
  Eye,
  EyeOff,
} from "lucide-react";
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
import { Card, CardContent} from "@/components/ui/card";
import { teacherFormSchema } from "@/lib/formSchema";
import { useState } from "react";
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
import { useMutation } from "@tanstack/react-query";
import { createTeacher, updateTeacher } from "@/lib/actions";
import { toast } from "sonner";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "../ui/label";
import { Separator } from "@/components/ui/separator";

// Schema type
type Inputs = z.infer<typeof teacherFormSchema>;

const TeacherForm = ({
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
  const [selectedSubjects, setSelectedSubjects] = useState<number[]>(
    data?.subjects?.map((t: any) => t.id) || []
  );
  const [subjectSearchQuery, setSubjectSearchQuery] = useState("");

  const subjects = relatedData?.subjects || [];

  const form = useForm<Inputs>({
    resolver: zodResolver(teacherFormSchema),
    defaultValues: {
      username: data?.username || "",
      email: data?.email || "",
      password: data?.password || "",
      name: data?.name || "",
      phone: data?.phone || "",
      address: data?.address || "",
      gender: data?.gender || "MALE",
      birthday: data?.birthday ? new Date(data.birthday) : undefined,
      image: data?.image || "",
    },
  });

  const filteredSubjects = subjects.filter((subject: any) =>
    subject.name.toLowerCase().includes(subjectSearchQuery.toLowerCase())
  );

  const toggleSubjectSelection = (subjectId: number) => {
    setSelectedSubjects((prev) =>
      prev.includes(subjectId)
        ? prev.filter((id) => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  const removeSubject = (subjectId: number) => {
    setSelectedSubjects((prev) => prev.filter((id) => id !== subjectId));
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
        return await createTeacher(values);
      } else {
        return await updateTeacher(values);
      }
    },
    onSuccess: () => {
      toast.success(
        `Teacher ${type === "create" ? "created" : "updated"} successfully`
      );
      form.reset();
      setSelectedSubjects([]);
      onClose?.();
    },
    onError: (error) => {
      toast.error(
        `Failed to ${type === "create" ? "create" : "update"} teacher: ${
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
      subjects: selectedSubjects,
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
                          <Input
                            type="text"
                            placeholder="Enter username"
                            {...field}
                          />
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
                              placeholder="********"
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
                            <Input
                              type="text"
                              placeholder="Enter name"
                              {...field}
                            />
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
                          <FormMessage />
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
                            <Input
                              type="text"
                              placeholder="Enter address"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-8">
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <div className="flex items-center gap-2">
                                <RadioGroupItem value="MALE" id="male" />
                                <Label htmlFor="male">Male</Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <RadioGroupItem value="FEMALE" id="female" />
                                <Label htmlFor="female">Female</Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="birthday"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Birth</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              onChange={(e) => {
                                const value = e.target.value;
                                field.onChange(
                                  value ? new Date(value) : undefined
                                );
                              }}
                              value={
                                field.value instanceof Date &&
                                !isNaN(field.value.getTime())
                                  ? field.value.toISOString().split("T")[0]
                                  : undefined
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormItem className="space-y-2">
                      <FormLabel>Subjects</FormLabel>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-between"
                            type="button"
                          >
                            <span>
                              {selectedSubjects.length > 0
                                ? `${selectedSubjects.length} subject${
                                    selectedSubjects.length > 1 ? "s" : ""
                                  } selected`
                                : "Select subjects"}
                            </span>
                            <Search className="h-4 w-4 ml-2 opacity-50" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Select Subjects</DialogTitle>
                          </DialogHeader>
                          <div className="py-4">
                            <div className="relative mb-4">
                              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="Search subjects..."
                                value={subjectSearchQuery}
                                onChange={(e) =>
                                  setSubjectSearchQuery(e.target.value)
                                }
                                className="pl-8"
                              />
                            </div>
                            <ScrollArea className="h-[300px] pr-4">
                              {filteredSubjects.length === 0 ? (
                                <p className="text-center text-muted-foreground py-4">
                                  No subjects found
                                </p>
                              ) : (
                                <div className="space-y-3">
                                  {filteredSubjects.map((subject: any) => (
                                    <div
                                      key={subject.id}
                                      className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted/50"
                                    >
                                      <Checkbox
                                        id={`subject-${subject.id}`}
                                        checked={selectedSubjects.includes(
                                          subject.id
                                        )}
                                        onCheckedChange={() =>
                                          toggleSubjectSelection(subject.id)
                                        }
                                      />
                                      <label
                                        htmlFor={`subject-${subject.id}`}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                                      >
                                        {subject.name}
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
                      {selectedSubjects.length > 0 && (
                        <div className="flex flex-wrap gap-2 max-h-[100px] overflow-y-auto p-1">
                          {selectedSubjects.map((subjectId) => {
                            const subject = subjects.find(
                              (t: any) => t.id === subjectId
                            );
                            return (
                              <Badge
                                key={subjectId}
                                variant="secondary"
                                className="flex items-center gap-1 py-1.5"
                              >
                                {subject?.name}
                                <X
                                  className="h-3 w-3 cursor-pointer ml-1"
                                  onClick={() => removeSubject(subjectId)}
                                />
                              </Badge>
                            );
                          })}
                        </div>
                      )}
                      <FormDescription>
                        Select the subjects this teacher will be teaching.
                      </FormDescription>
                    </FormItem>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-6">Profile Picture</h3>
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                          <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-primary/20 bg-muted flex items-center justify-center">
                            {field.value ? (
                              <Image
                                src={field.value}
                                alt="Profile"
                                fill
                                className="object-cover"
                                sizes="128px"
                              />
                            ) : (
                              <span className="text-muted-foreground text-xs text-center px-2">
                                No image selected
                              </span>
                            )}
                          </div>

                          <div className="space-y-3 flex-1 w-full sm:w-auto">
                            <div className="flex flex-col gap-2">
                              <Input
                                type="file"
                                id="imageUpload"
                                accept="image/jpeg,image/png,image/jpg,image/webp"
                                className="hidden"
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (!file) return;

                                  if (file.size > 2000000) {
                                    toast.error(
                                      "File size must be less than 2MB"
                                    );
                                    return;
                                  }

                                  try {
                                    const formData = new FormData();
                                    formData.append("image", file);
                                    formData.append(
                                      "upload_preset",
                                      "student_management_system"
                                    );

                                    toast.loading("Uploading image...");

                                    const response = await fetch(
                                      "https://api.cloudinary.com/v1_1/your-cloud-name/image/upload",
                                      {
                                        method: "POST",
                                        body: formData,
                                      }
                                    );

                                    if (!response.ok) {
                                      throw new Error("Upload failed");
                                    }

                                    const data = await response.json();
                                    field.onChange(data.secure_url);
                                    toast.dismiss();
                                    toast.success(
                                      "Image uploaded successfully"
                                    );
                                  } catch (error) {
                                    toast.dismiss();
                                    toast.error(
                                      `Upload failed: ${
                                        error instanceof Error
                                          ? error.message
                                          : "Unknown error"
                                      }`
                                    );
                                  }
                                }}
                              />
                              <Button
                                type="button"
                                variant="secondary"
                                className="flex items-center justify-center gap-2"
                                onClick={() =>
                                  document
                                    .getElementById("imageUpload")
                                    ?.click()
                                }
                              >
                                <ArrowUpFromLine className="h-4 w-4" />
                                {field.value ? "Change photo" : "Upload photo"}
                              </Button>

                              {field.value && (
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => field.onChange("")}
                                >
                                  Remove photo
                                </Button>
                              )}
                            </div>
                            <FormDescription>
                              Upload a profile picture (JPG, PNG or WebP, max
                              2MB)
                            </FormDescription>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end gap-x-3 pt-4">
              <Button
                variant="outline"
                type="button"
                className="w-full sm:w-auto"
                onClick={() => {
                  form.reset();
                  setSelectedSubjects([]);
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

export default TeacherForm;
