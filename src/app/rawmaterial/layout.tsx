import ButtonAppBar from '@/component/navbar'
import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from '@/component/footer'
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../utils/authOptions";
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Verify if the user has the required access token.
  const session = await getServerSession(authOptions);
  if (!(session)) {
    redirect("/api/auth/signin");
  }
  return (
    <html lang="en">
        <body className={inter.className}>
          <ButtonAppBar/>
          {children}
          <Footer/>

        </body>
    </html>
  )
}