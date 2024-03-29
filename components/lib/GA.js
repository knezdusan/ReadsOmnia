import Script from 'next/script';

export default function GA() {
  return (
    <>
      <Script
      strategy='lazyOnload'
      src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA}`} />

      <Script strategy='lazyOnload' id="ro-ga">
        {
          `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.NEXT_PUBLIC_GA}');
          `
        }
      </Script>
    </>
  );
}