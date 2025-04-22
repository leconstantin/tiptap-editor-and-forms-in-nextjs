"use client";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import TextareaAutosize from "react-textarea-autosize";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SimpleEditor from "../tiptap/simple-editor";
import { Separator } from "../tiptap-ui-primitive/separator";
import { toast } from "sonner";
import { createBlogPost } from "@/actions/blog.action";

const FormSchema = z.object({
  title: z
    .string()
    .min(10, { message: "Title must be at least 10 characters." })
    .max(160, { message: "Title must not be longer than 160 characters." }),
  description: z.string().optional(),
  content: z.string().min(1, { message: "Content cannot be empty." }),
});

export type TFormSchema = z.infer<typeof FormSchema>;

export default function EditorForm() {
  const form = useForm<TFormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
    },
  });

  // Memoize onSubmit to avoid unnecessary re-creations
  const onSubmit = useCallback(async (data: TFormSchema) => {
    try {
      const result = await createBlogPost(data);
      if (result?.success) {
        toast.success(
          <div>
            <strong>You submitted the following title:</strong>
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(result.data?.title, null, 2)}
              </code>
            </pre>
          </div>
        );
        form.reset();
      } else {
        toast.error("Failed to Create Blog Post");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    }
  }, []);

  // Memoize editor change handler for performance
  const handleEditorChange = useCallback(
    (html: string) => {
      form.setValue("content", html);
    },
    [form]
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 max-w-6xl mx-auto mt-10"
      >
        <div className="flex items-center justify-end">
          <Button type="submit" className="justify-end w-fit cursor-pointer">
            Submit
          </Button>
        </div>

        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Title</FormLabel>
                <FormControl>
                  <TextareaAutosize
                    className="w-full resize-none appearance-none overflow-hidden bg-transparent text-3xl font-bold focus:outline-0"
                    placeholder="Untitled"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Description</FormLabel>
                <FormControl>
                  <TextareaAutosize
                    className="w-full resize-none appearance-none overflow-hidden bg-transparent text-base tracking-tight text-muted-foreground focus:outline-0"
                    placeholder="Type your descriptio here... (optional)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator orientation="horizontal" />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Content</FormLabel>
                <FormControl>
                  <SimpleEditor
                    editable={true}
                    content={field.value}
                    onChange={handleEditorChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
