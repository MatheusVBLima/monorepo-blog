"use client"

import { deletePost, getPosts } from "@/app/server-actions/posts"
import { useToast } from "@/hooks/use-toast"
import type { Post } from "@/lib/supabase/database.types"
import { deletePostSchema, type DeletePostInput } from "@/lib/validations/post"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "./ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select"

export function DeletePostForm() {
  const { toast } = useToast()
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(false)
  
  const form = useForm<DeletePostInput>({
    resolver: zodResolver(deletePostSchema),
  })

  useEffect(() => {
    async function loadPosts() {
      const { data } = await getPosts()
      if (data) {
        setPosts(data)
      }
    }
    loadPosts()
  }, [])

  async function onSubmit(data: DeletePostInput) {
    try {
      setIsLoading(true)
      const result = await deletePost(data.id)
      
      if (!result.success) {
        throw new Error(result.message)
      }

      toast({
        title: "Post deletado com sucesso!",
        description: "O post foi deletado com sucesso.",
        variant: "default",
      })
      form.reset()
      
      // Atualiza a lista de posts
      const { data: updatedPosts } = await getPosts()
      if (updatedPosts) {
        setPosts(updatedPosts)
      }
    } catch (error) {
      toast({
        title: "Erro ao deletar post",
        description: error instanceof Error ? error.message : "Erro ao deletar post",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Selecione o Post</FormLabel>
              <Select 
                onValueChange={(value) => field.onChange(Number(value))}
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um post para deletar" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {posts.map((post) => (
                    <SelectItem key={post.id} value={post.id.toString()}>
                      {post.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" variant="destructive" disabled={isLoading}>
          {isLoading ? "Deletando..." : "Deletar Post"}
        </Button>
      </form>
    </Form>
  )
} 