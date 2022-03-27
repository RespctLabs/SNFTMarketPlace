/* pages/_app.js */
import "../styles/globals.css";
import Link from "next/link";
import { BlockchainProvider } from "../context/BlockchainContext.tsx";
import Layout from "../common/Layout.jsx";

function MyApp({ Component, pageProps }) {
  return (
    <BlockchainProvider>
      {/* <nav className="border-b p-6">
          <p className="text-4xl font-bold">Metaverse Marketplace</p>
          <div className="flex mt-4">
            <Link href="/">
              <a className="mr-4 text-pink-500">Home</a>
            </Link>
            <Link href="/create-nft">
              <a className="mr-6 text-pink-500">Sell NFT</a>
            </Link>
            <Link href="/my-nfts">
              <a className="mr-6 text-pink-500">My NFTs</a>
            </Link>
            <Link href="/dashboard">
              <a className="mr-6 text-pink-500">Dashboard</a>
            </Link>
          </div>
        </nav> */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </BlockchainProvider>
  );
}

export default MyApp;
