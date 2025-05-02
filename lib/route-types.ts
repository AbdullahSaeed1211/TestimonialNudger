import { NextRequest } from "next/server";

export interface RouteContext<T extends Record<string, string> = Record<string, string>> {
  params: T;
}

export type ApiRoute<Params extends Record<string, string> = Record<string, string>> = (
  request: NextRequest,
  context: RouteContext<Params>
) => Promise<Response>; 