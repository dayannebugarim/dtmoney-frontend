import { Providers } from "../providers/providers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "dtmoney",
  icons: {
    icon: "/favicon.svg",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" title="dtmoney">
      <body>
        <link rel="icon" href="/logo-simbol.svg" sizes="any" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
