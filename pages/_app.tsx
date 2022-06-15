import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { CacheProvider, EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import createEmotionCache from "../lib/emotion-cache";
import defaultTheme from "../styles/theme/defaultTheme";
import Layout from "../components/Layout";
import fetchJson from "../lib/fetch";

const clientSideEmotionCache = createEmotionCache();

interface _AppProps extends AppProps {
  emotionCache: EmotionCache;
}

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: _AppProps) {
  const user = pageProps?.user;
  const noLayout = pageProps?.noLayout;
  const _fallback = pageProps?.fallback as Record<string, any>;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />

        <SWRConfig
          value={{
            fetcher: fetchJson,
            fallback: _fallback,
          }}
        >
          {noLayout ? (
            <Component {...pageProps} />
          ) : (
            <Layout user={user}>
              <Component {...pageProps} />
            </Layout>
          )}
        </SWRConfig>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
