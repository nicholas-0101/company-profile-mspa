import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { title, thumbnail, content, categories, published } = body;

    const slugify = (text: string) => {
      return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
    }

    const data: any = {};
    if (title !== undefined) {
      data.title = title;
      data.slug = slugify(title);
    }
    if (thumbnail !== undefined) data.thumbnail = thumbnail;
    if (content !== undefined) data.content = content;
    if (categories !== undefined) data.categories = categories;
    if (published !== undefined) data.published = published;

    const updatedBlog = await prisma.blog.update({
      where: { id },
      data
    });

    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    await prisma.blog.delete({
      where: { id }
    });

    return NextResponse.json({ message: "Blog deleted" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
