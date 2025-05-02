// Types for Next.js route handlers
declare module 'next' {
  import type { NextRequest } from 'next/server';
  
  interface RouteParams {
    params: Record<string, string>;
  }
  
  interface RouteHandler<T extends RouteParams = RouteParams> {
    (request: NextRequest, context: T): Promise<Response>;
  }
} 