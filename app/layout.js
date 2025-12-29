import { Montserrat } from 'next/font/google';
import Script from 'next/script';
import { LightboxProvider } from '@/app/context/LightboxContext';
import { GA_TRACKING_ID, SECONDARY_GA_ID } from '../lib/gtag'; 
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata = {
  title: 'Elevant | Your New Premium Project',
  description: 'Discover the pinnacle of luxury living.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* LCP FIX: Preload the Hero Poster Image 
            This ensures the "largest paint" happens instantly.
            Make sure the href matches your actual file path exactly.
        */}
       <link rel="preload" href="/hero-thumbnail.webp" as="image" type="image/webp" />
      </head>
      <body className={`${montserrat.variable} font-sans bg-white`}>
        {/* LAZY ANALYTICS (Already working!) */}
        <Script
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <Script
            id="gtag-init"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', { page_path: window.location.pathname });
                gtag('config', '${SECONDARY_GA_ID}', { page_path: window.location.pathname });
            `,
            }}
        />

        <LightboxProvider>
          {children}
        </LightboxProvider>
      </body>
    </html>
  );
}