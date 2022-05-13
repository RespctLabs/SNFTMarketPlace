/* pages/_app.js */
import "../styles/globals.css";
import Link from "next/link";
import { BlockchainProvider } from "../context/BlockchainContext.tsx";
import Layout from "../common/Layout.jsx";
import Layout2 from "../common/Layout2.jsx";

import axios from "axios";
//set axios base url
axios.defaults.baseURL = "https://ly55p5tx00.execute-api.us-east-2.amazonaws.com";

const layouts = {
  L1: Layout,
  L2: Layout2,
};
function MyApp({ Component, pageProps }) {
  const Layout = layouts[Component.layout] || ((children) => <>{children}</>);
  return (
    <BlockchainProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </BlockchainProvider>
  );
}

export default MyApp;
