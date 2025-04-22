import SimpleEditor from "@/components/tiptap/simple-editor";
import prisma from "@/lib/prisma";
import { ArrowLeft, Calendar } from "lucide-react";
import { notFound } from "next/navigation";
import React from "react";
import { format } from "date-fns";
import Link from "next/link";
import ModeToggle from "@/components/modeToggle";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blog = await prisma.blog.findUnique({
    where: {
      id: id,
    },
  });
  if (!blog) return notFound();
  return (
    <>
      <div className="max-w-6xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ArrowLeft className="size-4" />
            <Link href="/blogs">Back to Blogs</Link>
          </div>
          <ModeToggle />
        </div>
      </div>
      <article className="max-w-6xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
        <div className="flex gap-1 items-center justify-center py-4">
          <Calendar className="size-4" />
          <p className="text-muted-foreground tracking-tight text-center">
            {format(new Date(blog.createdAt), "EEEE, MMMM do yyyy")}
          </p>
        </div>
        <h1 className="text-3xl font-bold text-center">{blog?.title}</h1>

        <div className="max-w-5xl mx-auto py-16">
          <SimpleEditor
            // editable={false}
            content={blog?.content}
            // className="bg-yellow-100"
          />
        </div>
      </article>
    </>
  );
}
