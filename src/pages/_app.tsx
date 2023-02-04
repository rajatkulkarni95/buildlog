import type { AppProps } from "next/app";
import MainFrame from "~/components/layout/Main";
import "~/styles/globals.css";
import { ThemeProvider } from "next-themes";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider defaultTheme="dark" attribute="class">
      <MainFrame>
        <Component {...pageProps} />
      </MainFrame>
    </ThemeProvider>
  );
}
