"use client"

import { createPost } from "@/app/server-actions/posts"
import PostEditor from "@/components/PostEditor"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { createPostSchema, type CreatePostInput } from "@/lib/validations/post"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"

export function CreatePostForm() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  
  const form = useForm<CreatePostInput>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      area: undefined,
    },
  })

  const handleEditorSave = async (content: string) => {
    form.setValue("content", content, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }

  async function onSubmit(data: CreatePostInput) {
    setLoading(true)
    try {
      const result = await createPost(data)

      if (!result.success) {
        throw new Error(result.message)
      }

      toast({
        title: "Post criado com sucesso!",
        variant: "default",
      })
      
      form.reset()
    } catch (error) {
      console.error("Erro:", error)
      toast({
        title: error instanceof Error ? error.message : "Erro ao salvar o post",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="py-8">
      <h1 className="mb-6 text-2xl font-bold">Create New Post</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter post title"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter a brief description"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="area"
            render={({ field }) => (
              <FormItem className="relative z-50">
                <FormLabel>Area</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an area" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="literature">Literature</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="relative z-40">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <PostEditor 
                      onSave={handleEditorSave}
                      initialContent={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Post"}
          </Button>
        </form>
      </Form>
    </div>
  )
}
