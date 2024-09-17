import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "AmoCRM Задачи",
  description: "Тестовое задание",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ru'>
      <body>
        <div className='grid grid-rows-[80px_1fr] items-center justify-items-center min-h-screen w-full gap-16'>
          <header className='shadow-lg w-full text-center h-full flex items-center justify-center bg-neutral-100'>
            <h1 className='text-3xl font-semibold '>AmoCRM Задачи</h1>
          </header>
          <main className='w-1/2 sm:p-20 p-8 pb-20 '>{children}</main>
        </div>
      </body>
    </html>
  )
}
