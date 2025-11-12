import { headers } from "next/headers";

type HeaderGetter = {
  get(name: string): string | null | undefined;
};

export function deriveBaseUrlFromHeaders(headersList?: HeaderGetter | null) {
  if (!headersList) {
    return null;
  }

  const protocol = headersList.get("x-forwarded-proto") ?? "http";
  const host = headersList.get("x-forwarded-host") ?? headersList.get("host");

  return host ? `${protocol}://${host}` : null;
}

export async function getRequestBaseUrl() {
  const headersList = await headers();

  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
    deriveBaseUrlFromHeaders(headersList) ||
    "http://localhost:3000"
  );
}


