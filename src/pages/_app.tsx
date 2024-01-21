import MainLayout from "@app/layouts";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import "@app/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ChakraProvider>
  );
}
