"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpFromLine, LoaderCircle, Eye, EyeOff } from "lucide-react";
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
import { studentFormSchema } from "@/lib/formSchema";
import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "../ui/label";
import { useMutation } from "@tanstack/react-query";
import { createStudent, updateStudent } from "@/lib/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Schema type
type Inputs = z.infer<typeof studentFormSchema>;

const StudentForm = ({
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

  const classes = relatedData?.classes || [];

  const form = useForm<Inputs>({
    resolver: zodResolver(studentFormSchema),
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
      classId: data?.classId || null,
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
        return await createStudent(values);
      } else {
        return await updateStudent(values);
      }
    },
    onSuccess: () => {
      toast.success(
        `Student ${type === "create" ? "created" : "updated"} successfully`
      );
      form.reset();
      onClose?.();
    },
    onError: (error) => {
      toast.error(
        `Failed to ${type === "create" ? "create" : "update"} student: ${
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
                            <Input placeholder="Enter address" {...field} />
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
                              defaultValue={field.value}
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

                    <FormField
                      control={form.control}
                      name="classId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Class</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            // defaultValue={field.value?.toString()}
                            value={
                              field.value ? String(field.value) : undefined
                            }
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
                                    // This is a placeholder for actual image upload logic
                                    // In a real app, you would upload to your server or cloud storage
                                    toast.loading("Uploading image...");

                                    // Simulate upload delay
                                    setTimeout(() => {
                                      // Create a temporary URL for preview
                                      const imageUrl =
                                        URL.createObjectURL(file);
                                      field.onChange(imageUrl);
                                      toast.dismiss();
                                      toast.success(
                                        "Image uploaded successfully"
                                      );
                                    }, 1500);
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

export default StudentForm;
