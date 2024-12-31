"use client"

import type { Post } from "@/lib/supabase/database.types"
import { Calendar, Clock, User } from 'lucide-react'
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useMemo } from "react"
import { Badge } from "./ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"

interface PostsSectionProps {
  initialPosts: Post[]
}

export function PostsSection({ initialPosts }: PostsSectionProps) {
  const searchParams = useSearchParams()
  const search = searchParams.get("search")
  const area = searchParams.get("area") as "technology" | "literature" | null

  const filteredPosts = useMemo(() => {
    let result = [...initialPosts]

    if (search) {
      result = result.filter(post =>
        post.title.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (area) {
      result = result.filter(post => post.area === area)
    }

    return result
  }, [search, area, initialPosts])

  if (filteredPosts.length === 0) {
    return (
      <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-dashed">
        <p className="text-center text-muted-foreground">No posts found</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredPosts.map((post: Post) => (
        <Link
          key={post.id}
          href={`/posts/${post.id}`}
          className="group transition-all hover:no-underline"
        >
          <Card className="h-full overflow-hidden border transition-all hover:border-primary hover:shadow-lg">
            <CardHeader className="space-y-4 pb-4">
              <Badge  className="w-fit">
                {post.area}
              </Badge>
              <div>
                <h3 className="line-clamp-2 text-2xl font-bold tracking-tight transition-colors group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="line-clamp-2 text-muted-foreground">
                  {post.description}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
            </CardContent>
            <CardFooter className="flex items-center py-4 gap-4 border-t bg-muted/50 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.created_at).toLocaleDateString("pt-BR")}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>5 min read</span>
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}
