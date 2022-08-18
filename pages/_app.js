import store from "../redux/store";
import "../styles/globals.css";
import { Provider } from "react-redux";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Clover Employee App</title>

        <link
          rel="icon"
          type="image/jpg"
          sizes="32x32"
          href="/clover-blog.jpg"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />

        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx"
          crossOrigin="anonymous"
        />
      </Head>
      <Provider store={store}>
        <Toaster position="top-center" reverseOrder={false} />
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
