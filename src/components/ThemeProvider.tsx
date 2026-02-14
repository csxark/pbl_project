import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ReactNode } from "react";

export function ThemeProvider({ children, ...props }: { children: ReactNode; attribute?: string; defaultTheme?: string; enableSystem?: boolean; disableTransitionOnChange?: boolean }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
