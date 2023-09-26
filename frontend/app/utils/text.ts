
export const text_to_tokens = (text: string) => {
  return !text?.trim() ? [] : text?.trim()?.split(" ").map(t => t.trim()).filter(Boolean);
}