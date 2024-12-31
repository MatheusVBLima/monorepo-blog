import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Button } from "./ui/button"

interface PostEditorProps {
  onSave: (content: string) => void
  initialContent?: string
}

const PostEditor = ({ onSave, initialContent = "" }: PostEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Image,
      Link.configure({
        openOnClick: false,
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "min-h-[300px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 prose prose-stone dark:prose-invert max-w-none",
      },
    },
    content: initialContent,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onSave(html)
    },
  })

  if (!editor) {
    return null
  }

  return (
    <div className="relative w-full rounded-lg border p-4">
      <div className="flex flex-wrap gap-2 p-2 mb-4 border-b">
        <div className="flex gap-2">
          {[1, 2, 3].map((level) => (
            <Button
              key={level}
              variant="outline"
              size="sm"
              type="button"
              onClick={() => {
                editor.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 }).run()
              }}
              data-active={editor.isActive('heading', { level })}
              className="data-[active=true]:bg-secondary"
            >
              H{level}
            </Button>
          ))}
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            data-active={editor.isActive('bold')}
            className="data-[active=true]:bg-secondary"
          >
            Negrito
          </Button>
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            data-active={editor.isActive('italic')}
            className="data-[active=true]:bg-secondary"
          >
            Itálico
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            data-active={editor.isActive('bulletList')}
            className="data-[active=true]:bg-secondary"
          >
            Lista
          </Button>
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            data-active={editor.isActive('orderedList')}
            className="data-[active=true]:bg-secondary"
          >
            Lista Numerada
          </Button>
        </div>
      </div>

      
        <EditorContent editor={editor} className="w-full [&_.ProseMirror]:w-full" />
      
    </div>
  )
}

export default PostEditor
