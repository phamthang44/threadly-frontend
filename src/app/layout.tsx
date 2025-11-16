import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "../styles/globals.css";
import "../styles/scrollbar.css"
import Head from "next/head";
import ReduxProvider from "@/providers/ReduxProvider";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import AuthInitializer from "@/components/AuthInitializer";


config.autoAddCss = false

const montserrat = Montserrat({
    variable: "--font-montserrat",
    subsets: ["latin"],
    weight: ["400", "700", "500"],
})

export const metadata: Metadata = {
    metadataBase: new URL("https://threadly.app"),
    title: "Threadly - Share Your Thoughts",
  description: "Social platform for sharing and discussing threads. Connect with people who share your interests.",
  keywords: ["social media", "threads", "community", "discussion"],
  authors: [{ name: "Threadly Team" }],
  creator: "Threadly",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://threadly.app",
    siteName: "Threadly",
    title: "Threadly - Share Your Thoughts",
    description: "Social platform for sharing and discussing threads",
    images: [
      {
        url: "/threadly-icon.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Threadly",
    description: "Share your thoughts on Threadly",
    creator: "@threadlyapp",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <Head>
               <meta name="apple-mobile-web-app-title" content="Threadly" />
               <meta name="apple-mobile-web-app-capable" content="yes" />
               <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
               <link rel="manifest" href="/manifest.json" />
               <link rel="apple-touch-icon" href="/threadly-icon.png" />
               <meta name="theme-color" content="#8b5cf6" />
            </Head>
            <body
                className={`antialiased ${montserrat.variable} bg-light-50 dark:bg-[#0A0A0A]`}
            >
            <ReduxProvider>
                <AuthInitializer>
                    {children}
                </AuthInitializer>
            </ReduxProvider>
            </body>
        </html>
    );
}

/*
*   Redux persist có sẵn cơ chế rehydration - tức là nó tự động:
*   1. Lưu state vào localStorage (hoặc storage bạn chọn) khi có thay đổi
*   2. Khi app load lại, nó sẽ lấy state từ localStorage và cập nhật lại store
*   3. Quá trình này diễn ra trước khi React render component, nên bạn không cần phải lo lắng về việc mất state khi reload trang.
*   4. PersistGate component giúp trì hoãn việc render UI cho đến khi quá trình rehydration hoàn tất.
*   Ở đây, loading={null} chính là nơi bạn có thể hiển thị spinner nếu muốn.
*   Khi Redux store đã được “hydrate” xong, PersistGate mới render toàn bộ app.
*   Vì vậy bạn không cần tự quản lý isHydrated nữa, Redux Persist tự làm giúp.
* */


// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//         <Head>
//             <meta name="apple-mobile-web-app-title" content="Threadly" />
//         </Head>
//       <body
//         className={`antialiased ${montserrat.variable}`}
//       >
//         {children}
//       </body>
//     </html>
//   );
// }
