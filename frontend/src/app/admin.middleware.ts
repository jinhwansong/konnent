import { NextRequest, NextResponse } from "next/server"

export const middleware = (req:NextRequest) => {
    // 관리자 페이지 경로체크
    if(req.nextUrl.pathname.startsWith('/admin')) {
        // 인증체크
        const isAdmin = checkAdmin(req);
        if(!isAdmin) {
            return NextResponse.redirect(new URL('/', req.url))
        }
    }
}

function checkAdmin(req:NextRequest){
    // 세션 확인
    const session = req.cookies.get('connect.sid');
    return !!session
}

// /admin으로 시작하는 모든 경로
export const config = {
    matcher: '/admin/:path'
}