import { auth } from './auth';

const PUBLIC_ROUTES = ['/'];

export default auth(req => {
	if (!req.auth && !PUBLIC_ROUTES.includes(req.nextUrl.pathname)) {
		const newUrl = new URL('/', req.nextUrl.origin);

		return Response.redirect(newUrl);
	}
});

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
