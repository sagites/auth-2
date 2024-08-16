import { NextResponse } from 'next/server';



export function middleware(request) {
    const path = request.nextUrl.pathname;

    const isPublic = path === '/login' || path === '/signup' || path === '/verifyemail';

    const token = request.cookies.get('token')?.value || '';

    if(isPublic && token) {
        const url = request.nextUrl.clone()
        url.pathname = '/'
        return NextResponse.redirect(url, request.nextURL)
    };

    if (!isPublic && !token) {
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url, request.nextURL)
    };
}

export const config = {
    matcher:  [
        '/',
        '/profile',
        '/login',
        '/signup',
        '/verifyemail'
    ]
}