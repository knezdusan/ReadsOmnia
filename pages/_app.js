import Script from 'next/script';
import Layout from '../components/layout/Layout';
import "../styles/globals.scss";

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>

      <Script
      strategy='lazyOnload'
      src={`https://www.googletagmanager.com/gtag/js?id=${process.env.RO_GA}`} />

      <Script strategy='lazyOnload' id="ro-ga">
        {
          `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', ${process.env.RO_GA});
          `
        }
      </Script>

      <Component {...pageProps} />

    </Layout>
  )
}
