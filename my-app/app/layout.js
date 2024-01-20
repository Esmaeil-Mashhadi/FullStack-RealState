import { Inter } from 'next/font/google'
import './globals.css'
import Layout from '@/components/layout/layout'
import NextAuthProvider from '@/providers/NextAuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'buy and sell properties',
  description: 'buy and sell properties',
  icons:{
    icon : './favicon.ico '
  }
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body  className={inter.className}>


       <NextAuthProvider>
         <Layout>
             {children}
         </Layout>
       </NextAuthProvider>
 
      
      </body>
    </html>
  )
}
