import { SignIn } from "@clerk/nextjs"

export default function Home() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-110px)]">
      <SignIn />
    </div>
  )
}

  

