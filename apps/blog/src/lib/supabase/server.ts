import { createClient as createClientBase } from "@supabase/supabase-js"
import type { Database } from "./database.types"

export async function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase environment variables")
  }

  return createClientBase<Database>(supabaseUrl, supabaseKey)
}
