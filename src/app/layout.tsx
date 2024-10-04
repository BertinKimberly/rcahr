/** @format */
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "../lib/utils";
import ReactQueryProvider from "@/providers/react.query.provider";
import AuthProvider from "@/providers/auth.provider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import NpProgress from "@/components/NpProgress";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "RCA Hackathon Rating App",
  description: "Generated by create next app"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          poppins.className,
          {
            "debug-screens": process.env.NODE_ENV === "development"
          }
        )}
      >
        <AuthProvider>
          <ReactQueryProvider>
            <div className="bg-white">{children}</div>
            <NpProgress />
          </ReactQueryProvider>
        </AuthProvider>
        <ToastContainer
          progressStyle={{ background: '#001544' }}
          icon={false}
          hideProgressBar={true}
          autoClose={3000}
          toastClassName={'border-darkBlue'}
        />
      </body>
    </html>
  );
}
