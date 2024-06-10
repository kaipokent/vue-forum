export const countObjectProperties = (obj: Record<string, string> | null | undefined) => {
  return Object.keys(obj || []).length
}
