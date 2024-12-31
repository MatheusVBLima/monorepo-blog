import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Button } from "./ui/button"
//
const PostEditor = ({ onSave }: { onSave: (content: string) => void }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "min-h-[300px] border rounded-md p-4 focus:outline-none prose prose-slate dark:prose-invert max-w-none",
      },
    },
    content: "",
  })

  const MenuBar = () => {
    if (!editor) return null

    return (
      <div className="flex flex-wrap gap-2 p-2 mb-4 border-b">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? "bg-slate-200" : ""
            }
          >
            H1
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? "bg-slate-200" : ""
            }
          >
            H2
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              editor.isActive("heading", { level: 3 }) ? "bg-slate-200" : ""
            }
          >
            H3
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "bg-slate-200" : ""}
          >
            Negrito
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "bg-slate-200" : ""}
          >
            Itálico
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "bg-slate-200" : ""}
          >
            Lista
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "bg-slate-200" : ""}
          >
            Lista Numerada
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div
      className="relative w-full p-4 border rounded-lg"
      style={{ zIndex: 0 }}
    >
      <MenuBar />
      <EditorContent
        editor={editor}
        className="relative"
        style={{ zIndex: 0 }}
      />
      <div className="mt-4">
        <Button
          onClick={() => {
            if (editor && onSave) {
              onSave(editor.getHTML())
            }
          }}
        >
          Create Post
        </Button>
      </div>
    </div>
  )
}

export default PostEditor
