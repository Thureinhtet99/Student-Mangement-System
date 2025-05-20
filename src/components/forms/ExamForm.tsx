"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { examFormSchema } from "@/data/formSchema";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

// Schema type
type Inputs = z.infer<typeof examFormSchema>;

const ExamForm = ({
  type,
  data,
}: // subjects: [],
// teachers: [],
// lessons: [],
{
  type: "create" | "update";
  data?: any;
  // subjects: { id: number; name: string }[];
  // lessons: { id: number; name: string }[];
  // teachers: { id: string; name: string }[];
}) => {
  // useForm
  const form = useForm<Inputs>({
    resolver: zodResolver(examFormSchema),
    defaultValues: {
      title: data?.title,
      startTime: data?.startDate || null,
      dueTime: data?.endDate || null,
      lessonId: data?.classId,
    },
  });

  // onSubmit
  const onSubmit = (values: Inputs) => {
    console.log(values);
  };

  return (
    <Card className="w-full py-4">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter assignment title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="subjectId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subjects</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/* {lessons.map((lessonItem) => (
                        <SelectItem key={lessonItem.id} value={lessonItem.name}>
                          {lessonItem.name}
                        </SelectItem>
                      ))}
                      {lessons.length === 0 && (
                        <SelectItem value="no-classes" disabled>
                          No classes available
                        </SelectItem>
                      )} */}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lessonId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/* {lessons.map((lessonItem) => (
                        <SelectItem key={lessonItem.id} value={lessonItem.name}>
                          {lessonItem.name}
                        </SelectItem>
                      ))}
                      {lessons.length === 0 && (
                        <SelectItem value="no-classes" disabled>
                          No classes available
                        </SelectItem>
                      )} */}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="lessonId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teacher</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select teacher" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/* {lessons.map((lessonItem) => (
                        <SelectItem key={lessonItem.id} value={lessonItem.name}>
                          {lessonItem.name}
                        </SelectItem>
                      ))}
                      {lessons.length === 0 && (
                        <SelectItem value="no-classes" disabled>
                          No classes available
                        </SelectItem>
                      )} */}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start time</FormLabel>
                    <FormControl>
                      <Input
                        type="datetime-local"
                        onChange={(e) => {
                          const date = new Date(e.target.value);
                          field.onChange(date);
                        }}
                        value={
                          field.value instanceof Date
                            ? field.value.toISOString().split("T")[0]
                            : ""
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End time</FormLabel>
                    <FormControl>
                      <Input
                        type="datetime-local"
                        onChange={(e) => {
                          const date = new Date(e.target.value);
                          field.onChange(date);
                        }}
                        value={
                          field.value instanceof Date
                            ? field.value.toISOString().split("T")[0]
                            : ""
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-x-2">
              <Button
                variant="destructive"
                type="reset"
                className="w-full md:w-auto"
                onClick={() => form.reset()}
              >
                Reset
              </Button>
              <Button type="submit" className="w-full md:w-auto">
                {type === "create" ? "Create" : "Update"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ExamForm;
