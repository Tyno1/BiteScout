import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
import Provider from "@/components/Provider";
import { getServerSession } from "next-auth";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Provider as ReduxProvider } from "react-redux";
import store from "@/state/store";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Food App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en" className={montserrat.className}>
      <body>
        <ReduxProvider store={store}>
          <Provider session={session}>
            <ToastContainer />
            <main className="">{children}</main>
          </Provider>
        </ReduxProvider>
      </body>
    </html>
  );
}
