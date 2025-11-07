import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../styles/globals.css";
import Head from "next/head";
import { store, persistor } from "@/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

const montserrat = Montserrat({
    variable: "--font-montserrat",
    subsets: ["latin"],
    weight: ["400", "700", "500"],
})

export const metadata: Metadata = {
  title: "Threadly",
  description: "Social platform for sharing and discussing threads.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <Head>
               <meta name="apple-mobile-web-app-title" content="Threadly" />
            </Head>
            <body
                className={`antialiased ${montserrat.variable}`}
            >
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    {children}
                </PersistGate>
            </Provider>
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
