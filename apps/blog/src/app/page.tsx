import { getPosts } from "@/app/server-actions/posts";
import { PostsSection } from "@/components/PostsSection";
import { SearchAndFilter } from "@/components/SearchAndFilter";

type Props = {
  searchParams: Promise<{ 
    search?: string;
    area?: string;
}>
}

export default async function Home({ searchParams }: Props) {
  console.log('📄 Renderizando página inicial...')
  
  // Aguardar os searchParams
  const params = await searchParams
  const search = params?.search
  const area = params?.area
  
  const { data: posts = [] } = await getPosts(
    search,
    area as any
  )

  console.log('📄 Página inicial recebeu posts:', posts.length)

  return (
    <main className="container py-8 mx-auto">
      <h1 className="mb-8 text-4xl font-bold">Blog</h1>
      <SearchAndFilter />
      <PostsSection initialPosts={posts} />
    </main>
  )
}//