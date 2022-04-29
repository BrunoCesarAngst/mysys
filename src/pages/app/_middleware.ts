import { NextRequest, NextResponse } from 'next/server'

export default function middleware(req: NextRequest) {
  if (!req.cookies['next-auth.session-token']) {
    return NextResponse.rewrite(`${process.env.NEXTAUTH_URL}`)
  }
}