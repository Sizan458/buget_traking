import { Inter, Outfit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Penny Planner",
  description: "PennyPlanner is your ultimate companion for effortless budget management and financial planning. Track your expenses, set savings goals, and gain insights into your spending habits with our user-friendly interface. Whether you're saving for a big purchase or just looking to stay on top of your daily finances, PennyPlanner empowers you to make informed financial decisions with ease. Start planning your pennies today for a wealthier tomorrow!",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={outfit.className}>
        <Toaster />
          {children}</body>
      </html>
    </ClerkProvider>
  );
}
