"use server"

import type { Area, Database } from "@/lib/supabase/database.types"
import { createClient } from "@/lib/supabase/server"
import { auth, currentUser } from "@clerk/nextjs/server"
import { revalidatePath, revalidateTag } from "next/cache"

type Post = Database["public"]["Tables"]["posts"]["Row"]

export async function createPost(data: {
  title: string
  content: string
  description: string
  area: string
}) {
  try {
    const { userId } = await auth()
    const user = await currentUser()

    if (!userId) {
      throw new Error("Não autorizado")
    }

    const { title, content, description, area } = data

    if (!title || !content || !description || !area) {
      throw new Error("Todos os campos são obrigatórios")
    }

    console.log('📝 Criando novo post...')
    const supabase = await createClient()

    const { error } = await supabase.from("posts").insert({
      title,
      content,
      description,
      area,
      author: user?.firstName || "Anônimo",
    })

    if (error) {
      console.error("Erro Supabase:", error)
      throw new Error("Erro ao criar post")
    }

    console.log('🔄 Revalidando cache...')
    
    // Força a revalidação do cache em ambos os projetos
    try {
      // Revalidação local
      await revalidateTag("posts")
      await revalidatePath("/admin/posts")
      
      // Revalidação no projeto blog
      await fetch('http://localhost:3000/api/revalidate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tag: 'posts'
        })
      })
      
      console.log('✅ Cache revalidado em ambos os projetos!')
    } catch (error) {
      console.error('Erro ao revalidar cache:', error)
    }

    return { success: true, message: "Post criado com sucesso" }
  } catch (error) {
    console.error("[CREATE_POST]", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Erro ao criar post",
    }
  }
}

export async function getPosts(search?: string, area?: Area) {
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
      console.error("Supabase Error:", error)
      throw new Error("Error fetching posts")
    }

    return { success: true, data: posts as Post[] }
  } catch (error) {
    console.error("[GET_POSTS]", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error fetching posts",
    }
  }
}

export async function getPost(id: number) {
  try {
    const supabase = await createClient()

    const { data: post, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single()

    if (error) {
      console.error("Supabase Error:", error)
      throw new Error("Error fetching post")
    }

    return { success: true, data: post as Post }
  } catch (error) {
    console.error("[GET_POST]", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error fetching post",
    }
  }
}

export async function deletePost(id: number) {
  try {
    const { userId } = await auth()

    if (!userId) {
      throw new Error("Não autorizado")
    }

    console.log('🗑️ Deletando post...')
    const supabase = await createClient()

    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", id)

    if (error) {
      console.error("Erro Supabase:", error)
      throw new Error("Erro ao deletar post")
    }

    console.log('🔄 Revalidando cache...')
    
    try {
      await revalidateTag("posts")
      await revalidatePath("/admin/posts")
      
      await fetch('http://localhost:3000/api/revalidate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tag: 'posts'
        })
      })
      
      console.log('✅ Cache revalidado em ambos os projetos!')
    } catch (error) {
      console.error('Erro ao revalidar cache:', error)
    }

    return { success: true, message: "Post deletado com sucesso" }
  } catch (error) {
    console.error("[DELETE_POST]", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Erro ao deletar post",
    }
  }
}
