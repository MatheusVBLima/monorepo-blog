"use server"

import type { Area, Database } from "@/lib/supabase/database.types"
import { createClient } from "@/lib/supabase/server"
import { unstable_cache } from "next/cache"

type Post = Database["public"]["Tables"]["posts"]["Row"]

// Cache da listagem de posts
export const getPosts = unstable_cache(
  async (search?: string, area?: Area) => {
    console.log('🔍 Buscando posts do banco...', { search, area })
    try {
      const supabase = await createClient()

      let query = supabase.from("posts").select("*")

      if (search) {
        query = query.ilike("title", `%${search}%`)
      }

      if (area) {
        query = query.eq("area", area)
      }

      const { data: posts, error } = await query.order("created_at", {
        ascending: false,
      })

      if (error) {
        throw new Error("Error fetching posts")
      }

      console.log('✅ Posts encontrados:', posts?.length)
      return { success: true, data: posts as Post[] }
    } catch (error) {
      console.error("[GET_POSTS]", error)
      return {
        success: false,
        message: error instanceof Error ? error.message : "Error fetching posts",
      }
    }
  },
  ["posts-list"], // Cache tag
  {
    tags: ["posts"], // Tag para revalidação manual
  }
)

export const getPost = unstable_cache(
  async (id: number) => {
    console.log('🔍 Buscando post específico do banco...', { id })
    try {
      const supabase = await createClient()

      const { data: post, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single()

      if (error) {
        throw new Error("Error fetching post")
      }

      console.log('✅ Post encontrado:', post?.id)
      return { success: true, data: post as Post }
    } catch (error) {
      console.error("[GET_POST]", error)
      return {
        success: false,
        message: error instanceof Error ? error.message : "Error fetching post",
      }
    }
  },
  ["post-detail"], // Cache tag
  {
    tags: ["posts"], // Mesma tag para revalidar junto com a lista
  }
)
