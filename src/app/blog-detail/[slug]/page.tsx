import { Metadata, ResolvingMetadata } from "next";
import { Calendar, User2, ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const slug = (await params).slug;
    const blog = await prisma.blog.findUnique({
      where: { slug },
    });

    if (!blog) return { title: "Blog Not Found" };

    return {
      title: `${blog.title} | MS Putra Abadi`,
      description: blog.content.substring(0, 160),
      openGraph: {
        title: blog.title,
        description: blog.content.substring(0, 160),
        images: [blog.thumbnail],
      },
    };
  } catch (error) {
    console.error("Metadata generation error:", error);
    return { title: "MS Putra Abadi" };
  }
}

interface IBlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

const getDetail = async (slug: string) => {
  try {
    const blog = await prisma.blog.findUnique({
      where: { slug },
      include: {
        account: {
          select: { username: true }
        }
      }
    });
    return blog;
  } catch (error) {
    console.error("Failed to fetch blog detail:", error);
    return null;
  }
};

async function BlogDetailPage(props: IBlogDetailPageProps) {
  const params = await props.params;
  const detail = await getDetail(params.slug);

  if (!detail) {
    return (
      <section className="min-h-screen flex items-center justify-center pb-40">
        <div className="text-center">
          <h1 className="text-2xl md:text-4xl font-bold text-[#18182b]">Blog tidak ditemukan</h1>
          <Link href="/blog" className="text-blue-600 hover:underline mt-4 inline-block">
            Kembali ke Jelajahi Blog
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white min-h-screen pb-32">
      <div className="max-w-4xl mx-auto px-6 pt-24 flex flex-col gap-8">
        {/* Back Button */}
        <Link 
          href="/blog" 
          className="flex items-center gap-2 text-gray-500 hover:text-[#18182b] transition-colors w-fit group"
        >
          <ChevronLeft className="size-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Kembali ke Blog</span>
        </Link>

        {/* Header Section */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <span className="bg-[#18182b] text-white text-xs font-bold px-4 py-1.5 rounded-full w-fit uppercase tracking-wider">
              {detail.categories}
            </span>
            <h1 className="text-3xl md:text-5xl font-serif font-black text-[#18182b] leading-tight">
              {detail.title}
            </h1>
          </div>

          <div className="flex items-center gap-6 text-gray-500 border-y border-gray-100 py-4">
            <div className="flex items-center gap-2">
              <Calendar className="size-4" />
              <span className="text-sm font-medium">
                {new Date(detail.createdAt).toLocaleDateString("id-ID", {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <User2 className="size-4" />
              <span className="text-sm font-medium">{detail.account?.username || "Penulis"}</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative aspect-video w-full rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src={detail.thumbnail || ""}
            fill
            alt={detail.title}
            className="object-cover"
            priority
          />
        </div>

        {/* Content Section */}
        <article className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify whitespace-pre-line">
            {detail.content}
          </p>
        </article>

        {/* Footer info */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <p className="text-gray-400 text-sm italic text-center">
            &copy; {new Date().getFullYear()} MS Putra Abadi. Seluruh hak cipta dilindungi.
          </p>
        </div>
      </div>
    </section>
  );
}

export default BlogDetailPage;