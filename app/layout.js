import { Montserrat } from 'next/font/google';
import Script from 'next/script';
import { LightboxProvider } from '@/app/context/LightboxContext';
import { GA_TRACKING_ID } from '../lib/gtag'; // Make sure lib/gtag.js exists
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-montserrat',
});

export const metadata = {
  title: 'Elevant | Your New Premium Project',
  description: 'Discover the pinnacle of luxury living. Elevant offers stunning 3 & 4 BHK apartments with world-class amenities.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* --- Google Analytics Scripts Start --- */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      {/* --- Google Analytics Scripts End --- */}

      <body className={`${montserrat.variable} font-sans bg-white`}>
        <LightboxProvider>
          {children}
          {/* <StickyEnquireButton /> */}
        </LightboxProvider>
      </body>
    </html>
  );
}