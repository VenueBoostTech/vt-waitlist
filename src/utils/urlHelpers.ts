export function extractIdFromUrl(pathname: string): string | null {
    const id = pathname.split('/').pop()
    return id || null
  }