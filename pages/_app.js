import NProgress from 'nprogress';
import Router from 'next/router';
import Page from '../components/Page';
import '../styles/nprogress.css';
import '../styles/globals.css';



Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function MyApp({ Component, pageProps }) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}