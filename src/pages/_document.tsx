import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Sutra Mantra - Immerse yourself in the world of mindfulness. Explore the path to inner peace and start your meditation journey today!"
        />
        <meta
          name="keywords"
          content="sutra,mantra,buddha, mindfulness, transcribing, transcribe, buddhist, fellow"
        />
        <meta name="author" content="thanhquing" />
        <meta name="robots" content="index, follow" />

        {/* <!-- Open Graph metadata --> */}
        <meta property="og:title" content="Sutra Mantra" />
        <meta
          property="og:description"
          content="Immerse yourself in the world of mindfulness. Explore the path to inner peace and start your meditation journey today!"
        />
        <meta property="og:url" content="https://www.masterinterview.com" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="/images/master_interview_white.png"
        />
        {/* <!-- Twitter Card metadata --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sutra Mantra" />
        <meta
          name="twitter:description"
          content="Immerse yourself in the world of mindfulness. Explore the path to inner peace and start your meditation journey today!"
        />
        <meta
          name="twitter:image"
          content="/images/master_interview_white.png"
        />

        <link rel="icon" href="/favicon.png" />
      </Head>
      <body className="dark bg-secondary font-dm">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
