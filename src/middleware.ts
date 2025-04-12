import { chainMiddleware } from './middlewares/chain'
import { userMiddleware } from './middlewares/user-middlewares'

export const middleware = chainMiddleware([userMiddleware])

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images).*)'],
}
