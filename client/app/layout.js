import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ApplyFlow — Modern Job Application Tracker",
  description:
    "Track applications, manage opportunities, and stay organized throughout your job search — all in one simple workspace.",
};
const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
  },
});
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    ><Provider store={store}>
        <body className="min-h-full flex flex-col font-sans bg-[#FAFAFA] text-[#1D1D1F] selection:bg-[#0071E3]/20">
          {children}
        </body>
      </Provider>
    </html>
  );
}
