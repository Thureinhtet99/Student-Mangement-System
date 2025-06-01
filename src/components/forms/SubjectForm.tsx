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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { subjectFormSchema } from "@/data/formSchema";
import { useState } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

// Schema type
type Inputs = z.infer<typeof subjectFormSchema>;

const SubjectForm = ({
  type,
  data,
  teachers = [],
  lessons = [],
}: {
  type: "create" | "update";
  data?: any;
  teachers?: { id: string; name: string }[];
  lessons?: { id: number; name: string }[];
}) => {
  const [selectedTeachers, setSelectedTeachers] = useState<string[]>(
    data?.teachers?.map((t: any) => t.id) || []
  );
  const [selectedLessons, setSelectedLessons] = useState<number[]>(
    data?.lessons?.map((l: any) => l.id) || []
  );

  const form = useForm<Inputs>({
    resolver: zodResolver(subjectFormSchema),
    defaultValues: {
      name: data?.name || "",
      // teacherIds: selectedTeachers,
      // lessonIds: selectedLessons,
    },
  });

  // onSubmit
  const onSubmit = (values: Inputs) => {
    console.log(values);
  };

  const handleTeacherSelect = (teacherId: string) => {
    setSelectedTeachers((current) =>
      current.includes(teacherId)
        ? current.filter((id) => id !== teacherId)
        : [...current, teacherId]
    );
  };

  const handleLessonSelect = (lessonId: number) => {
    setSelectedLessons((current) =>
      current.includes(lessonId)
        ? current.filter((id) => id !== lessonId)
        : [...current, lessonId]
    );
  };

  const removeTeacher = (teacherId: string) => {
    setSelectedTeachers(selectedTeachers.filter((id) => id !== teacherId));
  };

  const removeLessonId = (lessonId: number) => {
    setSelectedLessons(selectedLessons.filter((id) => id !== lessonId));
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
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter subject name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Select Teachers</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !selectedTeachers.length && "text-muted-foreground"
                      )}
                    >
                      {selectedTeachers.length > 0
                        ? `${selectedTeachers.length} teacher${
                            selectedTeachers.length > 1 ? "s" : ""
                          } selected`
                        : "Select teachers"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search teachers..." />
                    <CommandEmpty>No teacher found.</CommandEmpty>
                    <CommandGroup className="max-h-64 overflow-y-auto">
                      {teachers.map((teacher) => (
                        <CommandItem
                          key={teacher.id}
                          value={teacher.name}
                          onSelect={() => handleTeacherSelect(teacher.id)}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedTeachers.includes(teacher.id)
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {teacher.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              {selectedTeachers.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedTeachers.map((teacherId) => {
                    const teacher = teachers.find((t) => t.id === teacherId);
                    return (
                      <Badge
                        key={teacherId}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {teacher?.name}
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

            <FormItem>
              <FormLabel>Select Lessons</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !selectedLessons.length && "text-muted-foreground"
                      )}
                    >
                      {selectedLessons.length > 0
                        ? `${selectedLessons.length} lesson${
                            selectedLessons.length > 1 ? "s" : ""
                          } selected`
                        : "Select lessons"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search lessons..." />
                    <CommandEmpty>No lesson found.</CommandEmpty>
                    <CommandGroup className="max-h-64 overflow-y-auto">
                      {lessons.map((lesson) => (
                        <CommandItem
                          key={lesson.id}
                          value={lesson.name}
                          onSelect={() => handleLessonSelect(lesson.id)}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedLessons.includes(lesson.id)
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {lesson.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              {selectedLessons.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedLessons.map((lessonId) => {
                    const lesson = lessons.find((l) => l.id === lessonId);
                    return (
                      <Badge
                        key={lessonId}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {lesson?.name}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => removeLessonId(lessonId)}
                        />
                      </Badge>
                    );
                  })}
                </div>
              )}
              <FormDescription>
                Select the lessons associated with this subject.
              </FormDescription>
            </FormItem>

            <div className="flex justify-end gap-x-2">
              <Button
                variant="destructive"
                type="reset"
                onClick={() => {
                  form.reset();
                  setSelectedTeachers([]);
                  setSelectedLessons([]);
                }}
                // disabled={isLoading}
              >
                Reset
              </Button>
              <Button
                type="submit"
                // disabled={isLoading}
              >
                {type === "create" ? "Create" : "Update"}
                {/* {isLoading
                  ? "Processing..."
                  : type === "create"
                  ? "Create"
                  : "Update"} */}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SubjectForm;
