import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function updateSession(request) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            supabaseResponse.cookies.set(name, value, options);
          });

          if (headers) {
            for (const [name, value] of headers.entries()) {
              supabaseResponse.headers.set(name, value);
            }
          }
        },
      },
    }
  );

  const { data } = await supabase.auth.getClaims();
  const user = data?.claims ?? null;

  const pathname = request.nextUrl.pathname;

  const publicPaths = [
    "/",
    "/dang-nhap",
    "/dang-ky",
  ];

  const isPublicPath =
    publicPaths.includes(pathname) ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/");

  if (!user && !isPublicPath) {
    const url = request.nextUrl.clone();
    url.pathname = "/dang-nhap";

    const redirectResponse = NextResponse.redirect(url);

    for (const cookie of supabaseResponse.cookies.getAll()) {
      redirectResponse.cookies.set(
        cookie.name,
        cookie.value,
        cookie
      );
    }

    for (const headerName of [
      "cache-control",
      "expires",
      "pragma",
    ]) {
      const value = supabaseResponse.headers.get(
        headerName
      );

      if (value) {
        redirectResponse.headers.set(
          headerName,
          value
        );
      }
    }

    return redirectResponse;
  }

  return supabaseResponse;
}