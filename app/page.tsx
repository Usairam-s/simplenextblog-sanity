import { Button } from "@/components/ui/button";
import { simpleBlogCard } from "./lib/interface";
import { client, urlFor } from "./lib/sanity";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

async function getData() {
  const query = `*[_type == 'blog']{
    title,
      smallDescription,
      "currentSlug" : slug.current, 
      titleImage
  }`;

  const data = await client.fetch(query);
  return data;
}

export default async function Home() {
  const data: simpleBlogCard[] = await getData();

  console.log(data);

  return (
    <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
      {data.map((blog) => (
        <Card
          key={blog.currentSlug}
          className="hover:scale-105 transition-all ease-in-out duration-500 shadow-lg border dark:border-gray-600 border-gray-300"
        >
          <CardHeader>
            <CardTitle>
              <div className="w-200 h-[142px] overflow-hidden">
                <Image
                  src={urlFor(blog.titleImage).url()}
                  alt="image"
                  width={200}
                  height={142}
                  className="object-cover w-full h-full rounded-md"
                />
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="font-semibold">{blog.title}</p>
          </CardContent>
          <CardContent>
            <p className="text-gray-500 line-clamp-2">
              {blog.smallDescription}
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href={`/blog/${blog.currentSlug}`}>Read more</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
