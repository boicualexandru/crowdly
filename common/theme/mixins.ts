export function alpha(colorHex: string, opacity: number): string {
  return colorHex + Math.round(opacity * 255).toString(16);
}
