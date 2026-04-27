import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      include: {
        account: {
          select: { username: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const formattedBlogs = blogs.map(blog => ({
      ...blog,
      objectId: blog.id,
    }));

    return NextResponse.json(formattedBlogs, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, thumbnail, content, categories, accountId } = body;

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

    const newBlog = await prisma.blog.create({
      data: {
        title,
        slug: slugify(title),
        thumbnail,
        content,
        categories,
        accountId
      }
    });

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
