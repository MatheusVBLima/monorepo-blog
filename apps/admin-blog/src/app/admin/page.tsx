
import { CreatePostForm } from "@/components/create-post-form"
import { DeletePostForm } from "@/components/delete-post-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminPage() {
  return (
    <main className="container py-8 mx-auto">
      <h1 className="mb-8 text-4xl font-bold">Administração do Blog</h1>
      
      <Tabs defaultValue="create" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="create">Criar Post</TabsTrigger>
          <TabsTrigger value="delete">Deletar Post</TabsTrigger>
        </TabsList>
        <TabsContent value="create">
          <CreatePostForm />
        </TabsContent>
        <TabsContent value="delete">
          <DeletePostForm />
        </TabsContent>
      </Tabs>
    </main>
  )
} 