"use client"

import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Area } from "@/lib/supabase/database.types"
import { BookText, Search, Terminal } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"
import { useDebouncedCallback } from "use-debounce"

export function SearchAndFilter() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [selectedArea, setSelectedArea] = useState<Area | null>(
    (searchParams.get("area") as Area) || null
  )

  const createQueryString = useCallback(
    (params: Record<string, string | null>) => {
      const newSearchParams = new URLSearchParams(searchParams.toString())

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key)
        } else {
          newSearchParams.set(key, value)
        }
      }

      return newSearchParams.toString()
    },
    [searchParams]
  )

  const debouncedUpdateSearchParams = useDebouncedCallback((value: string) => {
    const query = createQueryString({
      search: value || null,
      area: selectedArea,
    })
    router.push(`${pathname}?${query}`)
  }, 300)

  const handleSearch = (value: string) => {
    setSearch(value)
    debouncedUpdateSearchParams(value)
  }

  const handleAreaFilter = (area: Area | null) => {
    setSelectedArea(area)
    const query = createQueryString({
      area: area,
      search: search || null,
    })
    router.push(`${pathname}?${query}`)
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={e => handleSearch(e.target.value)}
          className="pl-9"
        />
      </div>
      <Tabs
        value={selectedArea || "all"}
        onValueChange={value => handleAreaFilter(value === "all" ? null : (value as Area))}
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all" className="gap-2">
            <Search className="h-4 w-4" />
            <span>All</span>
          </TabsTrigger>
          <TabsTrigger value="technology" className="gap-2">
            <Terminal className="h-4 w-4" />
            <span>Technology</span>
          </TabsTrigger>
          <TabsTrigger value="literature" className="gap-2">
            <BookText className="h-4 w-4" />
            <span>Literature</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}

