import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import prisma from "@/lib/prisma";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import React from "react";

export default async function page() {
  const blogs = await prisma.blog.findMany();
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {blogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4">
          {blogs.map((blog) => (
            <Card key={blog.id}>
              <CardHeader>
                <CardTitle>{blog.title}</CardTitle>
                {blog.description && (
                  <CardDescription>Card Description</CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link href={`/blogs/${blog.id}`}>Read More</Link>
                </Button>
              </CardContent>
              <CardFooter>
                <div className="flex gap-1 items-center">
                  <Calendar className="size-4" />
                  <p className="text-muted-foreground tracking-tight">
                    {format(new Date(blog.createdAt), "EEEE, MMMM do yyyy")}
                  </p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : null}
    </div>
  );
}
