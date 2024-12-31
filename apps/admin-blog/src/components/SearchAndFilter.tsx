"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Area } from "@/lib/supabase/database.types"
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

  // Debounce the search to avoid too many URL updates while typing
  const debouncedUpdateSearchParams = useDebouncedCallback((value: string) => {
    const query = createQueryString({ 
      search: value || null,
      area: selectedArea 
    })
    router.push(`${pathname}?${query}`)
  }, 300)

  const handleSearch = (value: string) => {
    setSearch(value)
    debouncedUpdateSearchParams(value)
  }

  const handleAreaFilter = (area: Area) => {
    setSelectedArea(selectedArea === area ? null : area)
    const query = createQueryString({
      area: selectedArea === area ? null : area,
      search: search || null,
    })
    router.push(`${pathname}?${query}`)
  }

  return (
    <div className="mb-8">
      <div className="flex gap-4 mb-4">
        <Input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={e => handleSearch(e.target.value)}
          className="flex-grow"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedArea === "technology" ? "default" : "outline"}
          size="sm"
          onClick={() => handleAreaFilter("technology")}
        >
          Technology
        </Button>
        <Button
          variant={selectedArea === "literature" ? "default" : "outline"}
          size="sm"
          onClick={() => handleAreaFilter("literature")}
        >
          Literature
        </Button>
      </div>
    </div>
  )
}
