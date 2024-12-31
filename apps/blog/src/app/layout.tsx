import { Header } from "@/components/Header"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

export const metadata = {
  title: "Tech & Literature Blog",
  description: "A blog about technology and literature",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
   
      <html lang="en">
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
   
  )
}
