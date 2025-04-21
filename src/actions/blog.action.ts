"use server";

import { TFormSchema } from "@/components/form/editorForm";
import prisma from "@/lib/prisma";

export async function createBlogPost(data: TFormSchema) {
  try {
    const existingBlog = await prisma.blog.findFirst({
      where: {
        title: data.title,
      },
    });

    if (existingBlog) return;

    const blog = await prisma.blog.create({
      data: {
        title: data.title,
        content: data.content,
        description: data.description,
      },
    });
    return { success: true, data: blog };
  } catch (error) {
    console.error("Failed to create blog:", error);
    return { success: false, error: "Failed to create blog." };
  }
}
