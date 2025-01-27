import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { system } from "../../theme";

export default function App({ Component, pageProps }: AppProps) { 
  const queryClient = new QueryClient()
  
  return (
    <ChakraProvider value={system}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          </QueryClientProvider>
        </ThemeProvider>
    </ChakraProvider>
  ) 
}
