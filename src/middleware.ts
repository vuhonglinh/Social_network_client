import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';


const routePublic = ['/login', '/register', '/forgot', '/password-reset'];//Các route không yêu cầu đăng nhập ngoiaf các route này ra phải đăng nhập

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const sessionToken = request.cookies.get('sessionToken')?.value;

  // // Nếu đang ở đường dẫn không nằm trong mảng routePublic và người dùng đã đăng nhập, chuyển hướng đến trang chính (/)
  if (routePublic.some(path => pathname.startsWith(path)) && sessionToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  // // Nếu người dùng chưa đăng nhập và cố gắng truy cập vào các trang khác ngoài các route không yêu cầu đăng nhập (routePublic), họ sẽ được chuyển hướng đến trang đăng nhập (/login)
  if (!routePublic.includes(pathname) && !sessionToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/register', '/forgot', '/password-reset', '/user', '/', '/profile'], // Áp dụng middleware này cho tất cả các đường dẫn trong ứng dụng Next.js
};
