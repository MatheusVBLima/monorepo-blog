import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { tag } = await request.json()
    
    if (!tag) {
      return NextResponse.json(
        { message: 'Tag não fornecida' },
        { status: 400 }
      )
    }

    // Revalida o cache usando a tag fornecida
    revalidateTag(tag)
    
    return NextResponse.json(
      { revalidated: true, now: Date.now() },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro ao revalidar' },
      { status: 500 }
    )
  }
} 