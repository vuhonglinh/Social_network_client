
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const isLoggedIn = false;

export function middleware(request: NextRequest) {
    let headers = new Headers(request.headers);
    console.log("Đây là cookie :", headers);
    if (!isLoggedIn && request.url === process.env.NEXT_PUBLIC_FONTEND_URL) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next()
}

export const config = {
    matches: ['/*']
}