"use client";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

   const inter = Inter({ subsets: ["latin"] });

   const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL as string);

   export default function RootLayout({
     children,
   }: {
     children: React.ReactNode;
   }) {
     return (
       <ClerkProvider>
         <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
           <html lang="en">
             <body className={inter.className}>
               {children}
               <Toaster />
             </body>
           </html>
         </ConvexProviderWithClerk>
       </ClerkProvider>
     );
   }