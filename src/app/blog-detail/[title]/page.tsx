import axios from "axios";
import { Calendar, User2 } from "lucide-react";
import Image from "next/image";

interface IBlogDetailPageProps {
  params: Promise<{ title: string }>;
}

const getDetail = async (title: string) => {
  try {
    const result = await axios.get(
      `https://awesomebucket-us.backendless.app/api/data/blogs?where=%60title%60%20%3D%20'${title}'&loadRelations=account`
    );
    console.log(result.data); // muncul di terminal vscode / server, bukan di inspect terminal web browser

    return result.data[0];
  } catch (error) {
    console.log(error);
  }
};

async function BlogDetailPage(props: IBlogDetailPageProps) {
  const params = await props.params;
  const detail = await getDetail(params.title);

  console.log(detail);
  return (
    <section className="flex justify-center pb-40">
      <div className="mt-10 flex flex-col gap-2 md:px-50 px-6 max-w-6xl">
        <div>
          <Image // using image from next/image, so the image link automaticly converted to webp and compresed
            src={detail.thumbnail || ""}
            width={1200}
            height={400}
            alt="thumbnail"
          />
        </div>
        <div className="flex gap-1 text-neutral-500 md:text-md">
          <div className="flex flex-col items-center justify-center">
            <Calendar className="size-4" />
          </div>
          <h2>{new Date(detail?.created).toLocaleDateString("id-ID")}</h2>
          <p>•</p>
          <div className="flex flex-col items-center justify-center">
            <User2 className="size-4" />
          </div>
          <h2>{detail.account.username}</h2>
        </div>
        <h1 className="text-xl md:text-3xl font-bold">
          {detail.title}
        </h1>
        <p className="text-justify">{detail.content}</p>
      </div>
    </section>
  );
}

export default BlogDetailPage;