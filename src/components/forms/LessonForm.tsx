"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { lessonFormSchema } from "@/data/formSchema";
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
type Inputs = z.infer<typeof lessonFormSchema>;

const LessonForm = ({
  type,
  data,
}: // assignments: [],
// attendances: [],
{
  type: "create" | "update";
  data?: any;
  // assignments: { id: number; title: string }[];
  // attendances: { id: number; date: string }[];
}) => {
  // useForm
  const form = useForm<Inputs>({
    resolver: zodResolver(lessonFormSchema),
    defaultValues: {
      name: data?.name,
      subjectId: data?.subjectId,
      classId: data?.classId,
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter lesson name" {...field} />
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
                name="classId"
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
                name="teacherId"
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

export default LessonForm;
