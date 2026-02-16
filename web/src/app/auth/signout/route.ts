import { createServerClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const supabase = await createServerClient()

    // Sign out the user
    await supabase.auth.signOut()

    // Redirect to home page
    return NextResponse.redirect(new URL('/', request.url))
}
