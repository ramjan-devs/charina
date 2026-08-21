import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import { DialogProvider } from '@/context/DialogContext';
import DialogContainer from '@/container/DialogContainer/DialogContainer';
import { Toaster } from 'sonner';

const manrope = Manrope({
  variable: '--font-manrope',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'JobCore',
  description: 'JobCore - The best job portal in the world',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${manrope.className} font-manrope max-w-screen overflow-x-hidden antialiased`}
      >
        <DialogProvider>
          {children}
          <DialogContainer />
          <Toaster position="top-right" richColors />
        </DialogProvider>
      </body>
    </html>
  );
}
