import { Providers } from "../providers/providers";
import Head from "next/head";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" title="dtmoney">
      <Head>
        <title>dtmoney</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
