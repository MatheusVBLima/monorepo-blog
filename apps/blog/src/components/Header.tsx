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
        
            <Button asChild size="sm">
              <Link href="https://matheuslimaportfolio.vercel.app/">
                Back to portfolio
              </Link>
            </Button>
          <ThemeSwitcher />
        </nav>
      </div>
    </header>
  )
}
