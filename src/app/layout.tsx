import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { Lilita_One } from 'next/font/google';

import { Root } from '@/components/Root/Root';

import './_assets/globals.css';
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'Your Application Title Goes Here',
  description: 'Your application description goes here',
};

const Space_mono = Lilita_One({
  subsets: ['latin'],
  weight: '400',
});

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={`${Space_mono.className} antialiased `}>
        <Root>
          <main className='flex flex-col justify-between h-full py-2'>
            <div>{children}</div>
            <Navigation />
          </main>
        </Root>
      </body>
    </html>
  );
}
