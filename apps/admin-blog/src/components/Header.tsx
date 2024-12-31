import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { ThemeSwitcher } from "./ThemeSwitcher"
import { Button } from "./ui/button"

export function Header() {
  return (
    <header className="border-b">
      <div className="container flex items-center justify-between py-4 mx-auto">
        <Link href="/" className="text-xl font-bold">
          Tech & Literature
        </Link>

        <nav className="flex items-center gap-4">
          <SignedIn>
            <Button asChild size="sm">
              <Link href="https://matheuslimaportfolio.vercel.app/">
                Back to portfolio
              </Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/admin/create-post">New Post</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            {/* <SignInButton mode="modal">
              <Button size="sm">Sign In</Button>
            </SignInButton> */}
            <Button asChild size="sm">
              <Link href="https://matheuslimaportfolio.vercel.app/">
                Back to portfolio
              </Link>
            </Button>
          </SignedOut>
          <ThemeSwitcher />
        </nav>
      </div>
    </header>
  )
}
