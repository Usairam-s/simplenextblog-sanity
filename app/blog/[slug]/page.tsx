import { fullBlog } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { blob } from "stream/consumers";

async function getData(slug: string) {
  const query = `*[_type == 'blog' && slug.current=="${slug}"]{
        title,
          content,
          "currentSlug" : slug.current,
          titleImage,
      }[0]`;

  const data = await client.fetch(query);
  return data;
}

export default async function BlogArricle({
  params,
}: {
  params: { slug: string };
}) {
  const data: fullBlog = await getData(params.slug);

  console.log(data);

  return (
    <div>
      <p className=" my-6  text-primary text-center tracking-wider">
        Usairam Saleem - Blog
      </p>

      <h1 className=" leading-12  text-4xl text-center font-bold">
        {data.title}
      </h1>
      <Image
        src={urlFor(data.titleImage).url()}
        alt="main_image"
        width={800}
        height={400}
        className="w-full rounded-lg mt-8 border object-cover"
        style={{ maxHeight: "400px", height: "auto" }}
      />
      <div className="mt-16 prose prose-xl prose-a:text-primary prose-green prose-headings:blur-3xl dark:prose-invert  w-full max-w-none">
        <PortableText value={data.content} />
      </div>
    </div>
  );
}
