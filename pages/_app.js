import Script from 'next/script';
import Layout from '../components/layout/Layout';
import GA from '../components/lib/GA';
import "../styles/globals.scss";

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <GA/>
      <Component {...pageProps} />
    </Layout>
  )
}
