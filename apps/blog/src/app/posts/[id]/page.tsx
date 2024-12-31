import { getPost } from "@/app/server-actions/posts"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { BookOpen, CalendarIcon, UserCircle } from "lucide-react"
import { notFound } from "next/navigation"

type Props = {
  params: Promise<{ id: string }>
}

export default async function PostPage({ params }: Props) {
  const { id } = await params
  const { data: post, success } = await getPost(Number(id))

  if (!success || !post) {
    notFound()
  }

  return (
    <article className="max-w-4xl px-4 py-8 mx-auto md:py-12">
      {/* Hero Section */}
      <div className="mb-12 space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight">
            {post.title}
          </h1>
          <p className="text-xl leading-relaxed md:text-2xl text-muted-foreground">
            {post.description}
          </p>
        </div>

        {/* Author and Metadata */}
        <div className="flex flex-col gap-4 text-sm sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <UserCircle className="w-5 h-5" />
            <span>{post.author}</span>
          </div>
          <Separator
            className="hidden w-px h-4 sm:block"
            orientation="vertical"
          />
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" />
            <time dateTime={post.created_at}>
              {new Date(post.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          <Separator
            className="hidden w-px h-4 sm:block"
            orientation="vertical"
          />
          <div className="flex items-center gap-4">
            <BookOpen className="w-4 h-4" />
            <Badge>{post.area}</Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-p:text-muted-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground prose-blockquote:border-l-primary prose-pre:bg-muted prose-pre:text-muted-foreground"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  )
}
