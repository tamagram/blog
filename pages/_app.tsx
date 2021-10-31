import "../styles/global.css";
import { AppProps } from "next/app";
// This default export is required in a new `pages/_app.js` file.

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
