"use client"

import type { Post } from "@/lib/supabase/database.types"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"

interface PostsSectionProps {
  initialPosts: Post[]
}

export function PostsSection({ initialPosts }: PostsSectionProps) {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(initialPosts)
  const searchParams = useSearchParams()
  const search = searchParams.get("search")
  const area = searchParams.get("area") as "technology" | "literature" | null

  useEffect(() => {
    let result = [...initialPosts]

    if (search) {
      result = result.filter(post =>
        post.title.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (area) {
      result = result.filter(post => post.area === area)
    }

    setFilteredPosts(result)
  }, [search, area, initialPosts])

  if (filteredPosts.length === 0) {
    return <div className="text-center text-gray-500">No posts found</div>
  }

  return (
    <div className="grid gap-6">
      {filteredPosts.map((post: Post) => (
        <Link
          key={post.id}
          href={`/posts/${post.id}`}
          className="transition-transform hover:scale-[1.02]"
        >
          <Card>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>{post.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mt-4 text-sm text-gray-500">
                <span>By: {post.author}</span>
                <span className="mx-2">•</span>
                <span>Area: {post.area}</span>
                <span className="mx-2">•</span>
              </div>
            </CardContent>
            <CardFooter>
              <span>{new Date(post.created_at).toLocaleDateString()}</span>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}
